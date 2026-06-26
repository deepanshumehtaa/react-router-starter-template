class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelCompleteScene');
  }

  init(data) {
    this.level = data.level;
    this.score = data.score;
    this.lives = data.lives;
    this.starsCollected = data.starsCollected || 0;
    this.totalStars = data.totalStars || 0;
    this.timeBonus = data.timeBonus || 0;
    this.timeTaken = data.timeTaken || 0;
    this.totalTime = data.totalTime || 0;
    this.ammo = data.ammo || 0; // bullets carried over from the level just finished
  }

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.cameras.main.setBackgroundColor('#1a237e');
    this.createStarfield();

    this.add.text(width / 2, 80, 'LEVEL ' + this.level + ' COMPLETE!', {
      fontSize: '36px',
      fontFamily: 'monospace',
      color: '#4caf50',
      fontStyle: 'bold',
      stroke: '#1b5e20',
      strokeThickness: 3
    }).setOrigin(0.5);

    const stats = [
      { label: 'Time Taken', value: this.formatTime(this.timeTaken) },
      { label: 'Stars Collected', value: this.starsCollected + ' / ' + this.totalStars },
      { label: 'Time Bonus', value: '+' + this.timeBonus },
      { label: 'Total Score', value: this.score.toString() },
      { label: 'Lives Remaining', value: this.lives.toString() }
    ];

    stats.forEach((stat, i) => {
      this.add.text(width / 2 - 140, 170 + i * 44, stat.label, {
        fontSize: '18px',
        fontFamily: 'monospace',
        color: '#b0bec5'
      });
      this.add.text(width / 2 + 140, 170 + i * 44, stat.value, {
        fontSize: '18px',
        fontFamily: 'monospace',
        color: '#ffd54f',
        fontStyle: 'bold'
      }).setOrigin(1, 0);
    });

    const levelNames = ['', 'Training Grounds', 'Frost Caverns', 'Volcanic Core', 'Sky Fortress',
      'The Dark Citadel', 'Toxic Swamp', 'Crystal Mines', 'Magma Depths', 'Void Gauntlet', "Overlord's Throne"];
    const nextLevel = this.level + 1;

    if (nextLevel <= 10) {
      this.add.text(width / 2, 420, 'Next: ' + levelNames[nextLevel], {
        fontSize: '16px',
        fontFamily: 'monospace',
        color: '#90a4ae'
      }).setOrigin(0.5);

      const nextBtn = this.add.text(width / 2, 480, '[ NEXT LEVEL ]', {
        fontSize: '24px',
        fontFamily: 'monospace',
        color: '#4caf50',
        fontStyle: 'bold'
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      nextBtn.on('pointerover', () => nextBtn.setColor('#66bb6a').setScale(1.1));
      nextBtn.on('pointerout', () => nextBtn.setColor('#4caf50').setScale(1));
      nextBtn.on('pointerdown', () => {
        this.scene.start('GameScene', { level: nextLevel, score: this.score, lives: this.lives, totalTime: this.totalTime, ammo: this.ammo });
      });

      this.tweens.add({ targets: nextBtn, alpha: 0.5, duration: 600, yoyo: true, repeat: -1 });
    }

    const menuBtn = this.add.text(width / 2, 540, '[ MENU ]', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#78909c'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    menuBtn.on('pointerover', () => menuBtn.setColor('#b0bec5'));
    menuBtn.on('pointerout', () => menuBtn.setColor('#78909c'));
    menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
  }

  createStarfield() {
    for (let i = 0; i < 80; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);
      this.add.image(x, y, 'bgStar')
        .setScale(Phaser.Math.FloatBetween(0.3, 1))
        .setAlpha(Phaser.Math.FloatBetween(0.2, 0.7));
    }
  }
}
