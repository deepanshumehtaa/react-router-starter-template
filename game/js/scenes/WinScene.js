class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.totalTime = data.totalTime || 0;
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.cameras.main.setBackgroundColor('#0d0d2b');
    this.createStarfield();

    this.playApplause();

    this.add.text(width / 2, 80, 'YOU ESCAPED!', {
      fontSize: '48px',
      fontFamily: 'monospace',
      color: '#ffd54f',
      fontStyle: 'bold',
      stroke: '#f57f17',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(width / 2, 140, 'Congratulations, Space Explorer!', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#81d4fa'
    }).setOrigin(0.5);

    this.add.text(width / 2, 240, 'FINAL SCORE', {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#90a4ae'
    }).setOrigin(0.5);

    this.add.text(width / 2, 280, this.finalScore.toString(), {
      fontSize: '48px',
      fontFamily: 'monospace',
      color: '#ffd54f',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    let rank = 'Cadet';
    if (this.finalScore >= 10000) rank = 'Admiral';
    else if (this.finalScore >= 7000) rank = 'Captain';
    else if (this.finalScore >= 5000) rank = 'Commander';
    else if (this.finalScore >= 3000) rank = 'Lieutenant';
    else if (this.finalScore >= 1500) rank = 'Ensign';

    this.add.text(width / 2, 340, 'Rank: ' + rank, {
      fontSize: '24px',
      fontFamily: 'monospace',
      color: '#ce93d8',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 390, 'Total Time: ' + this.formatTime(this.totalTime), {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#80deea',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const menuBtn = this.add.text(width / 2, 460, '[ PLAY AGAIN ]', {
      fontSize: '24px',
      fontFamily: 'monospace',
      color: '#4caf50',
      fontStyle: 'bold'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    menuBtn.on('pointerover', () => menuBtn.setColor('#66bb6a').setScale(1.1));
    menuBtn.on('pointerout', () => menuBtn.setColor('#4caf50').setScale(1));
    menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));

    this.tweens.add({ targets: menuBtn, alpha: 0.5, duration: 600, yoyo: true, repeat: -1 });

    for (let i = 0; i < 30; i++) {
      this.time.delayedCall(i * 100, () => {
        const x = Phaser.Math.Between(100, 700);
        const particle = this.add.image(x, 600, 'star').setScale(0.8);
        this.tweens.add({
          targets: particle,
          y: Phaser.Math.Between(-50, 200),
          x: x + Phaser.Math.Between(-80, 80),
          alpha: 0,
          scale: 0.1,
          duration: Phaser.Math.Between(1500, 3000),
          onComplete: () => particle.destroy()
        });
      });
    }
  }

  createStarfield() {
    for (let i = 0; i < 150; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);
      const s = this.add.image(x, y, 'bgStar')
        .setScale(Phaser.Math.FloatBetween(0.3, 1.5))
        .setAlpha(Phaser.Math.FloatBetween(0.2, 0.9));
      this.tweens.add({
        targets: s,
        alpha: Phaser.Math.FloatBetween(0.1, 0.3),
        duration: Phaser.Math.Between(800, 2500),
        yoyo: true,
        repeat: -1
      });
    }
  }

  // Audience applause: a swell of band-passed noise (the crowd) with a clapping
  // tremolo, plus a few cheer-whistle tones on top.
  playApplause() {
    const ctx = this.sound && this.sound.context;
    if (!ctx || ctx.state !== 'running') return;
    const duration = 3.0;
    const t = ctx.currentTime;

    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1900;
    bp.Q.value = 0.7;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.32, t + 0.5);  // crowd swells in
    gain.gain.setValueAtTime(0.32, t + 2.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    // Tremolo to give a clapping flutter.
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'square';
    lfo.frequency.value = 11;
    lfoGain.gain.value = 0.12;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    src.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);
    src.start(t);
    src.stop(t + duration);
    lfo.start(t);
    lfo.stop(t + duration);

    // Cheer whistles.
    [0.2, 0.9, 1.6].forEach((off, k) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(900 + k * 200, t + off);
      o.frequency.linearRampToValueAtTime(1300 + k * 200, t + off + 0.3);
      g.gain.setValueAtTime(0.0001, t + off);
      g.gain.exponentialRampToValueAtTime(0.06, t + off + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + off + 0.4);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t + off);
      o.stop(t + off + 0.45);
    });
  }
}
