class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.text(width / 2, height / 2 - 40, 'STELLAR ESCAPE', {
      fontSize: '32px',
      fontFamily: 'monospace',
      color: '#4fc3f7',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const loadText = this.add.text(width / 2, height / 2 + 20, 'Loading...', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: loadText,
      alpha: 0.2,
      duration: 500,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.scene.start('MenuScene');
      }
    });
  }
}
