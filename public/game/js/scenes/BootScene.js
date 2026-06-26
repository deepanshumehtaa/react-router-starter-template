class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.createTextures();
    this.scene.start('PreloadScene');
  }

  createTextures() {
    // All game art is generated here at boot with the Graphics API and baked into
    // reusable textures via generateTexture(key, w, h) — there are NO image asset
    // files. Each block draws a sprite, registers it under a string key (e.g.
    // 'player', 'lava'), then destroys the throwaway Graphics object. Other scenes
    // reference these keys when creating sprites.

    // ---- Player: cute green alien - 32x48 ----
    const player = this.add.graphics();
    // antenna
    player.lineStyle(3, 0x2e7d32, 1);
    player.beginPath();
    player.moveTo(16, 9);
    player.lineTo(16, 3);
    player.strokePath();
    player.fillStyle(0x69f0ae, 1);
    player.fillCircle(16, 2, 3);
    // body
    player.fillStyle(0x43a047, 1);
    player.fillRoundedRect(4, 9, 24, 33, 10);
    // belly highlight
    player.fillStyle(0x66bb6a, 1);
    player.fillRoundedRect(8, 15, 16, 18, 8);
    // eyes
    player.fillStyle(0xffffff, 1);
    player.fillCircle(12, 21, 5);
    player.fillCircle(22, 21, 5);
    player.fillStyle(0x1b5e20, 1);
    player.fillCircle(13, 22, 2.4);
    player.fillCircle(21, 22, 2.4);
    player.fillStyle(0xffffff, 1);
    player.fillCircle(12, 20, 1.1);
    player.fillCircle(20, 20, 1.1);
    // smile
    player.fillStyle(0x1b5e20, 1);
    player.fillRoundedRect(13, 31, 6, 2, 1);
    // feet
    player.fillStyle(0x2e7d32, 1);
    player.fillRoundedRect(7, 42, 7, 5, 2);
    player.fillRoundedRect(18, 42, 7, 5, 2);
    player.generateTexture('player', 32, 48);
    player.destroy();

    // ---- Ground tile - 32x32 ----
    const ground = this.add.graphics();
    ground.fillStyle(0x5d4037, 1);
    ground.fillRect(0, 0, 32, 32);
    ground.fillStyle(0x6d4c41, 1);
    ground.fillRect(1, 1, 30, 30);
    ground.fillStyle(0x4e342e, 1);
    ground.fillRect(0, 0, 32, 4);
    ground.fillStyle(0x3e2723, 1);
    ground.lineStyle(1, 0x3e2723, 0.3);
    ground.strokeRect(8, 10, 16, 10);
    ground.generateTexture('ground', 32, 32);
    ground.destroy();

    // ---- Platform - 32x32 ----
    const platform = this.add.graphics();
    platform.fillStyle(0x37474f, 1);
    platform.fillRect(0, 0, 32, 32);
    platform.fillStyle(0x455a64, 1);
    platform.fillRect(1, 1, 30, 30);
    platform.fillStyle(0x546e7a, 1);
    platform.fillRect(2, 2, 28, 6);
    platform.generateTexture('platform', 32, 32);
    platform.destroy();

    // ---- Ice platform - 32x32 ----
    const ice = this.add.graphics();
    ice.fillStyle(0x4dd0e1, 1);
    ice.fillRect(0, 0, 32, 32);
    ice.fillStyle(0x80deea, 1);
    ice.fillRect(1, 1, 30, 30);
    ice.fillStyle(0xb2ebf2, 1);
    ice.fillRect(4, 4, 8, 3);
    ice.fillRect(20, 12, 6, 3);
    ice.generateTexture('ice', 32, 32);
    ice.destroy();

    // ---- Ice-crumble brick (breakable blue) - 32x16 ----
    const iceCrumble = this.add.graphics();
    iceCrumble.fillStyle(0x29b6f6, 1);
    iceCrumble.fillRect(0, 0, 32, 16);
    iceCrumble.fillStyle(0x4fc3f7, 1);
    iceCrumble.fillRect(1, 1, 30, 14);
    iceCrumble.fillStyle(0xb3e5fc, 1);
    iceCrumble.fillRect(2, 2, 28, 4);
    iceCrumble.lineStyle(1, 0x0277bd, 0.9);
    iceCrumble.beginPath();
    iceCrumble.moveTo(9, 2);
    iceCrumble.lineTo(13, 14);
    iceCrumble.strokePath();
    iceCrumble.beginPath();
    iceCrumble.moveTo(22, 2);
    iceCrumble.lineTo(18, 14);
    iceCrumble.strokePath();
    iceCrumble.beginPath();
    iceCrumble.moveTo(26, 3);
    iceCrumble.lineTo(29, 13);
    iceCrumble.strokePath();
    iceCrumble.generateTexture('iceCrumble', 32, 16);
    iceCrumble.destroy();

    // ---- Lava tile - 32x32 ----
    const lava = this.add.graphics();
    lava.fillStyle(0xff5722, 1);
    lava.fillRect(0, 0, 32, 32);
    lava.fillStyle(0xff9800, 1);
    lava.fillRect(4, 2, 8, 12);
    lava.fillRect(18, 8, 10, 14);
    lava.fillStyle(0xffeb3b, 1);
    lava.fillRect(6, 4, 4, 6);
    lava.fillRect(20, 12, 6, 6);
    lava.generateTexture('lava', 32, 32);
    lava.destroy();

    // ---- Spike - 32x32 ----
    const spike = this.add.graphics();
    spike.fillStyle(0xbdbdbd, 1);
    spike.beginPath();
    spike.moveTo(0, 32);
    spike.lineTo(16, 0);
    spike.lineTo(32, 32);
    spike.closePath();
    spike.fillPath();
    spike.fillStyle(0xe0e0e0, 1);
    spike.beginPath();
    spike.moveTo(4, 32);
    spike.lineTo(16, 4);
    spike.lineTo(18, 32);
    spike.closePath();
    spike.fillPath();
    spike.generateTexture('spike', 32, 32);
    spike.destroy();

    // ---- Star collectible - 24x24 ----
    const star = this.add.graphics();
    star.fillStyle(0xffd54f, 1);
    star.beginPath();
    const cx = 12, cy = 12, spikes = 5, outerR = 11, innerR = 5;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (Math.PI / 2 * 3) + (i * Math.PI / spikes);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) star.moveTo(x, y);
      else star.lineTo(x, y);
    }
    star.closePath();
    star.fillPath();
    star.generateTexture('star', 24, 24);
    star.destroy();

    // ---- Health pickup: red heart - 24x24 (keyed 'gem' for compatibility) ----
    const gem = this.add.graphics();
    gem.fillStyle(0xef5350, 1); // red
    gem.beginPath();
    gem.moveTo(12, 22);                       // bottom point
    gem.arc(7, 8, 6, Math.PI, 0, false);      // left lobe
    gem.arc(17, 8, 6, Math.PI, 0, false);     // right lobe
    gem.lineTo(12, 22);
    gem.closePath();
    gem.fillPath();
    gem.fillStyle(0xff8a80, 1);               // highlight
    gem.fillCircle(5, 5, 2);
    gem.generateTexture('gem', 24, 24);
    gem.destroy();

    // ---- Heart (health) - 20x20 ----
    const heart = this.add.graphics();
    heart.fillStyle(0xef5350, 1);
    heart.beginPath();
    heart.moveTo(10, 18);
    heart.arc(5, 6, 5, Math.PI, 0, false);
    heart.arc(15, 6, 5, Math.PI, 0, false);
    heart.lineTo(10, 18);
    heart.closePath();
    heart.fillPath();
    heart.generateTexture('heart', 20, 20);
    heart.destroy();

    // ---- Walker enemy (GREEN) - 32x32 ----
    this.drawWalker('enemy', 0x7cb342, 0x558b2f, 0x33691e, 0x1b5e20);
    // ---- Walker enemy (PURPLE) - 32x32 ----
    this.drawWalker('enemyPurple', 0xab47bc, 0x6a1b9a, 0x4a148c, 0x38006b);

    // ---- Flying enemy: UFO - 40x26 ----
    const ufo = this.add.graphics();
    // saucer underbelly
    ufo.fillStyle(0x607d8b, 1);
    ufo.fillEllipse(20, 17, 40, 13);
    // saucer top rim
    ufo.fillStyle(0xcfd8dc, 1);
    ufo.fillEllipse(20, 15, 38, 9);
    // dome glass
    ufo.fillStyle(0x69f0ae, 0.95);
    ufo.fillEllipse(20, 10, 18, 13);
    ufo.fillStyle(0xffffff, 0.6);
    ufo.fillEllipse(16, 8, 6, 4);
    // lights
    ufo.fillStyle(0xffeb3b, 1);
    ufo.fillCircle(8, 18, 2);
    ufo.fillCircle(20, 19, 2);
    ufo.fillCircle(32, 18, 2);
    ufo.generateTexture('flyer', 40, 26);
    ufo.destroy();

    // ---- Shooter enemy - 32x36 ----
    const shooter = this.add.graphics();
    shooter.fillStyle(0xff7043, 1);
    shooter.fillRoundedRect(0, 4, 32, 32, 4);
    shooter.fillStyle(0xbf360c, 1);
    shooter.fillRect(12, 0, 8, 8);
    shooter.fillStyle(0xffccbc, 1);
    shooter.fillCircle(10, 16, 3);
    shooter.fillCircle(22, 16, 3);
    shooter.generateTexture('shooter', 32, 36);
    shooter.destroy();

    // ---- Enemy bullet - 8x8 ----
    const bullet = this.add.graphics();
    bullet.fillStyle(0xff1744, 1);
    bullet.fillCircle(4, 4, 4);
    bullet.fillStyle(0xff8a80, 1);
    bullet.fillCircle(3, 3, 2);
    bullet.generateTexture('bullet', 8, 8);
    bullet.destroy();

    // ---- Fireball (boss projectile) - 14x14 ----
    const fireball = this.add.graphics();
    fireball.fillStyle(0xd84315, 1);
    fireball.fillCircle(7, 7, 7);
    fireball.fillStyle(0xff6d00, 1);
    fireball.fillCircle(7, 7, 5);
    fireball.fillStyle(0xffca28, 1);
    fireball.fillCircle(7, 8, 3);
    fireball.fillStyle(0xfff59d, 1);
    fireball.fillCircle(7, 9, 1.5);
    fireball.generateTexture('fireball', 14, 14);
    fireball.destroy();

    // ---- Player blaster bolt - 16x6 ----
    const playerBullet = this.add.graphics();
    playerBullet.fillStyle(0x4fc3f7, 1);
    playerBullet.fillRoundedRect(0, 0, 16, 6, 3);
    playerBullet.fillStyle(0xe1f5fe, 1);
    playerBullet.fillRoundedRect(3, 1, 10, 2, 1);
    playerBullet.generateTexture('playerBullet', 16, 6);
    playerBullet.destroy();

    // ---- Shield powerup - 28x28 ----
    const shieldPower = this.add.graphics();
    shieldPower.fillStyle(0x00e5ff, 1);
    shieldPower.fillCircle(14, 14, 14);
    shieldPower.fillStyle(0x0a1628, 1);
    shieldPower.fillCircle(14, 14, 10);
    shieldPower.fillStyle(0x80deea, 1);
    shieldPower.beginPath();
    shieldPower.moveTo(14, 4);
    shieldPower.lineTo(23, 9);
    shieldPower.lineTo(20, 21);
    shieldPower.lineTo(14, 26);
    shieldPower.lineTo(8, 21);
    shieldPower.lineTo(5, 9);
    shieldPower.closePath();
    shieldPower.fillPath();
    shieldPower.generateTexture('powerupShield', 28, 28);
    shieldPower.destroy();

    // ---- Speed powerup - 28x28 ----
    const speedPower = this.add.graphics();
    speedPower.fillStyle(0x76ff03, 1);
    speedPower.fillCircle(14, 14, 14);
    speedPower.fillStyle(0x1b5e20, 1);
    speedPower.beginPath();
    speedPower.moveTo(15, 3);
    speedPower.lineTo(7, 16);
    speedPower.lineTo(14, 16);
    speedPower.lineTo(11, 25);
    speedPower.lineTo(22, 11);
    speedPower.lineTo(15, 11);
    speedPower.closePath();
    speedPower.fillPath();
    speedPower.generateTexture('powerupSpeed', 28, 28);
    speedPower.destroy();

    // ---- Rapid-fire powerup - 28x28 ----
    const rapidPower = this.add.graphics();
    rapidPower.fillStyle(0xff9100, 1);
    rapidPower.fillCircle(14, 14, 14);
    rapidPower.fillStyle(0xfff3e0, 1);
    rapidPower.fillRect(7, 8, 14, 4);
    rapidPower.fillRect(7, 13, 14, 4);
    rapidPower.fillRect(7, 18, 14, 4);
    rapidPower.generateTexture('powerupRapid', 28, 28);
    rapidPower.destroy();

    // ---- Ammo powerup - 28x28 ----
    const ammoPower = this.add.graphics();
    ammoPower.fillStyle(0xffeb3b, 1);
    ammoPower.fillRoundedRect(2, 5, 24, 18, 4);
    ammoPower.fillStyle(0x795548, 1);
    ammoPower.fillRect(6, 9, 4, 10);
    ammoPower.fillRect(12, 9, 4, 10);
    ammoPower.fillRect(18, 9, 4, 10);
    ammoPower.generateTexture('powerupAmmo', 28, 28);
    ammoPower.destroy();

    // ---- Door/exit - 32x48 ----
    const door = this.add.graphics();
    door.fillStyle(0xffd600, 1);
    door.fillRoundedRect(0, 0, 32, 48, { tl: 16, tr: 16, bl: 0, br: 0 });
    door.fillStyle(0xffff00, 1);
    door.fillRoundedRect(4, 4, 24, 40, { tl: 12, tr: 12, bl: 0, br: 0 });
    door.fillStyle(0xffd600, 1);
    door.fillCircle(20, 28, 3);
    door.generateTexture('door', 32, 48);
    door.destroy();

    // ---- Moving platform - 64x16 ----
    const movPlat = this.add.graphics();
    movPlat.fillStyle(0x00897b, 1);
    movPlat.fillRoundedRect(0, 0, 64, 16, 4);
    movPlat.fillStyle(0x26a69a, 1);
    movPlat.fillRoundedRect(2, 2, 60, 6, 2);
    movPlat.generateTexture('movingPlatform', 64, 16);
    movPlat.destroy();

    // ---- Key collectible - 20x24 ----
    const key = this.add.graphics();
    key.fillStyle(0xffc107, 1);
    key.fillCircle(10, 6, 6);
    key.fillStyle(0x000000, 0);
    key.lineStyle(2, 0xffc107, 1);
    key.strokeCircle(10, 6, 3);
    key.fillStyle(0xffc107, 1);
    key.fillRect(8, 12, 4, 12);
    key.fillRect(8, 18, 8, 3);
    key.fillRect(8, 22, 6, 3);
    key.generateTexture('key', 20, 24);
    key.destroy();

    // ---- Checkpoint flag - 24x48 ----
    const flag = this.add.graphics();
    flag.fillStyle(0x9e9e9e, 1);
    flag.fillRect(2, 0, 4, 48);
    flag.fillStyle(0x4caf50, 1);
    flag.beginPath();
    flag.moveTo(6, 2);
    flag.lineTo(24, 10);
    flag.lineTo(6, 20);
    flag.closePath();
    flag.fillPath();
    flag.generateTexture('checkpoint', 24, 48);
    flag.destroy();

    // ---- Active checkpoint ----
    const flagActive = this.add.graphics();
    flagActive.fillStyle(0x9e9e9e, 1);
    flagActive.fillRect(2, 0, 4, 48);
    flagActive.fillStyle(0xffeb3b, 1);
    flagActive.beginPath();
    flagActive.moveTo(6, 2);
    flagActive.lineTo(24, 10);
    flagActive.lineTo(6, 20);
    flagActive.closePath();
    flagActive.fillPath();
    flagActive.generateTexture('checkpointActive', 24, 48);
    flagActive.destroy();

    // ---- Background star particle - 4x4 ----
    const bgStar = this.add.graphics();
    bgStar.fillStyle(0xffffff, 1);
    bgStar.fillCircle(2, 2, 2);
    bgStar.generateTexture('bgStar', 4, 4);
    bgStar.destroy();

    // ---- Trampoline - 48x16 ----
    const tramp = this.add.graphics();
    tramp.fillStyle(0x00bcd4, 1);
    tramp.fillRoundedRect(0, 4, 48, 12, 4);
    tramp.fillStyle(0x00e5ff, 1);
    tramp.fillRoundedRect(4, 4, 40, 6, 2);
    tramp.generateTexture('trampoline', 48, 16);
    tramp.destroy();

    // ---- Boss: fire demon - 64x64 ----
    const boss = this.add.graphics();
    // horns
    boss.fillStyle(0x212121, 1);
    boss.fillTriangle(8, 14, 0, -2, 20, 12);
    boss.fillTriangle(56, 14, 64, -2, 44, 12);
    // body
    boss.fillStyle(0x4e0000, 1);
    boss.fillRoundedRect(2, 8, 60, 54, 12);
    boss.fillStyle(0x9b1010, 1);
    boss.fillRoundedRect(6, 12, 52, 46, 10);
    // brows
    boss.fillStyle(0x212121, 1);
    boss.fillTriangle(13, 19, 31, 27, 13, 27);
    boss.fillTriangle(51, 19, 33, 27, 51, 27);
    // glowing eyes
    boss.fillStyle(0xffeb3b, 1);
    boss.fillCircle(22, 30, 7);
    boss.fillCircle(42, 30, 7);
    boss.fillStyle(0xff3d00, 1);
    boss.fillCircle(22, 30, 3.5);
    boss.fillCircle(42, 30, 3.5);
    // fanged mouth
    boss.fillStyle(0x1a0000, 1);
    boss.fillRoundedRect(18, 44, 28, 11, 4);
    boss.fillStyle(0xffffff, 1);
    boss.fillTriangle(21, 44, 26, 44, 23.5, 51);
    boss.fillTriangle(30, 44, 35, 44, 32.5, 51);
    boss.fillTriangle(39, 44, 44, 44, 41.5, 51);
    boss.generateTexture('boss', 64, 64);
    boss.destroy();

    // ---- Crumbling platform (rock) - 64x16 ----
    const crumble = this.add.graphics();
    crumble.fillStyle(0x8d6e63, 1);
    crumble.fillRect(0, 0, 64, 16);
    crumble.fillStyle(0xa1887f, 1);
    crumble.fillRect(2, 2, 14, 12);
    crumble.fillRect(18, 2, 14, 12);
    crumble.fillRect(34, 2, 14, 12);
    crumble.fillRect(50, 2, 12, 12);
    crumble.generateTexture('crumble', 64, 16);
    crumble.destroy();
  }

  // Helper: draw a rounded blob walker with angry eyes
  drawWalker(textureKey, bodyColor, baseColor, spikeColor, mouthColor) {
    const e = this.add.graphics();
    // top spikes
    e.fillStyle(spikeColor, 1);
    e.fillTriangle(4, 6, 10, -2, 16, 6);
    e.fillTriangle(16, 6, 22, -2, 28, 6);
    // body
    e.fillStyle(bodyColor, 1);
    e.fillRoundedRect(0, 4, 32, 28, 8);
    // base shadow
    e.fillStyle(baseColor, 1);
    e.fillRect(2, 28, 28, 4);
    // eyes
    e.fillStyle(0xffffff, 1);
    e.fillCircle(10, 15, 5);
    e.fillCircle(22, 15, 5);
    e.fillStyle(0x000000, 1);
    e.fillCircle(11, 16, 2.4);
    e.fillCircle(21, 16, 2.4);
    // angry brows
    e.fillStyle(spikeColor, 1);
    e.fillTriangle(5, 9, 16, 14, 5, 14);
    e.fillTriangle(27, 9, 16, 14, 27, 14);
    // mouth
    e.fillStyle(mouthColor, 1);
    e.fillRect(10, 25, 12, 3);
    e.generateTexture(textureKey, 32, 32);
    e.destroy();
  }
}
