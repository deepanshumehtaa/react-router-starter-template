const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: document.body,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    GameScene,
    UIScene,
    LevelCompleteScene,
    GameOverScene,
    WinScene
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 900,
    height: 600
  }
};

const game = new Phaser.Game(config);
