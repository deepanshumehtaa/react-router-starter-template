class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.levelReached = data.level || 1;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.cameras.main.setBackgroundColor('#1a0000');

    this.playFailSound();

    this.add.text(width / 2, 120, 'GAME OVER', {
      fontSize: '56px',
      fontFamily: 'monospace',
      color: '#f44336',
      fontStyle: 'bold',
      stroke: '#b71c1c',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(width / 2, 220, 'Final Score: ' + this.finalScore, {
      fontSize: '24px',
      fontFamily: 'monospace',
      color: '#ffd54f'
    }).setOrigin(0.5);

    this.add.text(width / 2, 270, 'Level Reached: ' + this.levelReached, {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#b0bec5'
    }).setOrigin(0.5);

    const retryBtn = this.add.text(width / 2, 380, '[ TRY AGAIN ]', {
      fontSize: '24px',
      fontFamily: 'monospace',
      color: '#4caf50',
      fontStyle: 'bold'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    retryBtn.on('pointerover', () => retryBtn.setColor('#66bb6a').setScale(1.1));
    retryBtn.on('pointerout', () => retryBtn.setColor('#4caf50').setScale(1));
    retryBtn.on('pointerdown', () => {
      this.scene.start('GameScene', { level: this.levelReached, score: 0, lives: 3 });
    });

    const menuBtn = this.add.text(width / 2, 440, '[ MAIN MENU ]', {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#78909c'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    menuBtn.on('pointerover', () => menuBtn.setColor('#b0bec5'));
    menuBtn.on('pointerout', () => menuBtn.setColor('#78909c'));
    menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));

    this.tweens.add({ targets: retryBtn, alpha: 0.5, duration: 600, yoyo: true, repeat: -1 });
  }

  // Sad descending "wah-wah-wahhh" fail jingle.
  playFailSound() {
    const ctx = this.sound && this.sound.context;
    if (!ctx || ctx.state !== 'running') return;
    const notes = [392.00, 349.23, 311.13, 246.94]; // G4, F4, Eb4, B3 (descending)
    let t = ctx.currentTime + 0.05;
    notes.forEach((freq, i) => {
      const last = i === notes.length - 1;
      const dur = last ? 0.7 : 0.3;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1400;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * (last ? 0.82 : 0.97), t + dur);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.18, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.05);
      t += dur * 0.95;
    });
  }
}
