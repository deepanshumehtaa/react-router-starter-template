class EnemyWalker extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.color === 'purple' ? 'enemyPurple' : 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.speed = config.speed || 80;
    this.direction = config.direction || 1;
    this.range = config.range || 120;
    this.startX = x;
    this.setVelocityX(this.speed * this.direction);
    // Health by colour: purple walkers take 1 bullet, green walkers take 2.
    this.hp = config.hp || (config.color === 'purple' ? 1 : 2);
  }

  update() {
    const leftEdge = this.startX - this.range;
    const rightEdge = this.startX + this.range;

    // Turn around at the patrol edges...
    if (this.direction > 0 && this.x >= rightEdge) this.direction = -1;
    else if (this.direction < 0 && this.x <= leftEdge) this.direction = 1;

    // ...or when bumping into a wall.
    if (this.body.blocked.left) this.direction = 1;
    else if (this.body.blocked.right) this.direction = -1;

    // Ledge detection: while standing on a brick, peek at the spot just ahead
    // and below the leading foot. If there is no brick there (a gap, lava, or
    // the platform edge), turn back so the enemy never walks off solid ground.
    const onGround = this.body.blocked.down || this.body.touching.down;
    if (onGround) {
      const aheadX = this.x + this.direction * (this.body.halfWidth + 2);
      const probeY = this.body.bottom + 4;
      if (!this.scene.isBrickUnder(aheadX, probeY)) {
        this.direction *= -1;
      }
    }

    // Drive velocity every frame so the patrol stays smooth and never stalls.
    this.setVelocityX(this.speed * this.direction);
    this.setFlipX(this.direction < 0);
  }

  hit(damage = 1) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        scaleY: 0.1,
        duration: 200,
        onComplete: () => this.destroy()
      });
      return true;
    }
    this.scene.tweens.add({
      targets: this,
      tint: 0xffffff,
      duration: 100,
      yoyo: true
    });
    return false;
  }
}

class EnemyFlyer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, 'flyer');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.speed = config.speed || 60;
    this.rangeX = config.rangeX || 100;
    this.rangeY = config.rangeY || 50;
    this.startX = x;
    this.startY = y;
    this.time = 0;
    this.hp = config.hp || 1; // UFO: 1 bullet
    if (config.color === 'purple') this.setTint(0xce93d8);
    else if (config.color === 'green') this.setTint(0x69f0ae);
  }

  update(time, delta) {
    // Flyers (UFOs) float on a Lissajous path: sin on X and cos on Y at slightly
    // different rates trace a looping figure-8/oval around the spawn point.
    // body.reset() teleports the physics body to the computed point each frame
    // (these enemies are kinematic, not driven by velocity/gravity).
    this.time += delta * 0.002;
    this.x = this.startX + Math.sin(this.time * this.speed * 0.02) * this.rangeX;
    this.y = this.startY + Math.cos(this.time * this.speed * 0.03) * this.rangeY;
    this.body.reset(this.x, this.y);
  }

  hit(damage = 1) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        scale: 2,
        duration: 300,
        onComplete: () => this.destroy()
      });
      return true;
    }
    return false;
  }
}

class EnemyShooter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, 'shooter');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.body.setImmovable(true);
    this.body.setAllowGravity(false);
    this.fireRate = config.fireRate || 2000;
    this.bulletSpeed = config.bulletSpeed || 200;
    this.hp = config.hp || 2;
    this.lastFired = 0;
    this.bullets = scene.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10
    });
  }

  update(time) {
    if (time > this.lastFired + this.fireRate) {
      this.fire();
      this.lastFired = time;
    }

    const maxX = this.scene.physics.world.bounds.width + 50;
    this.bullets.children.iterate((b) => {
      if (b && b.active && (b.x < -50 || b.x > maxX || b.y < -50 || b.y > 700)) {
        b.setActive(false).setVisible(false);
        b.body.stop();
      }
    });
  }

  fire() {
    const bullet = this.bullets.get(this.x, this.y);
    if (bullet) {
      bullet.setActive(true).setVisible(true);
      bullet.body.setAllowGravity(false);
      const player = this.scene.player;
      if (player) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        bullet.setVelocity(
          Math.cos(angle) * this.bulletSpeed,
          Math.sin(angle) * this.bulletSpeed
        );
      }
      this.scene.time.delayedCall(4000, () => {
        if (bullet.active) {
          bullet.setActive(false).setVisible(false);
          bullet.body.stop();
        }
      });
    }
  }

  hit(damage = 1) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.bullets.children.iterate(b => {
        if (b) { b.setActive(false).setVisible(false); }
      });
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        angle: 90,
        duration: 400,
        onComplete: () => this.destroy()
      });
      return true;
    }
    this.setTintFill(0xffffff);
    this.scene.time.delayedCall(100, () => this.clearTint());
    return false;
  }
}

