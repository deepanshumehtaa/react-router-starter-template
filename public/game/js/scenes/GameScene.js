class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.currentLevel = data.level || 1;
    this.score = data.score || 0;
    this.lives = data.lives || 3;
    this.checkpointX = data.checkpointX || null;
    this.checkpointY = data.checkpointY || null;
    this.starsCollected = 0;
    this.totalStars = 0;
    this.keysCollected = 0;
    this.keysRequired = 0;
    this.startTime = 0;
    this.transitioning = false;
    this.totalTime = data.totalTime || 0; // cumulative seconds across levels
    this.carriedAmmo = data.ammo || 0;    // leftover bullets carried in from the previous level
  }

  create() {
    const levelData = LEVELS[this.currentLevel];
    if (!levelData) {
      this.scene.start('WinScene', { score: this.score });
      return;
    }

    // Debug Mode: Set to true to show player, camera, and pointer coordinates, plus physics boundaries
    this.showDebug = false;
    if (this.showDebug) {
      this.physics.world.createDebugGraphic();
      this.debugText = this.add.text(10, 520, '', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 6, y: 6 }
      }).setScrollFactor(0).setDepth(1000);
    }

    this.cameras.main.setBackgroundColor(levelData.bgColor);
    // World is taller than the view so the player can actually fall into pits
    // (the camera stays bounded to 600, so pits read as a deep fall into the dark).
    this.physics.world.setBounds(0, 0, levelData.worldWidth, 1200);

    this.createStarfield(levelData.worldWidth);

    this.platforms = this.physics.add.staticGroup();
    this.icePlatforms = this.physics.add.staticGroup();
    this.buildPlatforms(levelData);

    this.hazards = this.physics.add.staticGroup();
    this.lavaGroup = this.physics.add.staticGroup();
    this.buildHazards(levelData);

    this.collectibles = this.physics.add.staticGroup();
    this.gemGroup = this.physics.add.staticGroup();
    this.keyGroup = this.physics.add.staticGroup();
    this.powerupGroup = this.physics.add.staticGroup();
    this.buildCollectibles(levelData);

    this.trampolineGroup = this.physics.add.staticGroup();
    this.buildTrampolines(levelData);

    const startX = this.checkpointX || levelData.playerStart.x;
    const startY = this.checkpointY || levelData.playerStart.y;
    this.player = new Player(this, startX, startY);
    // Carry the leftover bullet balance forward instead of resetting to 0 each level.
    this.player.ammo = this.carriedAmmo;
    this.playerBullets = this.physics.add.group({
      defaultKey: 'playerBullet',
      maxSize: 24
    });

    this.movingPlatformGroup = [];
    this.buildMovingPlatforms(levelData);

    this.crumbleGroup = [];
    this.buildCrumblingPlatforms(levelData);

    this.iceCrumbleGroup = this.physics.add.staticGroup();
    this.buildIceCrumble(levelData);

    this.checkpointGroup = this.physics.add.staticGroup();
    this.buildCheckpoints(levelData);

    this.door = this.physics.add.staticImage(levelData.door.x, levelData.door.y, 'door');
    this.door.setSize(28, 44);

    this.enemies = [];
    this.shooterBulletGroups = [];
    this.buildEnemies(levelData);

    this.bossRef = null;
    if (levelData.boss) {
      this.bossRef = new Boss(this, levelData.boss.x, levelData.boss.y, levelData.boss);
      this.physics.add.collider(this.bossRef, this.platforms);
      this.physics.add.collider(this.bossRef, this.icePlatforms);
    }

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.icePlatforms, (player) => {
      player.onIce = true;
    });
    this.physics.add.collider(this.player, this.iceCrumbleGroup, this.onIceCrumbleTouch, null, this);

    this.physics.add.overlap(this.player, this.collectibles, this.collectStar, null, this);
    this.physics.add.overlap(this.player, this.gemGroup, this.collectGem, null, this);
    this.physics.add.overlap(this.player, this.keyGroup, this.collectKey, null, this);
    this.physics.add.overlap(this.player, this.powerupGroup, this.collectPowerup, null, this);
    this.physics.add.overlap(this.player, this.hazards, this.hitHazard, null, this);
    this.physics.add.overlap(this.player, this.lavaGroup, this.hitLava, null, this);
    this.physics.add.overlap(this.player, this.trampolineGroup, this.hitTrampoline, null, this);
    this.physics.add.overlap(this.player, this.checkpointGroup, this.hitCheckpoint, null, this);
    this.physics.add.overlap(this.player, this.door, this.reachDoor, null, this);

    this.enemies.forEach(e => {
      this.physics.add.collider(e, this.platforms);
      this.physics.add.collider(e, this.icePlatforms);
      this.physics.add.collider(e, this.iceCrumbleGroup);
    });
    this.physics.add.collider(this.playerBullets, this.platforms, this.disableBullet, null, this);
    this.physics.add.collider(this.playerBullets, this.icePlatforms, this.disableBullet, null, this);
    this.physics.add.collider(this.playerBullets, this.iceCrumbleGroup, this.disableBullet, null, this);

    this.setupEnemyCollisions();

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, levelData.worldWidth, 600);

    this.scene.stop('UIScene');
    this.scene.launch('UIScene', {
      level: this.currentLevel,
      score: this.score,
      lives: this.lives,
      ammo: this.player.ammo,
      maxAmmo: this.player.maxAmmo
    });

    this.startTime = this.time.now;
    this.totalStars = levelData.stars.length;
    this.keysRequired = levelData.keys ? levelData.keys.length : 0;

    this.showLevelTitle(levelData.name);
  }

  showLevelTitle(name) {
    const title = this.add.text(400, 250, 'Level ' + this.currentLevel, {
      fontSize: '36px',
      fontFamily: 'monospace',
      color: '#4fc3f7',
      fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    const subtitle = this.add.text(400, 290, name, {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#ffd54f'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    this.tweens.add({
      targets: [title, subtitle],
      alpha: 0,
      delay: 2000,
      duration: 500,
      onComplete: () => { title.destroy(); subtitle.destroy(); }
    });
  }

  createStarfield(worldWidth) {
    const count = Math.floor(worldWidth / 10);
    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(0, worldWidth);
      const y = Phaser.Math.Between(0, 500);
      const s = this.add.image(x, y, 'bgStar')
        .setScale(Phaser.Math.FloatBetween(0.2, 0.8))
        .setAlpha(Phaser.Math.FloatBetween(0.1, 0.5))
        .setDepth(-1);
    }
  }

  buildPlatforms(data) {
    data.platforms.forEach(p => {
      for (let i = 0; i < p.w; i++) {
        const tile = p.tile || data.groundTile;
        const group = tile === 'ice' ? this.icePlatforms : this.platforms;
        group.create(p.x + i * 32 + 16, p.y + 16, tile);
      }
    });
  }

  buildHazards(data) {
    this.spikeList = [];
    if (data.spikes) {
      data.spikes.forEach((s, i) => {
        const spike = this.hazards.create(s.x + 16, s.y + 16, 'spike');
        spike.setSize(24, 20).setOffset(4, 12);
        spike.baseY = s.y + 16;   // centre when fully grown
        spike.mergedY = s.y + 31; // sunk into the ground
        this.spikeList.push(spike);
        this.setupSpikeCycle(spike, i);
      });
    }
    if (data.lava) {
      data.lava.forEach(l => {
        for (let i = 0; i < l.w; i++) {
          const lv = this.lavaGroup.create(l.x + i * 32 + 16, l.y + 16, 'lava');
          lv.setSize(32, 24).setOffset(0, 4);
          lv.setDepth(-0.5); // behind ground/platforms so pit-edge overlap is hidden
        }
      });
    }
  }

  // Spikes grow out of the ground and merge back in on a stagger so the floor is
  // only dangerous while a spike is extended. Body is enabled only while grown.
  setupSpikeCycle(spike, i) {
    spike.scaleY = 0.04;          // start merged into the ground
    spike.y = spike.mergedY;
    spike.body.enable = false;
    const upTime = 1400 + (i % 3) * 500;    // how long it stays out
    const downTime = 1200 + (i % 4) * 350;  // how long it hides

    const grow = () => {
      if (!spike.active) return;
      this.tweens.add({
        targets: spike, scaleY: 1, y: spike.baseY, duration: 260, ease: 'Back.easeOut',
        onComplete: () => { if (spike.active) spike.body.enable = true; }
      });
      this.time.delayedCall(260 + upTime, () => {
        if (!spike.active) return;
        spike.body.enable = false;
        this.tweens.add({ targets: spike, scaleY: 0.04, y: spike.mergedY, duration: 220, ease: 'Sine.easeIn' });
        this.time.delayedCall(220 + downTime, grow);
      });
    };

    // Stagger the start so spikes are not all synchronised.
    this.time.delayedCall((i * 330) % 2100, grow);
  }

  buildCollectibles(data) {
    data.stars.forEach(s => {
      this.collectibles.create(s.x, s.y, 'star');
    });
    if (data.gems) {
      data.gems.forEach(g => {
        this.gemGroup.create(g.x, g.y, 'gem');
      });
    }
    if (data.keys) {
      data.keys.forEach(k => {
        this.keyGroup.create(k.x, k.y, 'key');
      });
    }
    if (data.powerups) {
      data.powerups.forEach(p => {
        const texture = 'powerup' + p.type.charAt(0).toUpperCase() + p.type.slice(1);
        const powerup = this.powerupGroup.create(p.x, p.y, texture);
        powerup.powerupType = p.type;
        powerup.duration = p.duration || 6000;
        powerup.value = p.value || 0;
      });
    }
  }

  buildTrampolines(data) {
    if (data.trampolines) {
      data.trampolines.forEach(t => {
        this.trampolineGroup.create(t.x + 24, t.y + 8, 'trampoline');
      });
    }
  }

  buildMovingPlatforms(data) {
    if (data.movingPlatforms) {
      data.movingPlatforms.forEach(mp => {
        // Immovable + no-gravity image moved by a tween (not physics velocity).
        // The player rides it because the tween repositions the body each frame
        // and the collider keeps the player resting on top.
        const plat = this.physics.add.image(mp.x, mp.y, 'movingPlatform');
        plat.setImmovable(true);
        plat.body.setAllowGravity(false);
        plat.setFriction(1);

        // Yoyo back and forth forever between the start point and start+offset.
        const tweenConfig = {
          targets: plat,
          duration: mp.speed,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        };
        if (mp.moveX) tweenConfig.x = mp.x + mp.moveX;
        if (mp.moveY) tweenConfig.y = mp.y + mp.moveY;

        this.tweens.add(tweenConfig);

        this.physics.add.collider(this.player, plat, (player, platform) => {
          if (player.body.touching.down && platform.body.touching.up) {
            player.ridingPlatform = platform;
          }
        });

        this.movingPlatformGroup.push(plat);
      });
    }
  }

  buildCrumblingPlatforms(data) {
    if (data.crumblingPlatforms) {
      data.crumblingPlatforms.forEach(cp => {
        const plat = this.physics.add.image(cp.x + 32, cp.y + 8, 'crumble');
        plat.setImmovable(true);
        plat.body.setAllowGravity(false);
        plat.crumbling = false;

        this.physics.add.collider(this.player, plat, (player, platform) => {
          if (!platform.crumbling && player.body.touching.down) {
            platform.crumbling = true;
            this.tweens.add({
              targets: platform,
              alpha: 0.3,
              x: platform.x + Phaser.Math.Between(-3, 3),
              duration: 100,
              yoyo: true,
              repeat: 4,
              onComplete: () => {
                platform.body.enable = false;
                this.tweens.add({
                  targets: platform,
                  alpha: 0,
                  y: platform.y + 50,
                  duration: 300,
                  onComplete: () => {
                    this.time.delayedCall(3000, () => {
                      platform.body.enable = true;
                      platform.alpha = 1;
                      platform.y = cp.y + 8;
                      platform.crumbling = false;
                      platform.body.reset(cp.x + 32, cp.y + 8);
                    });
                  }
                });
              }
            });
          }
        });

        this.crumbleGroup.push(plat);
      });
    }
  }

  buildIceCrumble(data) {
    if (!data.iceCrumble) return;
    data.iceCrumble.forEach((cp, gi) => {
      const w = cp.w || 2;
      for (let i = 0; i < w; i++) {
        const homeX = cp.x + i * 32 + 16;
        const homeY = cp.y + 8;
        const tile = this.iceCrumbleGroup.create(homeX, homeY, 'iceCrumble');
        tile.groupId = gi;
        tile.homeX = homeX;
        tile.homeY = homeY;
        tile.crumbling = false;
      }
    });
  }

  onIceCrumbleTouch(player, tile) {
    if (player.body.touching.down && !tile.crumbling) {
      this.crumbleIceGroup(tile.groupId);
    }
  }

  crumbleIceGroup(groupId) {
    const tiles = this.iceCrumbleGroup.getChildren().filter(
      t => t.groupId === groupId && !t.crumbling
    );
    if (!tiles.length) return;
    this.playSfx('crumble');

    tiles.forEach(tile => {
      tile.crumbling = true;
      this.tweens.add({
        targets: tile,
        alpha: 0.35,
        duration: 90,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          tile.disableBody(true, true);
          this.time.delayedCall(3000, () => {
            tile.enableBody(true, tile.homeX, tile.homeY, true, true);
            tile.alpha = 1;
            tile.crumbling = false;
          });
        }
      });
    });
  }

  buildCheckpoints(data) {
    if (data.checkpoints) {
      data.checkpoints.forEach(cp => {
        const flag = this.checkpointGroup.create(cp.x, cp.y, 'checkpoint');
        flag.cpX = cp.x;
        flag.cpY = cp.y - 30;
        // Set the bounding box to match the flag sprite (slightly wider for easy collision)
        flag.body.setSize(32, 48);
        flag.refreshBody();
        if (this.checkpointX === flag.cpX && this.checkpointY === flag.cpY) {
          flag.setTexture('checkpointActive');
        }
      });
    }
  }

  buildEnemies(data) {
    data.enemies.forEach((e, idx) => {
      let enemy;
      // Alternate green/purple for variety unless the level specifies a colour.
      const cfg = Object.assign({}, e);
      if (!cfg.color) cfg.color = (idx % 2 === 0) ? 'green' : 'purple';
      switch (e.type) {
        case 'walker':
          enemy = new EnemyWalker(this, e.x, e.y, cfg);
          break;
        case 'flyer':
          enemy = new EnemyFlyer(this, e.x, e.y, cfg);
          break;
        case 'shooter':
          enemy = new EnemyShooter(this, e.x, e.y, e);
          this.shooterBulletGroups.push(enemy.bullets);
          break;
      }
      if (enemy) this.enemies.push(enemy);
    });
  }

  // True if a solid "brick" (ground, platform, ice, or ice-crumble) sits under
  // the given world point. Walkers use this for ledge detection so they only
  // patrol on solid floors and never wander onto lava, gaps, or empty space.
  // overlapRect queries the physics RTree (fast); we then keep only bodies that
  // belong to a walkable group (lava/spikes/checkpoints are static too but excluded).
  isBrickUnder(x, y) {
    const bodies = this.physics.overlapRect(x - 1, y - 1, 2, 2, false, true);
    for (const body of bodies) {
      const go = body.gameObject;
      if (!go) continue;
      if (this.platforms.contains(go) ||
          this.icePlatforms.contains(go) ||
          (this.iceCrumbleGroup && this.iceCrumbleGroup.contains(go))) {
        return true;
      }
    }
    return false;
  }

  setupEnemyCollisions() {
    this.enemies.forEach(enemy => {
      this.physics.add.overlap(this.player, enemy, (player, e) => {
        if (player.isDead) return;
        if (player.body.velocity.y > 0 && player.y < e.y - 10) {
          player.setVelocityY(-300);
          if (e.hit()) {
            this.score += 100;
            this.events.emit('updateScore', this.score);
            this.playSfx('enemyKill');
          } else {
            this.playSfx('enemyHit');
          }
        } else {
          this.playerHit(20);
        }
      });

      // NOTE: pass the sprite (enemy) FIRST and the group (playerBullets) second.
      // For sprite-vs-group overlaps Phaser always calls back as (sprite, groupMember),
      // regardless of the argument order here — so ordering them this way keeps the
      // params correct. (Passing the group first silently swaps them: `e` would be
      // the bullet and `e.hit` would throw, freezing the game loop.)
      this.physics.add.overlap(enemy, this.playerBullets, (e, bullet) => {
        if (!bullet.active) return; // a spent bullet still overlaps for a few frames; only score once
        this.disableBullet(bullet);
        if (!e.active) return;
        if (e.hit(bullet.damage || 1)) {
          this.score += 100;
          this.events.emit('updateScore', this.score);
          this.playSfx('enemyKill');
          this.showFloatingText(e.x, e.y - 20, '+100', '#ffd54f');
        } else {
          this.playSfx('enemyHit');
          this.showFloatingText(e.x, e.y - 20, 'HIT', '#4fc3f7');
        }
      });
    });

    this.shooterBulletGroups.forEach(bullets => {
      this.physics.add.overlap(this.player, bullets, (player, bullet) => {
        if (player.isDead) return;
        bullet.setActive(false).setVisible(false);
        bullet.body.stop();
        this.playerHit(15);
      });
    });

    if (this.bossRef) {
      this.physics.add.overlap(this.player, this.bossRef, (player, boss) => {
        if (player.isDead) return;
        if (player.body.velocity.y > 0 && player.y < boss.y - 20) {
          player.setVelocityY(-350);
          if (boss.hit()) {
            this.score += 1000;
            this.events.emit('updateScore', this.score);
            this.playSfx('bossDefeated');
          } else {
            this.playSfx('bossHit');
          }
        } else {
          this.playerHit(25);
        }
      });

      this.physics.add.overlap(this.player, this.bossRef.bullets, (player, bullet) => {
        if (player.isDead) return;
        bullet.setActive(false).setVisible(false);
        bullet.body.stop();
        this.playerHit(20);
      });

      // Sprite (boss) first, group (playerBullets) second — see note above.
      this.physics.add.overlap(this.bossRef, this.playerBullets, (boss, bullet) => {
        if (!bullet.active) return;
        this.disableBullet(bullet);
        if (!boss.active) return;
        if (boss.hit(bullet.damage || 1)) {
          this.score += 1000;
          this.events.emit('updateScore', this.score);
          this.playSfx('bossDefeated');
        } else {
          this.playSfx('bossHit');
        }
      });
    }
  }

  firePlayerBullet(x, y, direction) {
    const bullet = this.playerBullets.get(x, y);
    if (!bullet) return;

    bullet.setActive(true).setVisible(true);
    bullet.setFlipX(direction < 0);
    bullet.body.setAllowGravity(false);
    bullet.body.setSize(16, 6);
    bullet.damage = 1;
    bullet.setVelocity(direction * 520, 0);
    this.playSfx('fire');
  }

  disableBullet(bullet) {
    bullet.setActive(false).setVisible(false);
    if (bullet.body) bullet.body.stop();
  }

  collectStar(player, star) {
    star.destroy();
    this.score += 50;
    this.starsCollected++;
    this.events.emit('updateScore', this.score);
    this.events.emit('starsInfo', this.starsCollected, this.totalStars);
    this.playSfx('collect');

    this.tweens.add({
      targets: this.add.text(star.x, star.y - 10, '+50', {
        fontSize: '14px', fontFamily: 'monospace', color: '#ffd54f', fontStyle: 'bold'
      }).setOrigin(0.5),
      y: star.y - 40,
      alpha: 0,
      duration: 600,
      onComplete: function() { this.targets[0].destroy(); }
    });
  }

  collectGem(player, gem) {
    gem.destroy();
    this.score += 200;
    this.events.emit('updateScore', this.score);
    this.player.heal(25);
    this.events.emit('updateHealth', this.player.health);
    this.playSfx('heal');

    this.tweens.add({
      targets: this.add.text(gem.x, gem.y - 10, '+25 HP', {
        fontSize: '14px', fontFamily: 'monospace', color: '#ef5350', fontStyle: 'bold'
      }).setOrigin(0.5),
      y: gem.y - 40,
      alpha: 0,
      duration: 800,
      onComplete: function() { this.targets[0].destroy(); }
    });
  }

  collectKey(player, key) {
    key.destroy();
    this.keysCollected++;
    this.score += 300;
    this.events.emit('updateScore', this.score);
    this.playSfx('key');

    this.tweens.add({
      targets: this.add.text(key.x, key.y - 10, 'KEY!', {
        fontSize: '16px', fontFamily: 'monospace', color: '#ffc107', fontStyle: 'bold'
      }).setOrigin(0.5),
      y: key.y - 40,
      alpha: 0,
      duration: 800,
      onComplete: function() { this.targets[0].destroy(); }
    });
  }

  collectPowerup(player, powerup) {
    const type = powerup.powerupType;
    // The 'ammo' powerup is the Bullet powerup — collecting it is what lets the
    // player shoot (player starts with 0 bullets). Always grants a fixed amount.
    const label = type === 'ammo' ? 'BULLETS +' + this.player.bulletsPerPickup : type.toUpperCase();
    powerup.destroy();
    this.player.applyPowerup(type, powerup.duration, powerup.value);
    this.playSfx('powerup');
    this.showFloatingText(player.x, player.y - 40, label, '#76ff03');
  }

  hitHazard(player, spike) {
    // Only grown spikes have an enabled body, so overlaps only fire when dangerous.
    if (this.transitioning) return;
    const wasSlowed = player.isSlowed;
    player.applySlow(3000);
    if (!wasSlowed) {
      this.showFloatingText(player.x, player.y - 40, 'SLOWED!', '#90a4ae');
    }
    this.playerHit(10);
  }

  hitLava(player, lava) {
    this.playerHit(50);
    player.setVelocityY(-300);
  }

  hitTrampoline(player, trampoline) {
    player.superJump();
    this.tweens.add({
      targets: trampoline,
      scaleY: 0.6,
      duration: 100,
      yoyo: true
    });
  }

  hitCheckpoint(player, checkpoint) {
    if (checkpoint.texture.key !== 'checkpointActive') {
      checkpoint.setTexture('checkpointActive');
      this.checkpointX = checkpoint.cpX;
      this.checkpointY = checkpoint.cpY;
      this.playSfx('powerup');

      this.tweens.add({
        targets: this.add.text(checkpoint.x, checkpoint.y - 30, 'CHECKPOINT', {
          fontSize: '12px', fontFamily: 'monospace', color: '#4caf50', fontStyle: 'bold'
        }).setOrigin(0.5),
        y: checkpoint.y - 60,
        alpha: 0,
        duration: 1000,
        onComplete: function() { this.targets[0].destroy(); }
      });
    }
  }

  reachDoor(player, door) {
    if (this.transitioning) return;

    if (this.keysRequired > 0 && this.keysCollected < this.keysRequired) {
      if (!this.doorMessage) {
        this.doorMessage = this.add.text(door.x, door.y - 40, 'Need ' + (this.keysRequired - this.keysCollected) + ' more key(s)!', {
          fontSize: '14px', fontFamily: 'monospace', color: '#ff9800', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.playSfx('doorBlocked');
        this.time.delayedCall(2000, () => {
          if (this.doorMessage) { this.doorMessage.destroy(); this.doorMessage = null; }
        });
      }
      return;
    }

    this.transitioning = true;
    this.physics.pause();
    this.player.isDead = true;

    const elapsed = (this.time.now - this.startTime) / 1000;
    const levelData = LEVELS[this.currentLevel];
    const timeBonus = Math.max(0, Math.floor((levelData.timeLimit - elapsed) * 10));
    this.score += timeBonus;
    const timeTaken = elapsed;
    this.totalTime += timeTaken;
    this.playSfx('levelComplete');

    this.tweens.add({
      targets: this.player,
      alpha: 0,
      scale: 0.1,
      duration: 500,
      onComplete: () => {
        this.scene.stop('UIScene');
        if (this.currentLevel >= 10) {
          this.scene.start('WinScene', { score: this.score, totalTime: this.totalTime });
        } else {
          this.scene.start('LevelCompleteScene', {
            level: this.currentLevel,
            score: this.score,
            lives: this.lives,
            starsCollected: this.starsCollected,
            totalStars: this.totalStars,
            timeBonus: timeBonus,
            timeTaken: timeTaken,
            totalTime: this.totalTime,
            ammo: this.player.ammo
          });
        }
      }
    });
  }

  playerHit(damage) {
    if (this.transitioning) return;
    const healthBefore = this.player.health;
    const dead = this.player.takeDamage(damage);
    if (!dead && this.player.health === healthBefore) return;
    this.events.emit('updateHealth', this.player.health);
    this.playSfx(dead ? 'death' : 'hurt');

    this.cameras.main.shake(100, 0.01);

    if (dead) {
      this.transitioning = true;
      this.physics.pause();
      this.lives--;
      this.events.emit('updateLives', this.lives);

      if (this.lives <= 0) {
        this.player.die();
        this.time.delayedCall(1000, () => {
          this.scene.stop('UIScene');
          this.scene.start('GameOverScene', {
            score: this.score,
            level: this.currentLevel
          });
        });
      } else {
        this.player.die();
        this.time.delayedCall(1000, () => {
          this.respawnPlayer();
        });
      }
    }
  }

  // Bring the player back after a non-fatal death (still has lives). Reuses the
  // same GameScene instance (no scene restart) so collected stars/keys/score and
  // the activated checkpoint all persist. Respawns at the last checkpoint, or the
  // level start if none was touched, with a short window of invulnerability.
  respawnPlayer() {
    const levelData = LEVELS[this.currentLevel];
    const respawnX = this.checkpointX || levelData.playerStart.x;
    const respawnY = this.checkpointY || levelData.playerStart.y;

    this.physics.resume();
    this.transitioning = false;
    this.player.isDead = false;
    this.player.health = this.player.maxHealth;
    this.player.alpha = 1;
    this.player.angle = 0;
    this.player.clearTint();
    this.player.setPosition(respawnX, respawnY);
    this.player.setVelocity(0, 0);
    this.player.body.enable = true;
    this.player.jumpsLeft = this.player.maxJumps;
    this.player.isInvulnerable = true;

    this.events.emit('updateHealth', this.player.health);
    this.cameras.main.pan(respawnX, respawnY, 250, 'Sine.easeInOut');
    this.time.delayedCall(1200, () => {
      if (!this.player.isDead) this.player.isInvulnerable = false;
    });
  }

  shutdown() {
    this.events.off('updateScore');
    this.events.off('updateLives');
    this.events.off('updateHealth');
    this.events.off('starsInfo');
  }

  update(time, delta) {
    if (this.showDebug && this.debugText && this.player) {
      const pointer = this.input.activePointer;
      this.debugText.setText([
        `Player: X=${Math.round(this.player.x)} Y=${Math.round(this.player.y)}`,
        `Camera ScrollX: ${Math.round(this.cameras.main.scrollX)}`,
        `Pointer: WorldX=${Math.round(pointer.worldX)} WorldY=${Math.round(pointer.worldY)}`
      ]);
    }

    // While `transitioning` (level-complete or death animation) freeze all gameplay
    // updates so nothing moves or re-triggers during the scene change / respawn.
    if (!this.player || this.player.isDead || this.transitioning) return;

    // Apply moving platform displacement to the player if riding
    if (this.movingPlatformGroup) {
      this.movingPlatformGroup.forEach(plat => {
        if (plat.prevX === undefined) {
          plat.prevX = plat.x;
          plat.prevY = plat.y;
        }

        const deltaX = plat.x - plat.prevX;
        const deltaY = plat.y - plat.prevY;

        plat.prevX = plat.x;
        plat.prevY = plat.y;

        if (this.player.ridingPlatform === plat) {
          if (this.player.body.touching.down && plat.body.touching.up) {
            this.player.x += deltaX;
            this.player.y += deltaY;
          } else {
            this.player.ridingPlatform = null;
          }
        }
      });
    }

    this.player.update();

    this.enemies.forEach(e => {
      if (e.active) e.update(time, delta);
    });

    if (this.bossRef && this.bossRef.active) {
      this.bossRef.update(time);
    }

    this.playerBullets.children.iterate(bullet => {
      if (bullet && bullet.active && (bullet.x < -50 || bullet.x > this.physics.world.bounds.width + 50)) {
        this.disableBullet(bullet);
      }
    });

    // Deep fall into a pit: the player drops below the floor into the dark, then dies.
    if (this.player.y > 660) {
      this.fallToDeath();
    }
  }

  fallToDeath() {
    if (this.transitioning) return;
    this.transitioning = true;
    this.physics.pause();
    this.player.health = 0;
    this.player.isDead = true;
    this.events.emit('updateHealth', 0);
    this.playSfx('death');
    this.cameras.main.shake(150, 0.012);

    this.lives--;
    this.events.emit('updateLives', this.lives);

    if (this.lives <= 0) {
      this.time.delayedCall(800, () => {
        this.scene.stop('UIScene');
        this.scene.start('GameOverScene', {
          score: this.score,
          level: this.currentLevel
        });
      });
    } else {
      this.time.delayedCall(800, () => {
        this.respawnPlayer();
      });
    }
  }

  showFloatingText(x, y, text, color) {
    this.tweens.add({
      targets: this.add.text(x, y, text, {
        fontSize: '14px', fontFamily: 'monospace', color: color, fontStyle: 'bold'
      }).setOrigin(0.5),
      y: y - 30,
      alpha: 0,
      duration: 700,
      onComplete: function() { this.targets[0].destroy(); }
    });
  }

  // Tiny retro blips synthesised on the fly with the Web Audio API — no sound
  // files. Each entry is [frequencyHz, durationSeconds, waveform]; we play one
  // oscillator whose volume decays to near-zero over the duration (a short beep).
  // Skipped until the AudioContext is 'running' (browsers require a user gesture).
  playSfx(name) {
    if (!this.sound || !this.sound.context) return;
    const context = this.sound.context;
    if (context.state !== 'running') return;

    const sounds = {
      jump: [360, 0.05, 'sine'],
      doubleJump: [520, 0.06, 'sine'],
      collect: [760, 0.05, 'triangle'],
      heal: [620, 0.08, 'sine'],
      key: [900, 0.08, 'triangle'],
      hurt: [140, 0.12, 'sawtooth'],
      death: [90, 0.2, 'sawtooth'],
      enemyHit: [220, 0.06, 'square'],
      enemyKill: [420, 0.1, 'square'],
      fire: [980, 0.04, 'square'],
      noAmmo: [120, 0.08, 'square'],
      powerup: [680, 0.12, 'triangle'],
      doorBlocked: [160, 0.08, 'sawtooth'],
      levelComplete: [840, 0.18, 'triangle'],
      bossHit: [180, 0.08, 'sawtooth'],
      bossDefeated: [70, 0.25, 'sawtooth'],
      crumble: [240, 0.1, 'square']
    };
    const config = sounds[name];
    if (!config) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = config[2];
    oscillator.frequency.setValueAtTime(config[0], context.currentTime);
    gain.gain.setValueAtTime(0.06, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + config[1]);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + config[1]);
  }
}
