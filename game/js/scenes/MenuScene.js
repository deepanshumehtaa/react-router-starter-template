class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.cameras.main;

    this.createStarfield();

    this.add.text(width / 2, 100, 'STELLAR', {
      fontSize: '64px',
      fontFamily: 'monospace',
      color: '#4fc3f7',
      fontStyle: 'bold',
      stroke: '#01579b',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(width / 2, 160, 'ESCAPE', {
      fontSize: '64px',
      fontFamily: 'monospace',
      color: '#ffd54f',
      fontStyle: 'bold',
      stroke: '#f57f17',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(width / 2, 220, 'A Space Platformer', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#90a4ae'
    }).setOrigin(0.5);

    const playBtn = this.add.text(width / 2, 320, '[ PLAY ]', {
      fontSize: '28px',
      fontFamily: 'monospace',
      color: '#4caf50',
      fontStyle: 'bold',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    playBtn.on('pointerover', () => playBtn.setColor('#66bb6a').setScale(1.1));
    playBtn.on('pointerout', () => playBtn.setColor('#4caf50').setScale(1));
    playBtn.on('pointerdown', () => {
      this.scene.start('GameScene', { level: 1, score: 0, lives: 3 });
    });

    this.tweens.add({
      targets: playBtn,
      alpha: 0.6,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    const controlsTitle = this.add.text(width / 2, 400, 'CONTROLS', {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#ffb74d',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const controls = [
      'Arrow Keys / WASD  -  Move & Jump',
      'UP / W / SPACE  -  Jump (double jump!)',
      'X  -  Fire blaster      Find the KEY to open each door',
      '10 levels - collect stars & gems, dodge pits!'
    ];

    controls.forEach((text, i) => {
      this.add.text(width / 2, 440 + i * 28, text, {
        fontSize: '14px',
        fontFamily: 'monospace',
        color: '#b0bec5'
      }).setOrigin(0.5);
    });

    this.add.text(width / 2, height - 30, 'v1.0 - Made with Phaser 3', {
      fontSize: '12px',
      fontFamily: 'monospace',
      color: '#546e7a'
    }).setOrigin(0.5);
  }

  createStarfield() {
    for (let i = 0; i < 120; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);
      const size = Phaser.Math.FloatBetween(0.3, 1.2);
      const s = this.add.image(x, y, 'bgStar').setScale(size).setAlpha(Phaser.Math.FloatBetween(0.2, 0.8));
      this.tweens.add({
        targets: s,
        alpha: Phaser.Math.FloatBetween(0.1, 0.3),
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1
      });
    }
  }
}