class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, 'boss');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setSize(56, 56);
    this.setOffset(4, 4);

    this.hp = config.hp || 10;
    this.maxHp = this.hp;
    this.speed = config.speed || 100;
    this.direction = 1;
    this.range = config.range || 200;
    this.startX = x;
    this.fireRate = config.fireRate || 1500;
    this.lastFired = 0;
    this.phase = 1;

    this.bullets = scene.physics.add.group({ defaultKey: 'fireball', maxSize: 30 });

    this.hpBar = scene.add.graphics();
    this.updateHpBar();
  }

  update(time) {
    // Patrol left/right within `range` of the spawn point.
    if (Math.abs(this.x - this.startX) > this.range) {
      this.direction *= -1;
    }
    this.setVelocityX(this.speed * this.direction * (this.phase === 2 ? 1.5 : 1));

    // Enrage once at half health: move faster, fire faster, and tint red. The
    // `this.phase === 1` guard makes this happen exactly once.
    if (this.hp < this.maxHp / 2 && this.phase === 1) {
      this.phase = 2;
      this.fireRate = Math.max(700, this.fireRate - 600);
      this.setTint(0xff6666);
    }

    // Throttled firing: only spit again once `fireRate` ms have passed.
    if (time > this.lastFired + this.fireRate) {
      this.spitFire();
      this.lastFired = time;
    }

    // Recycle fireballs that have flown off-world back into the pool.
    const maxX = this.scene.physics.world.bounds.width + 50;
    this.bullets.children.iterate(b => {
      if (b && b.active && (b.x < -50 || b.x > maxX || b.y < -50 || b.y > 700)) {
        b.setActive(false).setVisible(false);
        b.body.stop();
      }
    });

    this.updateHpBar();
  }

  spitFire() {
    // Fire breath: a fan of fireballs aimed at the player.
    const count = this.phase === 2 ? 5 : 3;
    const speed = this.phase === 2 ? 300 : 230;
    const player = this.scene.player;
    const baseAngle = player
      ? Phaser.Math.Angle.Between(this.x, this.y + 14, player.x, player.y)
      : Math.PI / 2;

    for (let i = 0; i < count; i++) {
      const fireball = this.bullets.get(this.x, this.y + 14);
      if (!fireball) continue;
      fireball.setActive(true).setVisible(true);
      fireball.setScale(1.2);
      fireball.body.setAllowGravity(false);
      const spread = (i - Math.floor(count / 2)) * 0.22;
      const angle = baseAngle + spread;
      fireball.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      this.scene.tweens.add({
        targets: fireball, scale: 1.5, duration: 200, yoyo: true, repeat: -1
      });
      this.scene.time.delayedCall(4000, () => {
        if (fireball.active) {
          fireball.setActive(false).setVisible(false);
          fireball.body.stop();
        }
      });
    }
    if (this.scene.playSfx) this.scene.playSfx('fire');
  }

  updateHpBar() {
    this.hpBar.clear();
    this.hpBar.setPosition(this.x - 32, this.y - 44);
    this.hpBar.fillStyle(0x333333, 0.8);
    this.hpBar.fillRect(0, 0, 64, 8);
    const pct = this.hp / this.maxHp;
    this.hpBar.fillStyle(pct > 0.3 ? 0xf44336 : 0xff1744, 1);
    this.hpBar.fillRect(1, 1, 62 * pct, 6);
  }

  hit(damage = 1) {
    this.hp -= damage;
    this.scene.tweens.add({
      targets: this,
      tint: 0xffffff,
      duration: 80,
      yoyo: true,
      onComplete: () => {
        if (this.phase === 2) this.setTint(0xff6666);
        else this.clearTint();
      }
    });
    if (this.hp <= 0) {
      this.hpBar.destroy();
      this.bullets.children.iterate(b => {
        if (b) { b.setActive(false).setVisible(false); }
      });
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        scale: 2,
        angle: 360,
        duration: 1000,
        onComplete: () => this.destroy()
      });
      return true;
    }
    return false;
  }
}
