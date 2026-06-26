class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  init(data) {
    this.level = data.level || 1;
    this.score = data.score || 0;
    this.lives = data.lives || 3;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.ammo = data.ammo || 0;
    this.maxAmmo = data.maxAmmo || 0;
  }

  create() {
    this.gameScene = this.scene.get('GameScene');
    this.hearts = [];
    for (let i = 0; i < this.lives; i++) {
      this.hearts.push(this.add.image(30 + i * 28, 25, 'heart').setScale(1.2));
    }

    this.scoreText = this.add.text(160, 16, 'Score: ' + this.score, {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#ffd54f',
      fontStyle: 'bold'
    });

    this.levelText = this.add.text(650, 16, 'Level ' + this.level, {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#4fc3f7',
      fontStyle: 'bold'
    });

    this.healthBarBg = this.add.graphics();
    this.healthBarBg.fillStyle(0x333333, 0.8);
    this.healthBarBg.fillRoundedRect(350, 12, 120, 18, 4);

    this.healthBar = this.add.graphics();
    this.drawHealthBar();

    this.weaponText = this.add.text(160, 42, 'Weapon: Blaster', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#4fc3f7',
      fontStyle: 'bold'
    });

    this.ammoText = this.add.text(350, 42, 'Bullets: ' + this.ammo + '/' + this.maxAmmo, {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffeb3b',
      fontStyle: 'bold'
    });

    this.powerupText = this.add.text(540, 42, '', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#76ff03',
      fontStyle: 'bold'
    });

    this.starsText = this.add.text(490, 16, '0/0 STARS', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#ffd54f'
    });

    this.timerText = this.add.text(650, 42, 'Time 00:00', {
      fontSize: '14px',
      fontFamily: 'monospace',
      color: '#80deea',
      fontStyle: 'bold'
    });

    this.onUpdateScore = (score) => {
      if (!this.scoreText || !this.scoreText.active) return;
      this.score = score;
      this.scoreText.setText('Score: ' + score);
    };
    this.onUpdateLives = (lives) => {
      this.lives = lives;
      this.updateHearts();
    };
    this.onUpdateHealth = (health) => {
      this.health = health;
      this.drawHealthBar();
    };
    this.onStarsInfo = (collected, total) => {
      if (!this.starsText || !this.starsText.active) return;
      this.starsText.setText(collected + '/' + total + ' STARS');
    };
    this.onUpdateAmmo = (ammo, maxAmmo) => {
      if (!this.ammoText || !this.ammoText.active) return;
      this.ammo = ammo;
      this.maxAmmo = maxAmmo;
      this.ammoText.setText('Bullets: ' + ammo + '/' + maxAmmo);
    };
    this.activePowerups = {};
    this.onPowerupActive = (type, duration) => {
      this.activePowerups[type] = Math.ceil(duration / 1000);
      this.updatePowerupText();
    };
    this.onPowerupEnded = (type) => {
      delete this.activePowerups[type];
      this.updatePowerupText();
    };

    // The HUD listens to events emitted by GameScene. Those listeners live on the
    // GameScene emitter, so we MUST remove them when this UIScene shuts down —
    // otherwise stale callbacks from a previous level keep firing into destroyed
    // text objects on the next level and crash. Hence removeGameSceneListeners on shutdown.
    this.gameScene.events.on('updateScore', this.onUpdateScore);
    this.gameScene.events.on('updateLives', this.onUpdateLives);
    this.gameScene.events.on('updateHealth', this.onUpdateHealth);
    this.gameScene.events.on('starsInfo', this.onStarsInfo);
    this.gameScene.events.on('updateAmmo', this.onUpdateAmmo);
    this.gameScene.events.on('powerupActive', this.onPowerupActive);
    this.gameScene.events.on('powerupEnded', this.onPowerupEnded);

    this.events.once('shutdown', this.removeGameSceneListeners, this);
  }

  removeGameSceneListeners() {
    if (!this.gameScene) return;
    this.gameScene.events.off('updateScore', this.onUpdateScore);
    this.gameScene.events.off('updateLives', this.onUpdateLives);
    this.gameScene.events.off('updateHealth', this.onUpdateHealth);
    this.gameScene.events.off('starsInfo', this.onStarsInfo);
    this.gameScene.events.off('updateAmmo', this.onUpdateAmmo);
    this.gameScene.events.off('powerupActive', this.onPowerupActive);
    this.gameScene.events.off('powerupEnded', this.onPowerupEnded);
    this.gameScene = null;
  }

  updatePowerupText() {
    const labels = Object.keys(this.activePowerups).map(type => type.toUpperCase());
    this.powerupText.setText(labels.length ? 'Boost: ' + labels.join(' ') : '');
  }

  drawHealthBar() {
    this.healthBar.clear();
    const pct = this.health / this.maxHealth;
    let color = 0x4caf50;
    if (pct < 0.3) color = 0xf44336;
    else if (pct < 0.6) color = 0xff9800;
    this.healthBar.fillStyle(color, 1);
    this.healthBar.fillRoundedRect(352, 14, 116 * pct, 14, 3);
  }

  updateHearts() {
    this.hearts.forEach(h => h.destroy());
    this.hearts = [];
    for (let i = 0; i < this.lives; i++) {
      this.hearts.push(this.add.image(30 + i * 28, 25, 'heart').setScale(1.2));
    }
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  update() {
    if (!this.gameScene || !this.gameScene.sys || !this.gameScene.sys.isActive()) return;
    // Freeze the clock during the level-end / respawn transition.
    if (this.gameScene.transitioning || !this.gameScene.startTime) return;
    const elapsed = Math.max(0, (this.gameScene.time.now - this.gameScene.startTime) / 1000);
    if (this.timerText && this.timerText.active) {
      this.timerText.setText('Time ' + this.formatTime(elapsed));
    }
  }
}
