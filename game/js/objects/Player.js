class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(0.1);
    this.setSize(24, 44);
    this.setOffset(4, 2);

    this.speed = 200;
    // Jump height controls. These are the upward launch velocities (negative = up);
    // peak height ≈ force² / (2 × gravity), with gravity = 600 (set in main.js).
    // Tweak these two numbers to change how high each jump goes.
    this.jumpForce = -420;        // 1st jump (from the ground) -> ~147px high
    this.doubleJumpForce = -330;  // 2nd jump (mid-air double jump) -> ~91px high
    this.maxJumps = 2;
    this.jumpsLeft = this.maxJumps;
    this.health = 100;
    this.maxHealth = 100;
    this.isInvulnerable = false;
    this.isDead = false;
    this.onIce = false;
    this.facing = 1;
    this.baseSpeed = this.speed;
    // Starts at 0: the player can't shoot until they pick up a Bullet powerup.
    // Bullets only come from that powerup, so shooting is gated behind it.
    this.ammo = 0;
    this.maxAmmo = 60;
    this.bulletsPerPickup = 5; // each Bullet powerup grants exactly this many
    this.fireCooldown = 350;
    this.baseFireCooldown = this.fireCooldown;
    this.lastFired = 0;
    this.powerupTimers = {};
    this.isSlowed = false;
    this.slowTimer = null;

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = {
      up: scene.input.keyboard.addKey('W'),
      down: scene.input.keyboard.addKey('S'),
      left: scene.input.keyboard.addKey('A'),
      right: scene.input.keyboard.addKey('D'),
      space: scene.input.keyboard.addKey('SPACE')
    };
    this.fireKey = scene.input.keyboard.addKey('X');

    this.justJumped = false;
  }

  update() {
    if (this.isDead) return;

    const onGround = this.body.blocked.down || this.body.touching.down;

    if (onGround) {
      this.jumpsLeft = this.maxJumps;
    }

    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                        Phaser.Input.Keyboard.JustDown(this.wasd.up) ||
                        Phaser.Input.Keyboard.JustDown(this.wasd.space);

    // On ice we steer with acceleration + low drag so the player keeps sliding
    // after the key is released (slippery). On normal ground we set velocity
    // directly, which stops instantly when no key is held (precise control).
    // `onIce` is set true by the ice-platform collider each frame and cleared at
    // the end of update(), so it only stays on while actually touching ice.
    if (this.onIce) {
      if (left) {
        this.setAccelerationX(-300);
      } else if (right) {
        this.setAccelerationX(300);
      } else {
        this.setAccelerationX(0);
      }
      this.body.setMaxVelocityX(this.speed);
      this.setDragX(100);
    } else {
      this.setAccelerationX(0);
      this.setDragX(0);
      if (left) {
        this.setVelocityX(-this.speed);
      } else if (right) {
        this.setVelocityX(this.speed);
      } else {
        this.setVelocityX(0);
      }
    }

    if (left) this.setFlipX(true);
    else if (right) this.setFlipX(false);
    if (left) this.facing = -1;
    else if (right) this.facing = 1;

    // jumpsLeft starts at maxJumps (2) and resets on the ground. The first press
    // (jumpsLeft === maxJumps) is the full ground jump; any later press in the
    // air is the weaker double jump.
    if (jumpPressed && this.jumpsLeft > 0) {
      const isDoubleJump = this.jumpsLeft < this.maxJumps;
      let force = isDoubleJump ? this.doubleJumpForce : this.jumpForce;
      
      // If jumping from an ice platform, reduce the jump force by 50%
      if (!isDoubleJump && this.onIce) {
        force = force * 0.5;
      }
      
      this.setVelocityY(force);
      this.jumpsLeft--;
      this.scene.playSfx(isDoubleJump ? 'doubleJump' : 'jump');
    }

    if (Phaser.Input.Keyboard.JustDown(this.fireKey)) {
      this.fire();
    }

    this.onIce = false;
  }

  fire() {
    const time = this.scene.time.now;
    if (time < this.lastFired + this.fireCooldown) return;

    if (this.ammo <= 0) {
      this.scene.playSfx('noAmmo');
      this.scene.showFloatingText(this.x, this.y - 35, 'NO BULLETS', '#ff7043');
      this.lastFired = time;
      return;
    }

    this.ammo--;
    this.lastFired = time;
    this.scene.firePlayerBullet(this.x + this.facing * 20, this.y - 4, this.facing);
    this.scene.events.emit('updateAmmo', this.ammo, this.maxAmmo);
  }

  addAmmo(amount) {
    this.ammo = Math.min(this.maxAmmo, this.ammo + amount);
    this.scene.events.emit('updateAmmo', this.ammo, this.maxAmmo);
  }

  applyPowerup(type, duration, value) {
    if (this.powerupTimers[type]) {
      this.powerupTimers[type].remove(false);
    }

    if (type === 'shield') {
      this.isInvulnerable = true;
      this.setTint(0x80deea);
    } else if (type === 'speed') {
      this.speed = this.baseSpeed + value;
      this.setTint(0x76ff03);
    } else if (type === 'rapid') {
      this.fireCooldown = Math.max(120, this.baseFireCooldown - value);
      this.setTint(0xffb74d);
    } else if (type === 'ammo') {
      // Bullet powerup: always grants a fixed number of bullets (ignores level value).
      this.addAmmo(this.bulletsPerPickup);
      return;
    }

    this.scene.events.emit('powerupActive', type, duration);
    this.powerupTimers[type] = this.scene.time.delayedCall(duration, () => {
      this.clearPowerup(type);
    });
  }

  clearPowerup(type) {
    if (type === 'shield') {
      this.isInvulnerable = false;
    } else if (type === 'speed') {
      this.speed = this.baseSpeed;
    } else if (type === 'rapid') {
      this.fireCooldown = this.baseFireCooldown;
    }

    delete this.powerupTimers[type];
    // Only drop the colour tint once every powerup has expired (and no shield is
    // keeping us invulnerable), so overlapping powerups don't clear each other's tint.
    if (Object.keys(this.powerupTimers).length === 0 && !this.isInvulnerable) {
      this.clearTint();
    }
    this.scene.events.emit('powerupEnded', type);
  }

  takeDamage(amount) {
    // Shield / post-hit i-frames block damage. Returning false means "still alive".
    if ((this.scene && this.scene.showDebug) || this.isInvulnerable || this.isDead) return false;

    this.health -= amount;
    this.isInvulnerable = true; // brief i-frames; cleared when the flash tween ends

    this.scene.tweens.add({
      targets: this,
      alpha: 0.3,
      duration: 100,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        this.alpha = 1;
        this.isInvulnerable = false;
      }
    });

    if (this.health <= 0) {
      this.health = 0;
      return true;
    }
    return false;
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  applySlow(duration) {
    this.isSlowed = true;
    this.speed = this.baseSpeed * 0.45;
    this.setTint(0x90a4ae);
    if (this.slowTimer) this.slowTimer.remove(false);
    this.slowTimer = this.scene.time.delayedCall(duration, () => {
      this.isSlowed = false;
      this.speed = this.baseSpeed;
      this.slowTimer = null;
      if (Object.keys(this.powerupTimers).length === 0 && !this.isInvulnerable) {
        this.clearTint();
      }
    });
  }

  die() {
    this.isDead = true;
    this.setVelocity(0, -300);
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      angle: 180,
      duration: 800
    });
  }

  superJump() {
    this.setVelocityY(this.jumpForce * 1.5);
    this.scene.playSfx('jump');
  }
}
