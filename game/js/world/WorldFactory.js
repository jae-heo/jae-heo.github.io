export class WorldFactory {
  constructor(state) {
    this.state = state;
  }

  drawBackground(scene, width, height) {
    const graphics = scene.add.graphics();
    const isDark = this.state.theme === 'dark';

    graphics.fillStyle(isDark ? 0x0b1220 : 0xe2e8f0, 1);
    graphics.fillRect(0, 0, width, height);

    graphics.fillStyle(isDark ? 0x132033 : 0xcbd5e1, 1);
    for (let x = 0; x < width; x += 160) graphics.fillRect(x, 0, 2, height);
    for (let y = 0; y < height; y += 160) graphics.fillRect(0, y, width, 2);

    graphics.fillStyle(isDark ? 0x102038 : 0xdbeafe, 1);
    for (let i = 0; i < 18; i++) {
      graphics.fillCircle(Phaser.Math.Between(0, width), Phaser.Math.Between(0, height), Phaser.Math.Between(26, 72));
    }
  }

  createWalls(scene) {
    const walls = scene.physics.add.staticGroup();
    const wallColor = this.state.theme === 'dark' ? 0x334155 : 0x64748b;
    const rectangles = [
      [300, 240, 420, 40],
      [980, 310, 48, 420],
      [1420, 180, 360, 44],
      [460, 920, 520, 40],
      [1230, 1180, 40, 300],
      [1710, 930, 320, 48],
      [760, 1370, 400, 42]
    ];

    rectangles.forEach(([x, y, width, height]) => {
      const wall = scene.add.rectangle(x, y, width, height, wallColor).setOrigin(0.5);
      scene.physics.add.existing(wall, true);
      walls.add(wall);
    });

    return walls;
  }

  createCrystals(scene) {
    const crystals = scene.physics.add.staticGroup();
    const positions = [
      [190, 260],
      [620, 620],
      [1560, 280],
      [1860, 760],
      [420, 1320],
      [1740, 1330]
    ];

    positions.forEach(([x, y]) => {
      const crystal = scene.add.star(x, y, 6, 12, 24, this.state.theme === 'dark' ? 0x67e8f9 : 0x0284c7);
      scene.physics.add.existing(crystal, true);
      crystals.add(crystal);
    });

    return crystals;
  }

  createPlayer(scene) {
    const player = scene.add.circle(120, 120, 30, this.state.theme === 'dark' ? 0x34d399 : 0x059669);
    scene.physics.add.existing(player);
    player.body.setCircle(30);
    player.body.setCollideWorldBounds(true);
    player.body.setDrag(900, 900);
    return player;
  }

  createTargetMarker(scene) {
    const marker = scene.add.circle(-100, -100, 12, this.state.theme === 'dark' ? 0xfbbf24 : 0xea580c, 0.9);
    marker.setStrokeStyle(3, this.state.theme === 'dark' ? 0xfef08a : 0xffedd5, 0.8);
    return marker;
  }

  createEnemies(scene) {
    const enemies = scene.physics.add.group();
    const positions = [
      [520, 280],
      [1150, 760],
      [1580, 520],
      [1320, 1320]
    ];

    positions.forEach(([x, y]) => {
      const enemy = scene.add.circle(x, y, 26, this.state.theme === 'dark' ? 0xfb7185 : 0xdc2626);
      scene.physics.add.existing(enemy);
      enemy.body.setCircle(26);
      enemy.body.setCollideWorldBounds(true);
      enemy.body.setBounce(1, 1);
      enemy.body.setMaxVelocity(180, 180);
      enemy.body.setVelocity(
        Phaser.Math.Between(-140, 140) || 100,
        Phaser.Math.Between(-140, 140) || -100
      );
      enemy.setData('wanderTimer', Phaser.Math.Between(800, 1800));
      enemies.add(enemy);
    });

    return enemies;
  }

  createProjectile(scene, x, y) {
    const stone = scene.add.circle(x, y, 9, this.state.theme === 'dark' ? 0xe5e7eb : 0x475569);
    scene.physics.add.existing(stone);
    stone.body.setCircle(9);
    stone.body.setAllowGravity(false);
    return stone;
  }
}
