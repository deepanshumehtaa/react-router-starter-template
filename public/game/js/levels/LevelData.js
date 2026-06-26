const LEVELS = {
  1: {
    name: 'Training Grounds',
    bgColor: '#0a1628',
    worldWidth: 2400,
    timeLimit: 120,
    playerStart: { x: 80, y: 450 },
    door: { x: 2300, y: 400 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 20, h: 1, tile: 'ground' },
      { x: 300, y: 460, w: 4, h: 1, tile: 'platform' },
      // { x: 480, y: 380, w: 3, h: 1, tile: 'platform' },
      // { x: 620, y: 320, w: 3, h: 1, tile: 'platform' },
      { x: 700, y: 568, w: 12, h: 1, tile: 'ground' },
      { x: 850, y: 420, w: 4, h: 1, tile: 'platform' },
      { x: 1050, y: 350, w: 3, h: 1, tile: 'platform' },
      { x: 1200, y: 568, w: 16, h: 1, tile: 'ground' },
      { x: 1350, y: 440, w: 5, h: 1, tile: 'platform' },
      { x: 1700, y: 300, w: 4, h: 1, tile: 'platform' },
      { x: 1800, y: 568, w: 20, h: 1, tile: 'ground' },
      { x: 2050, y: 420, w: 4, h: 1, tile: 'platform' }
    ],
    stars: [
      { x: 320, y: 430 },
      { x: 350, y: 430 },
      { x: 500, y: 350 },
      { x: 640, y: 290 },
      { x: 870, y: 390 },
      { x: 900, y: 390 },
      { x: 1070, y: 320 },
      { x: 1370, y: 410 },
      { x: 1400, y: 410 },
      { x: 1570, y: 330 },
      { x: 1720, y: 270 },
      { x: 1750, y: 270 },
      { x: 2070, y: 390 },
      { x: 2220, y: 320 }
    ],
    gems: [
      { x: 640, y: 260 },
      { x: 1720, y: 240 }
    ],
    powerups: [
      { type: 'ammo', x: 520, y: 340, value: 20 },
      { type: 'speed', x: 1450, y: 400, duration: 6000, value: 80 }
    ],
    enemies: [
      { type: 'walker', x: 800, y: 540, speed: 60, range: 80 },
      { type: 'walker', x: 1300, y: 540, speed: 70, range: 100 },
      { type: 'walker', x: 2000, y: 540, speed: 80, range: 120 }
    ],
    checkpoints: [
      { x: 1550, y: 530 }
    ],
    trampolines: [
      { x: 620, y: 554 }
    ],
    movingPlatforms: [],
    spikes: [],
    lava: [],
    crumblingPlatforms: [],
    iceCrumble: [],
    keys: [
      { x: 2110, y: 385 }
    ],
    boss: null
  },

  2: {
    name: 'Frost Caverns',
    bgColor: '#0d1b2a',
    worldWidth: 2800,
    timeLimit: 150,
    playerStart: { x: 80, y: 450 },
    door: { x: 2700, y: 400 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 12, h: 1, tile: 'ground' },
      // { x: 200, y: 440, w: 3, h: 1, tile: 'platform' },
      { x: 400, y: 360, w: 3, h: 1, tile: 'ice' },
      { x: 500, y: 568, w: 8, h: 1, tile: 'ice' },
      { x: 650, y: 420, w: 4, h: 1, tile: 'ice' },
      { x: 850, y: 340, w: 3, h: 1, tile: 'platform' },
      { x: 900, y: 568, w: 10, h: 1, tile: 'ground' },
      { x: 1050, y: 400, w: 3, h: 1, tile: 'ice' },
      { x: 1250, y: 320, w: 4, h: 1, tile: 'platform' },
      { x: 1300, y: 568, w: 6, h: 1, tile: 'ice' },
      // { x: 1500, y: 440, w: 3, h: 1, tile: 'ice' },
      { x: 1650, y: 568, w: 10, h: 1, tile: 'ground' },
      { x: 1750, y: 360, w: 3, h: 1, tile: 'platform' },
      { x: 1950, y: 280, w: 3, h: 1, tile: 'ice' },
      { x: 2100, y: 568, w: 8, h: 1, tile: 'ice' },
      { x: 2200, y: 380, w: 4, h: 1, tile: 'platform' },
      // { x: 2450, y: 320, w: 3, h: 1, tile: 'ice' },
      // { x: 2500, y: 568, w: 10, h: 1, tile: 'ground' },
      { x: 2600, y: 420, w: 4, h: 1, tile: 'platform' }
    ],
    stars: [
      { x: 220, y: 410 },
      { x: 250, y: 410 },
      { x: 420, y: 330 },
      { x: 450, y: 330 },
      { x: 670, y: 390 },
      { x: 700, y: 390 },
      { x: 870, y: 310 },
      { x: 1070, y: 370 },
      { x: 1100, y: 370 },
      { x: 1270, y: 290 },
      { x: 1300, y: 290 },
      { x: 1520, y: 410 },
      { x: 1770, y: 330 },
      { x: 1970, y: 250 },
      { x: 2000, y: 250 },
      { x: 2220, y: 350 },
      { x: 2470, y: 290 },
      { x: 2620, y: 390 }
    ],
    gems: [
      { x: 870, y: 280 },
      { x: 1970, y: 220 },
      { x: 2620, y: 360 }
    ],
    powerups: [
      { type: 'shield', x: 430, y: 320, duration: 6000 },
      { type: 'ammo', x: 1500, y: 1800, value: 25 },
      { type: 'rapid', x: 2350, y: 350, duration: 6000, value: 180 }
    ],
    enemies: [
      { type: 'walker', x: 580, y: 540, speed: 80, range: 80 },
      { type: 'flyer', x: 750, y: 300, speed: 50, rangeX: 80, rangeY: 40 },
      { type: 'walker', x: 1000, y: 540, speed: 90, range: 100 },
      { type: 'walker', x: 1500, y: 540, speed: 80, range: 80 },
      { type: 'flyer', x: 2000, y: 280, speed: 60, rangeX: 100, rangeY: 50 },
      { type: 'walker', x: 2300, y: 540, speed: 100, range: 120 }
    ],
    checkpoints: [
      { x: 900, y: 300 },
    ],
    spikes: [
      { x: 310, y: 536 },
      { x: 350, y: 536 },
      { x: 1150, y: 536 },
      { x: 1182, y: 536 },
      { x: 1850, y: 536 },
      { x: 1882, y: 536 }
    ],
    trampolines: [
      { x: 1550, y: 554 }
    ],
    movingPlatforms: [
      { x: 1100, y: 280, moveX: 120, moveY: 0, speed: 1500 },
      { x: 2350, y: 260, moveX: 0, moveY: 100, speed: 2000 }
    ],
    lava: [],
    crumblingPlatforms: [],
    iceCrumble: [],
    keys: [
      { x: 1200, y: 1400 }
    ],
    boss: null
  },

  3: {
    name: 'Volcanic Core',
    bgColor: '#1a0800',
    worldWidth: 3000,
    timeLimit: 180,
    playerStart: { x: 80, y: 400 },
    door: { x: 2900, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 8, h: 1, tile: 'ground' },
      { x: 150, y: 420, w: 3, h: 1, tile: 'platform' },
      { x: 350, y: 350, w: 3, h: 1, tile: 'platform' },
      { x: 400, y: 568, w: 6, h: 1, tile: 'ground' },
      // { x: 550, y: 400, w: 4, h: 1, tile: 'platform' },
      { x: 750, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 780, y: 320, w: 3, h: 1, tile: 'platform' },
      { x: 950, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 1050, y: 568, w: 8, h: 1, tile: 'ground' },
      { x: 1150, y: 340, w: 4, h: 1, tile: 'platform' },
      // { x: 1400, y: 420, w: 3, h: 1, tile: 'platform' },
      { x: 1500, y: 568, w: 6, h: 1, tile: 'ground' },
      // { x: 1600, y: 340, w: 3, h: 1, tile: 'platform' }, xxx
      // { x: 1800, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 1900, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2000, y: 320, w: 4, h: 1, tile: 'platform' },
      { x: 2150, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 2250, y: 380, w: 3, h: 1, tile: 'platform' },
      { x: 2450, y: 300, w: 3, h: 1, tile: 'platform' },
      { x: 2550, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2650, y: 380, w: 3, h: 1, tile: 'platform' },
      { x: 2800, y: 568, w: 8, h: 1, tile: 'ground' },
      { x: 2850, y: 400, w: 4, h: 1, tile: 'platform' }
    ],
    stars: [
      { x: 170, y: 390 },
      { x: 200, y: 390 },
      { x: 370, y: 320 },
      { x: 570, y: 370 },
      { x: 600, y: 370 },
      { x: 800, y: 290 },
      { x: 970, y: 370 },
      { x: 1170, y: 310 },
      { x: 1200, y: 310 },
      { x: 1420, y: 390 },
      { x: 1620, y: 310 },
      { x: 1820, y: 370 },
      { x: 2020, y: 290 },
      { x: 2050, y: 290 },
      { x: 2270, y: 350 },
      { x: 2470, y: 270 },
      { x: 2670, y: 350 }
    ],
    gems: [
      { x: 800, y: 260 },
      { x: 1620, y: 280 },
      { x: 2470, y: 240 }
    ],
    powerups: [
      { type: 'ammo', x: 570, y: 360, value: 30 },
      { type: 'shield', x: 1420, y: 180, duration: 7000 },
      { type: 'rapid', x: 2020, y: 250, duration: 6500, value: 200 }
    ],
    enemies: [
      { type: 'walker', x: 450, y: 540, speed: 90, range: 80 },
      { type: 'shooter', x: 700, y: 536, fireRate: 2500, bulletSpeed: 180, hp: 2 },
      { type: 'flyer', x: 900, y: 320, speed: 60, rangeX: 80, rangeY: 40 },
      { type: 'walker', x: 1200, y: 540, speed: 100, range: 100 },
      { type: 'shooter', x: 1550, y: 536, fireRate: 2000, bulletSpeed: 200, hp: 2 },
      { type: 'flyer', x: 1700, y: 300, speed: 70, rangeX: 100, rangeY: 50 },
      { type: 'walker', x: 2200, y: 540, speed: 110, range: 100 },
      { type: 'walker', x: 2600, y: 540, speed: 100, range: 80 }
    ],
    checkpoints: [
      { x: 1050, y: 520 },
      { x: 2150, y: 520 }
    ],
    spikes: [
      { x: 300, y: 536 },
      { x: 332, y: 536 },
      { x: 364, y: 536 },
      { x: 1350, y: 536 },
      { x: 1382, y: 536 },
      { x: 2400, y: 536 },
      { x: 2432, y: 536 }
    ],
    lava: [
      { x: 256, y: 568, w: 5 },
      { x: 592, y: 568, w: 5 },
      { x: 878, y: 568, w: 6 },
      { x: 1306, y: 568, w: 7 },
      { x: 2028, y: 568, w: 4 },
      { x: 2342, y: 568, w: 7 }
    ],
    trampolines: [
      { x: 950, y: 554 },
      { x: 2350, y: 554 }
    ],
    movingPlatforms: [
      // { x: 650, y: 450, moveX: 0, moveY: 120, speed: 2000 },
      { x: 1350, y: 300, moveX: 100, moveY: 0, speed: 1800 },
      // { x: 2100, y: 250, moveX: 80, moveY: 80, speed: 2500 }
    ],
    crumblingPlatforms: [
      { x: 550, y: 400 },
      { x: 1800, y: 400 }
    ],
    iceCrumble: [],
    keys: [
      { x: 2310, y: 345 }
    ],
    boss: null
  },

  4: {
    name: 'Sky Fortress',
    bgColor: '#0a0a2e',
    worldWidth: 3200,
    timeLimit: 180,
    playerStart: { x: 80, y: 450 },
    door: { x: 3100, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 100, y: 440, w: 3, h: 1, tile: 'platform' },
      { x: 500, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 860, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 900, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 1400, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1650, y: 280, w: 2, h: 1, tile: 'platform' },
      { x: 1700, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 2200, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2500, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 2900, y: 568, w: 10, h: 1, tile: 'ground' },
      { x: 3000, y: 420, w: 4, h: 1, tile: 'platform' }
    ],
    stars: [
      { x: 120, y: 410 },
      { x: 300, y: 330 },
      { x: 420, y: 250 },
      { x: 450, y: 250 },
      { x: 600, y: 350 },
      { x: 740, y: 270 },
      { x: 880, y: 370 },
      { x: 1020, y: 290 },
      { x: 1050, y: 290 },
      { x: 1200, y: 370 },
      { x: 1340, y: 270 },
      { x: 1520, y: 350 },
      { x: 1670, y: 250 },
      { x: 1870, y: 330 },
      { x: 2070, y: 250 },
      { x: 2100, y: 250 },
      { x: 2270, y: 350 },
      { x: 2420, y: 270 },
      { x: 2620, y: 350 },
      { x: 2820, y: 270 }
    ],
    gems: [
      { x: 420, y: 220 },
      { x: 1340, y: 240 },
      { x: 2070, y: 220 },
      { x: 2820, y: 240 }
    ],
    powerups: [
      { type: 'speed', x: 740, y: 260, duration: 6500, value: 90 },
      { type: 'ammo', x: 1520, y: 340, value: 35 },
      { type: 'shield', x: 2270, y: 330, duration: 7000 },
      { type: 'rapid', x: 2820, y: 240, duration: 7000, value: 220 }
    ],
    enemies: [
      { type: 'walker', x: 550, y: 540, speed: 100, range: 60 },
      { type: 'flyer', x: 650, y: 280, speed: 70, rangeX: 100, rangeY: 60 },
      { type: 'shooter', x: 950, y: 536, fireRate: 2000, bulletSpeed: 220, hp: 2 },
      { type: 'walker', x: 1150, y: 540, speed: 110, range: 80 },
      { type: 'flyer', x: 1400, y: 250, speed: 80, rangeX: 120, rangeY: 50 },
      { type: 'shooter', x: 1750, y: 536, fireRate: 1800, bulletSpeed: 230, hp: 3 },
      { type: 'flyer', x: 2000, y: 260, speed: 70, rangeX: 80, rangeY: 60 },
      { type: 'walker', x: 2300, y: 540, speed: 120, range: 80 },
      { type: 'shooter', x: 2550, y: 536, fireRate: 1500, bulletSpeed: 240, hp: 3 },
      { type: 'walker', x: 2950, y: 540, speed: 100, range: 100 }
    ],
    checkpoints: [
      { x: 950, y: 520 },
      { x: 1750, y: 520 },
      { x: 2550, y: 520 }
    ],
    spikes: [
      { x: 200, y: 536 },
      { x: 232, y: 536 },
      { x: 680, y: 536 },
      { x: 712, y: 536 },
      { x: 744, y: 536 },
      { x: 1250, y: 536 },
      { x: 1282, y: 536 },
      { x: 2050, y: 536 },
      { x: 2082, y: 536 }
    ],
    lava: [],
    trampolines: [
      { x: 350, y: 554 },
      { x: 1600, y: 554 },
      { x: 2700, y: 554 }
    ],
    movingPlatforms: [
      { x: 350, y: 450, moveX: 120, moveY: 0, speed: 1500 },
      { x: 750, y: 380, moveX: 0, moveY: 120, speed: 2000 },
      { x: 1150, y: 280, moveX: 100, moveY: 60, speed: 2500 },
      { x: 1900, y: 300, moveX: 120, moveY: 0, speed: 1800 },
      { x: 2700, y: 350, moveX: 0, moveY: 120, speed: 2000 }
    ],
    crumblingPlatforms: [
      { x: 600, y: 460 },
      { x: 1300, y: 440 },
      { x: 2100, y: 440 }
    ],
    iceCrumble: [
      { x: 280, y: 360, w: 2 },
      { x: 400, y: 280, w: 3 },
      { x: 580, y: 380, w: 3 },
      { x: 720, y: 300, w: 2 },
      { x: 1000, y: 320, w: 3 },
      { x: 1180, y: 400, w: 2 },
      { x: 1320, y: 300, w: 3 },
      { x: 1500, y: 380, w: 3 },
      { x: 1850, y: 360, w: 3 },
      { x: 2050, y: 280, w: 3 },
      { x: 2250, y: 380, w: 2 },
      { x: 2400, y: 300, w: 3 },
      { x: 2800, y: 300, w: 3 }
    ],
    keys: [
      { x: 1670, y: 220 }
    ],
    boss: null
  },

  5: {
    name: 'The Dark Citadel',
    bgColor: '#0d0000',
    worldWidth: 3600,
    timeLimit: 240,
    playerStart: { x: 80, y: 450 },
    door: { x: 3500, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 100, y: 440, w: 3, h: 1, tile: 'platform' },
      { x: 250, y: 350, w: 2, h: 1, tile: 'ice' },
      { x: 350, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 550, y: 300, w: 2, h: 1, tile: 'ice' },
      { x: 650, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 700, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 1050, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1200, y: 300, w: 3, h: 1, tile: 'ice' },
      { x: 1350, y: 568, w: 6, h: 1, tile: 'ground' },
      // { x: 1600, y: 280, w: 2, h: 1, tile: 'platform' },
      { x: 1800, y: 380, w: 3, h: 1, tile: 'ice' },
      { x: 1800, y: 568, w: 4, h: 1, tile: 'ground' },
      // { x: 2000, y: 300, w: 3, h: 1, tile: 'platform' },
      { x: 2100, y: 568, w: 6, h: 1, tile: 'ground' },
      // { x: 2400, y: 320, w: 3, h: 1, tile: 'ice' },
      { x: 2600, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2900, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 3200, y: 280, w: 3, h: 1, tile: 'platform' },
      { x: 3300, y: 568, w: 10, h: 1, tile: 'ground' },
      { x: 3400, y: 420, w: 4, h: 1, tile: 'platform' }
    ],
    stars: [
      { x: 120, y: 410 },
      { x: 270, y: 320 },
      { x: 420, y: 390 },
      { x: 570, y: 270 },
      { x: 720, y: 370 },
      { x: 900, y: 290 },
      { x: 1070, y: 370 },
      { x: 1220, y: 270 },
      { x: 1250, y: 270 },
      { x: 1420, y: 350 },
      { x: 1620, y: 250 },
      { x: 1820, y: 350 },
      { x: 2020, y: 270 },
      { x: 2050, y: 270 },
      { x: 2220, y: 370 },
      { x: 2420, y: 290 },
      { x: 2620, y: 370 },
      { x: 2820, y: 270 },
      { x: 3020, y: 350 },
      { x: 3220, y: 250 }
    ],
    gems: [
      { x: 570, y: 240 },
      { x: 1220, y: 240 },
      { x: 2020, y: 240 },
      { x: 2820, y: 240 },
      { x: 3220, y: 220 }
    ],
    powerups: [
      { type: 'ammo', x: 720, y: 360, value: 40 },
      { type: 'shield', x: 1420, y: 340, duration: 7500 },
      { type: 'rapid', x: 2420, y: 250, duration: 7500, value: 230 },
      { type: 'ammo', x: 3020, y: 320, value: 40 },
      { type: 'speed', x: 3220, y: 220, duration: 6500, value: 90 }
    ],
    enemies: [
      { type: 'walker', x: 400, y: 540, speed: 110, range: 60 },
      { type: 'flyer', x: 500, y: 280, speed: 80, rangeX: 100, rangeY: 50 },
      { type: 'shooter', x: 800, y: 536, fireRate: 1800, bulletSpeed: 230, hp: 3 },
      { type: 'walker', x: 1100, y: 540, speed: 120, range: 80 },
      { type: 'flyer', x: 1300, y: 260, speed: 80, rangeX: 120, rangeY: 60 },
      { type: 'shooter', x: 1500, y: 536, fireRate: 1500, bulletSpeed: 250, hp: 3 },
      { type: 'walker', x: 1850, y: 540, speed: 120, range: 80 },
      { type: 'flyer', x: 2100, y: 250, speed: 90, rangeX: 100, rangeY: 60 },
      { type: 'shooter', x: 2350, y: 536, fireRate: 1500, bulletSpeed: 250, hp: 3 },
      { type: 'walker', x: 2650, y: 540, speed: 130, range: 80 },
      { type: 'flyer', x: 2900, y: 260, speed: 90, rangeX: 100, rangeY: 70 }
    ],
    checkpoints: [
      { x: 2200, y: 540 },
    ],
    spikes: [
      { x: 200, y: 536 },
      { x: 232, y: 536 },
      { x: 600, y: 536 },
      { x: 632, y: 536 },
      { x: 664, y: 536 },
      { x: 1070, y: 536 },
      { x: 1102, y: 536 },
      { x: 1600, y: 536 },
      { x: 1632, y: 536 },
      { x: 1664, y: 536 },
      { x: 2400, y: 536 },
      { x: 2432, y: 536 }
    ],
    lava: [
      { x: 192, y: 568, w: 5 },
      { x: 478, y: 568, w: 6 },
      { x: 842, y: 568, w: 7 },
      { x: 1542, y: 568, w: 9 },
      { x: 2292, y: 568, w: 10 }
    ],
    trampolines: [
      { x: 300, y: 554 },
      { x: 1250, y: 460},
      { x: 2800, y: 554 }
    ],
    movingPlatforms: [
      { x: 300, y: 400, moveX: 100, moveY: 0, speed: 1500 },
      { x: 1000, y: 350, moveX: 0, moveY: 100, speed: 1800 },
      { x: 1700, y: 300, moveX: 120, moveY: 60, speed: 2000 },
      { x: 2500, y: 280, moveX: 80, moveY: 80, speed: 2000 },
      { x: 3100, y: 340, moveX: 100, moveY: 0, speed: 1500 }
    ],
    crumblingPlatforms: [
      { x: 450, y: 480 },
      // { x: 1250, y: 460 },
      { x: 1950, y: 440 },
      // { x: 2700, y: 460 }
    ],
    iceCrumble: [
      { x: 400, y: 420, w: 3 },
      { x: 880, y: 320, w: 2 },
      { x: 1050, y: 400, w: 3 },
      { x: 1400, y: 380, w: 3 },
      { x: 2200, y: 400, w: 2 },
      { x: 2600, y: 400, w: 3 },
      // { x: 2800, y: 300, w: 2 },
      { x: 3000, y: 380, w: 3 }
    ],
    keys: [
      { x: 1620, y: 220 },
      { x: 3220, y: 220 }
    ],
    boss: { x: 3350, y: 504, hp: 5, speed: 80, range: 150, fireRate: 1500 }
  },

  6: {
    name: 'Toxic Swamp',
    bgColor: '#0a1f0a',
    worldWidth: 3200,
    timeLimit: 180,
    playerStart: { x: 80, y: 450 },
    door: { x: 3100, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 7, h: 1, tile: 'ground' },
      { x: 250, y: 440, w: 3, h: 1, tile: 'platform' },
      { x: 370, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 520, y: 370, w: 2, h: 1, tile: 'platform' },
      { x: 660, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 760, y: 420, w: 3, h: 1, tile: 'platform' },
      { x: 980, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 1050, y: 360, w: 3, h: 1, tile: 'platform' },
      { x: 1300, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 1360, y: 420, w: 3, h: 1, tile: 'platform' },
      { x: 1620, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1660, y: 360, w: 2, h: 1, tile: 'platform' },
      { x: 1900, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 1960, y: 420, w: 3, h: 1, tile: 'platform' },
      { x: 2220, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 2280, y: 360, w: 3, h: 1, tile: 'platform' },
      { x: 2540, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2600, y: 400, w: 2, h: 1, tile: 'platform' },
      { x: 2820, y: 568, w: 12, h: 1, tile: 'ground' },
      { x: 2900, y: 360, w: 3, h: 1, tile: 'platform' }
    ],
    stars: [
      { x: 280, y: 410 },
      { x: 310, y: 410 },
      { x: 540, y: 340 },
      { x: 700, y: 520 },
      { x: 790, y: 390 },
      { x: 1080, y: 330 },
      { x: 1110, y: 330 },
      { x: 1390, y: 390 },
      { x: 1690, y: 330 },
      { x: 1910, y: 520 },
      { x: 1990, y: 390 },
      { x: 2020, y: 390 },
      { x: 2310, y: 330 },
      { x: 2620, y: 370 },
      { x: 2930, y: 330 },
      { x: 2960, y: 330 }
    ],
    gems: [
      { x: 1080, y: 300 },
      { x: 2310, y: 300 },
      { x: 2930, y: 300 }
    ],
    powerups: [
      { type: 'ammo', x: 540, y: 335, value: 30 },
      { type: 'shield', x: 1380, y: 385, duration: 7000 },
      { type: 'speed', x: 2620, y: 360, duration: 6500, value: 90 }
    ],
    enemies: [
      { type: 'walker', x: 420, y: 540, speed: 90, range: 80, color: 'green' },
      { type: 'walker', x: 760, y: 540, speed: 100, range: 90, color: 'purple' },
      { type: 'flyer', x: 1000, y: 320, speed: 70, rangeX: 100, rangeY: 50, color: 'green' },
      { type: 'walker', x: 1300, y: 540, speed: 100, range: 90, color: 'green' },
      { type: 'shooter', x: 1620, y: 536, fireRate: 2000, bulletSpeed: 210, hp: 2 },
      { type: 'walker', x: 1960, y: 540, speed: 110, range: 90, color: 'purple' },
      { type: 'flyer', x: 2280, y: 320, speed: 80, rangeX: 110, rangeY: 50, color: 'purple' },
      { type: 'walker', x: 2650, y: 540, speed: 110, range: 80, color: 'green' }
    ],
    checkpoints: [
      { x: 980, y: 520 },
      { x: 1900, y: 520 }
    ],
    spikes: [
      { x: 680, y: 536 },
      { x: 712, y: 536 },
      { x: 1320, y: 536 },
      { x: 2540, y: 536 }
    ],
    lava: [
      { x: 224, y: 568, w: 5 },
      { x: 1140, y: 568, w: 5 },
      { x: 2060, y: 568, w: 5 }
    ],
    trampolines: [
      { x: 430, y: 554 },
      { x: 2120, y: 554 }
    ],
    movingPlatforms: [
      { x: 1480, y: 330, moveX: 120, moveY: 0, speed: 1700 },
      { x: 2750, y: 320, moveX: 0, moveY: 110, speed: 2000 }
    ],
    crumblingPlatforms: [],
    iceCrumble: [
      { x: 1660, y: 430, w: 3 },
      { x: 2450, y: 400, w: 3 }
    ],
    keys: [
      { x: 1655, y: 330 }
    ],
    boss: null
  },

  7: {
    name: 'Crystal Mines',
    bgColor: '#0a1a2e',
    worldWidth: 3300,
    timeLimit: 200,
    playerStart: { x: 80, y: 450 },
    door: { x: 3200, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 200, y: 440, w: 3, h: 1, tile: 'ice' },
      { x: 340, y: 568, w: 4, h: 1, tile: 'ice' },
      { x: 640, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 960, y: 568, w: 4, h: 1, tile: 'ice' },
      { x: 1260, y: 360, w: 3, h: 1, tile: 'ice' },
      { x: 1260, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 1580, y: 568, w: 4, h: 1, tile: 'ice' },
      { x: 1880, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 2200, y: 568, w: 4, h: 1, tile: 'ice' },
      { x: 2500, y: 360, w: 3, h: 1, tile: 'ice' },
      { x: 2500, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 2820, y: 568, w: 4, h: 1, tile: 'ice' },
      { x: 3100, y: 420, w: 3, h: 1, tile: 'platform' },
      { x: 3100, y: 568, w: 7, h: 1, tile: 'ground' }
    ],
    stars: [
      { x: 230, y: 410 },
      { x: 450, y: 400 },
      { x: 480, y: 400 },
      { x: 700, y: 520 },
      { x: 730, y: 330 },
      { x: 1010, y: 390 },
      { x: 1290, y: 330 },
      { x: 1350, y: 270 },
      { x: 1630, y: 350 },
      { x: 1880, y: 520 },
      { x: 1930, y: 290 },
      { x: 1960, y: 290 },
      { x: 2230, y: 370 },
      { x: 2500, y: 520 },
      { x: 2590, y: 270 },
      { x: 2880, y: 350 },
      { x: 3130, y: 390 }
    ],
    gems: [
      { x: 730, y: 300 },
      { x: 1930, y: 260 },
      { x: 2590, y: 240 }
    ],
    powerups: [
      { type: 'ammo', x: 230, y: 405, value: 30 },
      { type: 'rapid', x: 1290, y: 325, duration: 7000, value: 200 },
      { type: 'shield', x: 2530, y: 330, duration: 7000 }
    ],
    enemies: [
      { type: 'walker', x: 380, y: 540, speed: 100, range: 60, color: 'purple' },
      { type: 'flyer', x: 700, y: 320, speed: 80, rangeX: 100, rangeY: 50, color: 'green' },
      { type: 'walker', x: 1280, y: 540, speed: 110, range: 80, color: 'green' },
      { type: 'shooter', x: 1600, y: 536, fireRate: 1900, bulletSpeed: 220, hp: 2 },
      { type: 'flyer', x: 1900, y: 300, speed: 90, rangeX: 110, rangeY: 60, color: 'purple' },
      { type: 'walker', x: 2520, y: 540, speed: 110, range: 70, color: 'purple' },
      { type: 'flyer', x: 2850, y: 320, speed: 90, rangeX: 100, rangeY: 50, color: 'green' }
    ],
    checkpoints: [
      { x: 1260, y: 520 },
      { x: 2500, y: 520 }
    ],
    spikes: [
      { x: 660, y: 536 },
      { x: 1280, y: 536 },
      { x: 1900, y: 536 },
      { x: 2520, y: 536 }
    ],
    lava: [],
    trampolines: [
      { x: 480, y: 554 },
      { x: 2640, y: 554 }
    ],
    movingPlatforms: [
      { x: 1080, y: 340, moveX: 120, moveY: 0, speed: 1700 },
      { x: 2040, y: 320, moveX: 0, moveY: 110, speed: 1900 }
    ],
    crumblingPlatforms: [],
    iceCrumble: [
      { x: 420, y: 430, w: 3 },
      { x: 700, y: 360, w: 3 },
      { x: 980, y: 420, w: 3 },
      { x: 1320, y: 300, w: 3 },
      { x: 1600, y: 380, w: 3 },
      { x: 1900, y: 320, w: 3 },
      { x: 2200, y: 400, w: 3 },
      { x: 2560, y: 300, w: 3 },
      { x: 2850, y: 380, w: 3 }
    ],
    keys: [
      { x: 1290, y: 328 }
    ],
    boss: null
  },

  8: {
    name: 'Magma Depths',
    bgColor: '#1a0500',
    worldWidth: 3400,
    timeLimit: 210,
    playerStart: { x: 80, y: 450 },
    door: { x: 3300, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 250, y: 440, w: 3, h: 1, tile: 'platform' },
      { x: 360, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 560, y: 380, w: 2, h: 1, tile: 'platform' },
      { x: 680, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 900, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 1000, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 1200, y: 340, w: 3, h: 1, tile: 'platform' },
      { x: 1380, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1560, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 1700, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1900, y: 340, w: 2, h: 1, tile: 'platform' },
      { x: 2020, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 2240, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 2400, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2600, y: 340, w: 3, h: 1, tile: 'platform' },
      { x: 2720, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2950, y: 400, w: 3, h: 1, tile: 'platform' },
      { x: 3040, y: 568, w: 8, h: 1, tile: 'ground' }
    ],
    stars: [
      { x: 280, y: 410 },
      { x: 580, y: 350 },
      { x: 700, y: 520 },
      { x: 920, y: 370 },
      { x: 1010, y: 520 },
      { x: 1220, y: 310 },
      { x: 1250, y: 310 },
      { x: 1580, y: 370 },
      { x: 1720, y: 520 },
      { x: 1910, y: 310 },
      { x: 2260, y: 370 },
      { x: 2420, y: 520 },
      { x: 2620, y: 310 },
      { x: 2650, y: 310 },
      { x: 2970, y: 370 },
      { x: 3000, y: 370 }
    ],
    gems: [
      { x: 580, y: 320 },
      { x: 1910, y: 280 },
      { x: 2620, y: 280 }
    ],
    powerups: [
      { type: 'ammo', x: 280, y: 405, value: 35 },
      { type: 'shield', x: 1220, y: 305, duration: 7500 },
      { type: 'rapid', x: 2620, y: 305, duration: 7000, value: 210 }
    ],
    enemies: [
      { type: 'walker', x: 380, y: 540, speed: 100, range: 50, color: 'green' },
      { type: 'shooter', x: 700, y: 536, fireRate: 1900, bulletSpeed: 220, hp: 2 },
      { type: 'walker', x: 1020, y: 540, speed: 110, range: 70, color: 'purple' },
      { type: 'flyer', x: 1380, y: 300, speed: 80, rangeX: 100, rangeY: 50, color: 'green' },
      { type: 'shooter', x: 1720, y: 536, fireRate: 1700, bulletSpeed: 230, hp: 3 },
      { type: 'walker', x: 2040, y: 540, speed: 120, range: 70, color: 'green' },
      { type: 'shooter', x: 2420, y: 536, fireRate: 1600, bulletSpeed: 240, hp: 3 },
      { type: 'walker', x: 2740, y: 540, speed: 120, range: 60, color: 'purple' }
    ],
    checkpoints: [
      { x: 1000, y: 520 },
      { x: 2020, y: 520 }
    ],
    spikes: [
      { x: 1040, y: 536 },
      { x: 1072, y: 536 },
      { x: 2060, y: 536 },
      { x: 2092, y: 536 }
    ],
    lava: [
      { x: 160, y: 568, w: 7 },
      { x: 488, y: 568, w: 6 },
      { x: 808, y: 568, w: 6 },
      { x: 1160, y: 568, w: 7 },
      { x: 1508, y: 568, w: 6 },
      { x: 1828, y: 568, w: 6 },
      { x: 2180, y: 568, w: 7 },
      { x: 2528, y: 568, w: 6 },
      { x: 2848, y: 568, w: 6 }
    ],
    trampolines: [
      { x: 1420, y: 554 },
      { x: 2740, y: 554 }
    ],
    movingPlatforms: [
      { x: 1160, y: 420, moveX: 0, moveY: 120, speed: 2000 },
      { x: 2180, y: 300, moveX: 120, moveY: 0, speed: 1800 }
    ],
    crumblingPlatforms: [
      { x: 700, y: 460 },
      { x: 1700, y: 440 },
      { x: 2450, y: 460 }
    ],
    iceCrumble: [
      { x: 1380, y: 300, w: 3 }
    ],
    keys: [
      { x: 1880, y: 310 }
    ],
    boss: null
  },

  9: {
    name: 'Void Gauntlet',
    bgColor: '#05050f',
    worldWidth: 3500,
    timeLimit: 220,
    playerStart: { x: 80, y: 450 },
    door: { x: 3400, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 250, y: 430, w: 2, h: 1, tile: 'platform' },
      { x: 360, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 700, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 900, y: 380, w: 2, h: 1, tile: 'platform' },
      { x: 1040, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1400, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1560, y: 360, w: 2, h: 1, tile: 'platform' },
      { x: 1760, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2120, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2280, y: 380, w: 2, h: 1, tile: 'platform' },
      { x: 2480, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2840, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 3000, y: 360, w: 3, h: 1, tile: 'platform' },
      { x: 3200, y: 568, w: 8, h: 1, tile: 'ground' }
    ],
    stars: [
      { x: 270, y: 400 },
      { x: 300, y: 400 },
      { x: 580, y: 370 },
      { x: 610, y: 370 },
      { x: 700, y: 520 },
      { x: 920, y: 350 },
      { x: 1260, y: 330 },
      { x: 1290, y: 330 },
      { x: 1400, y: 520 },
      { x: 1580, y: 330 },
      { x: 1980, y: 310 },
      { x: 2010, y: 310 },
      { x: 2120, y: 520 },
      { x: 2300, y: 350 },
      { x: 2660, y: 330 },
      { x: 3020, y: 330 }
    ],
    gems: [
      { x: 580, y: 340 },
      { x: 1980, y: 280 },
      { x: 2660, y: 300 }
    ],
    powerups: [
      { type: 'shield', x: 270, y: 400, duration: 7500 },
      { type: 'ammo', x: 1260, y: 330, value: 35 },
      { type: 'speed', x: 2300, y: 350, duration: 6500, value: 100 }
    ],
    enemies: [
      { type: 'flyer', x: 430, y: 300, speed: 90, rangeX: 120, rangeY: 60, color: 'purple' },
      { type: 'walker', x: 720, y: 540, speed: 120, range: 60, color: 'green' },
      { type: 'flyer', x: 1100, y: 300, speed: 100, rangeX: 120, rangeY: 60, color: 'green' },
      { type: 'shooter', x: 1420, y: 536, fireRate: 1700, bulletSpeed: 240, hp: 3 },
      { type: 'flyer', x: 1760, y: 300, speed: 100, rangeX: 130, rangeY: 60, color: 'purple' },
      { type: 'walker', x: 2140, y: 540, speed: 130, range: 60, color: 'purple' },
      { type: 'flyer', x: 2480, y: 300, speed: 100, rangeX: 120, rangeY: 70, color: 'green' },
      { type: 'shooter', x: 2860, y: 536, fireRate: 1600, bulletSpeed: 250, hp: 3 }
    ],
    checkpoints: [
      { x: 1040, y: 520 },
      { x: 2120, y: 520 },
      { x: 2840, y: 520 }
    ],
    spikes: [
      { x: 720, y: 536 },
      { x: 1420, y: 536 },
      { x: 2140, y: 536 },
      { x: 2860, y: 536 }
    ],
    lava: [],
    trampolines: [
      { x: 380, y: 554 },
      { x: 2500, y: 554 }
    ],
    movingPlatforms: [
      { x: 430, y: 470, moveX: 140, moveY: 0, speed: 1600 },
      { x: 1100, y: 420, moveX: 0, moveY: 130, speed: 1900 },
      { x: 1700, y: 380, moveX: 140, moveY: 0, speed: 1700 },
      { x: 2380, y: 360, moveX: 0, moveY: 140, speed: 2000 },
      { x: 3080, y: 420, moveX: 120, moveY: 0, speed: 1600 }
    ],
    crumblingPlatforms: [],
    iceCrumble: [
      { x: 560, y: 400, w: 3 },
      { x: 1240, y: 360, w: 3 },
      { x: 1960, y: 340, w: 3 },
      { x: 2640, y: 360, w: 3 }
    ],
    keys: [
      { x: 1555, y: 330 }
    ],
    boss: null
  },

  10: {
    name: 'Overlord\'s Throne',
    bgColor: '#0a0010',
    worldWidth: 3800,
    timeLimit: 260,
    playerStart: { x: 80, y: 450 },
    door: { x: 3700, y: 368 },
    groundTile: 'ground',
    platforms: [
      { x: 0, y: 568, w: 6, h: 1, tile: 'ground' },
      { x: 250, y: 440, w: 3, h: 1, tile: 'platform' },
      { x: 380, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 560, y: 360, w: 2, h: 1, tile: 'ice' },
      { x: 700, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1020, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 1240, y: 340, w: 3, h: 1, tile: 'platform' },
      { x: 1400, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1720, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 1900, y: 340, w: 2, h: 1, tile: 'platform' },
      { x: 2040, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 2420, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 2600, y: 340, w: 3, h: 1, tile: 'platform' },
      { x: 2740, y: 568, w: 4, h: 1, tile: 'ground' },
      { x: 3060, y: 568, w: 5, h: 1, tile: 'ground' },
      { x: 3260, y: 420, w: 3, h: 1, tile: 'platform' },
      { x: 3400, y: 568, w: 12, h: 1, tile: 'ground' }
    ],
    stars: [
      { x: 280, y: 410 },
      { x: 580, y: 330 },
      { x: 700, y: 520 },
      { x: 910, y: 370 },
      { x: 1020, y: 520 },
      { x: 1260, y: 310 },
      { x: 1290, y: 310 },
      { x: 1400, y: 520 },
      { x: 1580, y: 350 },
      { x: 1920, y: 310 },
      { x: 2040, y: 520 },
      { x: 2280, y: 350 },
      { x: 2620, y: 310 },
      { x: 2650, y: 310 },
      { x: 2740, y: 520 },
      { x: 2960, y: 330 },
      { x: 3000, y: 330 },
      { x: 3060, y: 520 }
    ],
    gems: [
      { x: 580, y: 300 },
      { x: 1920, y: 280 },
      { x: 2620, y: 280 },
      { x: 3000, y: 300 }
    ],
    powerups: [
      { type: 'ammo', x: 280, y: 405, value: 40 },
      { type: 'shield', x: 1260, y: 305, duration: 8000 },
      { type: 'rapid', x: 2280, y: 345, duration: 8000, value: 230 },
      { type: 'ammo', x: 2960, y: 325, value: 40 },
      { type: 'speed', x: 3060, y: 515, duration: 7000, value: 100 }
    ],
    enemies: [
      { type: 'walker', x: 400, y: 540, speed: 120, range: 60, color: 'green' },
      { type: 'flyer', x: 560, y: 300, speed: 90, rangeX: 110, rangeY: 60, color: 'purple' },
      { type: 'shooter', x: 720, y: 536, fireRate: 1700, bulletSpeed: 240, hp: 3 },
      { type: 'walker', x: 1040, y: 540, speed: 130, range: 70, color: 'purple' },
      { type: 'flyer', x: 1400, y: 300, speed: 100, rangeX: 120, rangeY: 60, color: 'green' },
      { type: 'shooter', x: 1740, y: 536, fireRate: 1500, bulletSpeed: 250, hp: 3 },
      { type: 'walker', x: 2060, y: 540, speed: 130, range: 70, color: 'green' },
      { type: 'flyer', x: 2440, y: 300, speed: 100, rangeX: 120, rangeY: 70, color: 'purple' },
      { type: 'shooter', x: 2760, y: 536, fireRate: 1500, bulletSpeed: 250, hp: 3 },
      { type: 'walker', x: 3080, y: 540, speed: 130, range: 60, color: 'purple' }
    ],
    checkpoints: [
      { x: 1020, y: 520 },
      { x: 2040, y: 520 },
      { x: 3060, y: 520 }
    ],
    spikes: [
      { x: 720, y: 536 },
      { x: 752, y: 536 },
      { x: 1740, y: 536 },
      { x: 1772, y: 536 },
      { x: 2760, y: 536 }
    ],
    lava: [
      { x: 192, y: 568, w: 6 },
      { x: 828, y: 568, w: 6 },
      { x: 1528, y: 568, w: 6 },
      { x: 2200, y: 568, w: 7 },
      { x: 2868, y: 568, w: 6 }
    ],
    trampolines: [
      { x: 1420, y: 554 },
      { x: 2440, y: 554 }
    ],
    movingPlatforms: [
      { x: 1180, y: 420, moveX: 0, moveY: 120, speed: 2000 },
      { x: 1860, y: 300, moveX: 120, moveY: 0, speed: 1800 },
      { x: 2960, y: 300, moveX: 0, moveY: 120, speed: 2000 }
    ],
    crumblingPlatforms: [],
    iceCrumble: [
      { x: 880, y: 400, w: 3 },
      { x: 1560, y: 380, w: 3 },
      { x: 2260, y: 380, w: 3 },
      { x: 2940, y: 360, w: 3 }
    ],
    keys: [
      { x: 1580, y: 350 },
      { x: 2620, y: 300 }
    ],
    boss: { x: 3600, y: 500, hp: 5, speed: 90, range: 160, fireRate: 1400 }
  }
};
