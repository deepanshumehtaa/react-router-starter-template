# Stellar Escape - Build & Play Instructions

## Quick Start (No Install Required)

The game uses Phaser 3 via CDN — no build step needed. Just serve the files with any HTTP server.

### Option 1: npx (Node.js required)

```bash
npx serve . -p 8080
```

Open http://localhost:8080 in your browser.

### Option 2: Python

```bash
python -m http.server 8080
```

Open http://localhost:8080 in your browser.

### Option 3: VS Code Live Server

1. Open the `sample` folder in VS Code
2. Install the "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"

### Option 4: Live Server via npm

```bash
npm install
npm run dev
```

---

## Controls

| Key | Action |
|-----|--------|
| Arrow Left / A | Move left |
| Arrow Right / D | Move right |
| Arrow Up / W / Space | Jump |
| Arrow Up / W / Space (in air) | Double jump |
| X | Fire blaster |

---

## Game Overview

**Stellar Escape** is a 10-level space platformer. You play as a cute alien explorer navigating through increasingly dangerous worlds to escape a hostile sector of space.

### Levels

| # | Name | Theme | Highlights |
|---|------|-------|---------------|
| 1 | **Training Grounds** | Basic platforms | Movement, jumping, basic enemies, trampolines |
| 2 | **Frost Caverns** | Ice & cold | Ice platforms (slippery!), UFOs, moving platforms, spikes |
| 3 | **Volcanic Core** | Lava & fire | Lava pits, shooter enemies, crumbling platforms |
| 4 | **Sky Fortress** | Floating fortress | Breakable ice bricks, lots of enemies, complex platforming |
| 5 | **The Dark Citadel** | Mid-boss | First boss fight (spits fire!), all mechanics combined |
| 6 | **Toxic Swamp** | Green wilds | Green/purple enemy swarms, toxic pits |
| 7 | **Crystal Mines** | Ice maze | Breakable ice bricks everywhere — keep moving! |
| 8 | **Magma Depths** | Lava gauntlet | Lava under every gap, shooters, rock crumblers |
| 9 | **Void Gauntlet** | Deep space | Moving-platform crossings, UFO swarms |
| 10 | **Overlord's Throne** | Final boss | Tougher fire boss, 2 keys, everything at once |

### Mechanics

- **Stars** — Collect for 50 points each. Try to get them all!
- **Gems** — Worth 200 points AND restore 25 health
- **Keys** — Every level hides at least one key; grab it to unlock the exit door (final level needs 2).
- **Blaster** — Press X to fire forward. Shots consume ammo and damage enemies or the boss.
- **Ammo Packs** — Restore blaster ammo.
- **Shield Powerups** — Temporarily block damage.
- **Speed Powerups** — Temporarily increase movement speed.
- **Rapid Fire Powerups** — Temporarily reduce blaster cooldown.
- **Checkpoints** — Green flags that save your respawn position. Turn yellow when activated.
- **Trampolines** — Bounce on them for a super-high jump
- **Moving Platforms** — Ride them to reach new areas
- **Crumbling Platforms** — Brown rock ledges that break when stepped on, regenerating after 3 seconds.
- **Breakable Ice Bricks** (blue) — Start cracking the instant you land; they shatter and rebuild after 3 seconds. Don't linger!
- **Pits** — Gaps in the floor are deadly. Fall in and you drop into the dark and lose a life — jump across or use platforms.
- **Exit Door** — Reach it to complete the level. Collect all required keys first!
- **Sound Effects** — Short generated sound effects play for movement, pickups, damage, combat, and level transitions. Browser audio starts after the first user interaction.

### Enemies

- **Walkers** (green & purple blobs) — Patrol back and forth. Jump on them or shoot them to kill!
- **UFOs** (flying saucers) — Drift in patterns through the air. Jump on them or shoot them to kill!
- **Shooters** (orange) — Stand still and fire bullets at you. Takes 2-3 hits to kill.
- **Bosses** (Levels 5 & 10) — Big fire demons with a health bar. They **spit fans of fireballs** — wider and faster once below 50% HP. Mix stomps and blaster shots to bring them down.

### Scoring

- Star: 50 points
- Gem: 200 points + 25 HP heal
- Key: 300 points
- Enemy kill: 100 points
- Boss kill: 1000 points
- Time bonus: Remaining seconds × 10 (at level end)

### Health & Lives

- You start with 3 lives and 100 HP per life
- Taking damage reduces HP (spikes: 25, lava: 50, enemies: 15-25)
- Shield powerups prevent damage while active
- When HP hits 0, you lose a life and respawn at the last checkpoint (or level start)
- Lose all 3 lives = Game Over (retry from current level)

### Ranks (End Screen)

| Score | Rank |
|-------|------|
| 10,000+ | Admiral |
| 7,000+ | Captain |
| 5,000+ | Commander |
| 3,000+ | Lieutenant |
| 1,500+ | Ensign |
| Below | Cadet |

---

## Project Structure

```
sample/
├── index.html              # Entry point
├── package.json            # npm scripts
├── INSTRUCTIONS.md         # This file
└── js/
    ├── main.js             # Phaser game config
    ├── levels/
    │   └── LevelData.js    # All 10 level definitions
    ├── objects/
    │   ├── Player.js       # Player class (movement, health, combat)
    │   └── Enemy.js        # Enemy classes (Walker, Flyer, Shooter, Boss)
    └── scenes/
        ├── BootScene.js    # Generates all textures programmatically
        ├── PreloadScene.js # Loading screen
        ├── MenuScene.js    # Title & controls screen
        ├── GameScene.js    # Main gameplay loop
        ├── UIScene.js      # HUD overlay (hearts, score, health bar, ammo, boosts)
        ├── LevelCompleteScene.js  # Between-level stats
        ├── GameOverScene.js       # Death screen
        └── WinScene.js            # Victory screen
```

## Tips

1. **Double jump is your best friend** — use it to reach high platforms and dodge enemies
2. **Use the blaster to clear danger** — press X before enemies force close contact
3. **Save ammo for shooters and flyers** — ammo packs are limited but appear throughout the levels
4. **Gems heal you** — prioritize collecting purple gems when low on health
5. **Activate checkpoints** — they save your position if you die
6. **Watch for crumbling platforms** — don't linger on the cracked-looking ones
7. **Time bonus matters** — move quickly for a higher score
8. **Boss fight** — stay mobile, mix stomps with blaster shots, and dodge the bullet spread in phase 2
