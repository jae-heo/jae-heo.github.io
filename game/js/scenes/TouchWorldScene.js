import {
  ATTACK_COOLDOWN_MS,
  ARRIVAL_RADIUS,
  CRYSTAL_COUNT,
  ENEMY_DODGE_CHANCE,
  ENEMY_DODGE_DISTANCE,
  ENEMY_DODGE_SPEED,
  MELEE_RANGE,
  PLAYER_SPEED,
  STONE_RANGE,
  STONE_SPEED,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  getCameraZoom
} from '../config.js';
import { WorldFactory } from '../world/WorldFactory.js';

export class TouchWorldScene extends Phaser.Scene {
  constructor({ state, overlay, t }) {
    super('TouchWorldScene');
    this.state = state;
    this.overlay = overlay;
    this.t = t;
    this.player = null;
    this.targetMarker = null;
    this.crystals = null;
    this.enemies = null;
    this.projectiles = null;
    this.walls = null;
    this.worldFactory = new WorldFactory(state);
    this.lastSafePosition = { x: 120, y: 120 };
  }

  syncViewport(gameSize = this.scale.gameSize) {
    const width = gameSize?.width || this.scale.width;
    const height = gameSize?.height || this.scale.height;
    this.cameras.main.setSize(width, height);
    this.cameras.main.setZoom(getCameraZoom(width, height));
  }

  clearTarget(statusKey = 'idle', hintKey = null) {
    this.state.target = null;
    if (this.player?.body) {
      this.player.body.setVelocity(0, 0);
      this.player.body.reset(this.lastSafePosition.x, this.lastSafePosition.y);
    }
    if (this.targetMarker) this.targetMarker.setPosition(-100, -100);
    this.overlay.setStatus(statusKey);
    if (hintKey) this.overlay.setHint(this.t(hintKey));
  }

  isBlockedPoint(x, y) {
    return this.walls.getChildren().some(wall => Phaser.Geom.Rectangle.Contains(wall.getBounds(), x, y));
  }

  getEnemyAtPoint(x, y) {
    return this.enemies?.getChildren().find(enemy => {
      const dx = x - enemy.x;
      const dy = y - enemy.y;
      return (dx * dx) + (dy * dy) <= 36 * 36;
    }) || null;
  }

  hasLineOfSightTo(target) {
    const line = new Phaser.Geom.Line(this.player.x, this.player.y, target.x, target.y);
    return !this.walls.getChildren().some(wall => Phaser.Geom.Intersects.LineToRectangle(line, wall.getBounds()));
  }

  canOccupyPoint(x, y, radius = 26) {
    if (x < radius || x > WORLD_WIDTH - radius || y < radius || y > WORLD_HEIGHT - radius) {
      return false;
    }
    return !this.walls.getChildren().some(wall => {
      const bounds = wall.getBounds();
      return Phaser.Geom.Rectangle.Contains(bounds, x, y) ||
        Phaser.Geom.Intersects.CircleToRectangle(new Phaser.Geom.Circle(x, y, radius), bounds);
    });
  }

  defeatEnemy(enemy, hintKey) {
    enemy.destroy();
    this.overlay.setStatus('attacking');
    this.overlay.setHint(this.t(hintKey));
    this.overlay.render();
  }

  consumeAttackCooldown() {
    this.state.startAttackCooldown(this.time.now, ATTACK_COOLDOWN_MS);
  }

  launchStone(enemy) {
    const stone = this.worldFactory.createProjectile(this, this.player.x, this.player.y);
    stone.setData('expired', false);
    this.projectiles.add(stone);
    this.physics.moveToObject(stone, enemy, STONE_SPEED);

    this.time.delayedCall(1400, () => {
      if (stone.active) {
        stone.setData('expired', true);
        stone.destroy();
        this.overlay.setHint(this.t('stoneMiss'));
        this.overlay.render();
      }
    });
  }

  launchStoneForward() {
    const direction = new Phaser.Math.Vector2(this.state.facing.x, this.state.facing.y);
    if (direction.lengthSq() === 0) {
      direction.set(1, 0);
    } else {
      direction.normalize();
    }

    const spawnX = this.player.x + direction.x * 38;
    const spawnY = this.player.y + direction.y * 38;
    const stone = this.worldFactory.createProjectile(this, spawnX, spawnY);
    stone.setData('expired', false);
    this.projectiles.add(stone);
    stone.body.setVelocity(direction.x * STONE_SPEED, direction.y * STONE_SPEED);
    this.overlay.setStatus('attacking');
    this.overlay.setHint(this.t('stoneThrow'));

    this.time.delayedCall(900, () => {
      if (stone.active) {
        stone.setData('expired', true);
        stone.destroy();
      }
    });
  }

  tryDodge(enemy) {
    if (Math.random() > ENEMY_DODGE_CHANCE) return false;

    const away = new Phaser.Math.Vector2(enemy.x - this.player.x, enemy.y - this.player.y).normalize();
    const perpendicular = new Phaser.Math.Vector2(-away.y, away.x);
    const candidates = [
      new Phaser.Math.Vector2(enemy.x, enemy.y).add(perpendicular.clone().scale(ENEMY_DODGE_DISTANCE)),
      new Phaser.Math.Vector2(enemy.x, enemy.y).add(perpendicular.clone().negate().scale(ENEMY_DODGE_DISTANCE))
    ];

    const next = candidates.find(point => this.canOccupyPoint(point.x, point.y));
    if (!next) return false;

    enemy.setData('dodgeTarget', { x: next.x, y: next.y });
    enemy.setData('wanderTimer', Phaser.Math.Between(700, 1400));
    this.physics.moveTo(enemy, next.x, next.y, ENEMY_DODGE_SPEED);
    this.overlay.setHint(this.t('enemyDodged'));
    return true;
  }

  tryAttackEnemy(enemy) {
    if (this.state.isComplete || this.state.isDead) return true;
    if (!this.state.canAttack(this.time.now)) {
      this.overlay.setHint(this.t('attackCoolingDown'));
      this.overlay.render();
      return true;
    }

    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
    if (distance <= MELEE_RANGE) {
      this.consumeAttackCooldown();
      this.clearTarget('attacking');
      this.defeatEnemy(enemy, 'meleeHit');
      return true;
    }

    if (distance <= STONE_RANGE) {
      if (!this.hasLineOfSightTo(enemy)) {
        this.clearTarget('blocked', 'attackBlocked');
        this.overlay.render();
        return true;
      }

      this.consumeAttackCooldown();
      this.clearTarget('attacking');
      this.overlay.setHint(this.t('stoneThrow'));
      this.tryDodge(enemy);
      this.launchStone(enemy);
      this.overlay.render();
      return true;
    }

    this.clearTarget('idle', 'tooFar');
    this.overlay.render();
    return true;
  }

  create() {
    this.state.scene = this;
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBackgroundColor(this.state.theme === 'dark' ? '#08111f' : '#dbeafe');
    this.syncViewport();

    this.worldFactory.drawBackground(this, WORLD_WIDTH, WORLD_HEIGHT);
    this.walls = this.worldFactory.createWalls(this);
    this.crystals = this.worldFactory.createCrystals(this);
    this.enemies = this.worldFactory.createEnemies(this);
    this.projectiles = this.physics.add.group();
    this.player = this.worldFactory.createPlayer(this);
    this.player.body.setMaxVelocity(PLAYER_SPEED, PLAYER_SPEED);
    this.lastSafePosition = { x: this.player.x, y: this.player.y };
    this.targetMarker = this.worldFactory.createTargetMarker(this);

    this.bindCollisions();
    this.bindPointer();

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.roundPixels = true;
    this.scale.on('resize', gameSize => this.syncViewport(gameSize));

    this.overlay.setHint(this.t('dragHint'));
    this.overlay.render();
  }

  bindCollisions() {
    this.physics.add.collider(this.player, this.walls, () => {
      this.clearTarget('blocked', 'collision');
    });

    this.physics.add.collider(this.enemies, this.walls);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.projectiles, this.walls, projectile => {
      if (!projectile.active) return;
      projectile.setData('expired', true);
      projectile.destroy();
      this.overlay.setHint(this.t('attackBlocked'));
      this.overlay.render();
    });
    this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
      if (!projectile.active || !enemy.active) return;
      projectile.setData('expired', true);
      projectile.destroy();
      this.defeatEnemy(enemy, 'stoneHit');
    });

    this.physics.add.overlap(this.player, this.crystals, (_, crystal) => {
      crystal.destroy();
      this.state.crystalsCollected += 1;
      this.overlay.setHint(this.t('crystalPicked', {
        count: this.state.crystalsCollected,
        total: CRYSTAL_COUNT
      }));

      if (this.state.crystalsCollected === CRYSTAL_COUNT) {
        this.state.isComplete = true;
        this.clearTarget('finished', 'allCrystals');
      }

      this.overlay.render();
    });

    this.physics.add.overlap(this.player, this.enemies, () => {
      if (this.state.isComplete || this.state.isDead) return;
      this.state.isDead = true;
      this.clearTarget('dead', 'enemyTouch');
      this.overlay.render();
    });
  }

  bindPointer() {
    const setDestination = (pointer, { allowAttack }) => {
      const nextTarget = {
        x: Phaser.Math.Clamp(pointer.worldX, 24, WORLD_WIDTH - 24),
        y: Phaser.Math.Clamp(pointer.worldY, 24, WORLD_HEIGHT - 24)
      };

      const enemy = allowAttack ? this.getEnemyAtPoint(nextTarget.x, nextTarget.y) : null;
      if (enemy) {
        this.tryAttackEnemy(enemy);
        return;
      }
    };

    this.input.on('pointerdown', pointer => {
      setDestination(pointer, { allowAttack: true });
    });
    this.input.on('pointermove', pointer => {
      if (pointer.isDown) {
        setDestination(pointer, { allowAttack: false });
      }
    });
  }

  update() {
    if (!this.player?.body) return;

    const body = this.player.body;
    if (body.velocity.lengthSq() > 0 && body.touching.none && body.wasTouching.none) {
      this.lastSafePosition = { x: this.player.x, y: this.player.y };
    }

    this.updateEnemies();

    if (this.state.isComplete || this.state.isDead) {
      body.setVelocity(0, 0);
      this.overlay.render();
      return;
    }

    if (this.state.attackQueued) {
      this.state.attackQueued = false;
      if (this.state.canAttack(this.time.now)) {
        this.consumeAttackCooldown();
        this.launchStoneForward();
      } else {
        this.overlay.setHint(this.t('attackCoolingDown'));
      }
    }

    if (this.state.moveInput.active) {
      this.state.facing = { x: this.state.moveInput.x, y: this.state.moveInput.y };
      body.setVelocity(this.state.moveInput.x * PLAYER_SPEED, this.state.moveInput.y * PLAYER_SPEED);
      this.overlay.setStatus('moving');
    } else if (this.state.target) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.state.target.x,
        this.state.target.y
      );

      if (distance <= ARRIVAL_RADIUS) {
        this.clearTarget('idle', 'arrived');
      } else {
        this.physics.moveTo(this.player, this.state.target.x, this.state.target.y, PLAYER_SPEED);
      }
    } else {
      body.setVelocity(0, 0);
    }

    this.overlay.render();
  }

  updateEnemies() {
    if (!this.enemies) return;

    this.enemies.getChildren().forEach(enemy => {
      const dodgeTarget = enemy.getData('dodgeTarget');
      if (dodgeTarget) {
        const dodgeDistance = Phaser.Math.Distance.Between(enemy.x, enemy.y, dodgeTarget.x, dodgeTarget.y);
        if (dodgeDistance <= 10) {
          enemy.body.setVelocity(0, 0);
          enemy.setData('dodgeTarget', null);
        }
        return;
      }

      const timer = enemy.getData('wanderTimer') - this.game.loop.delta;
      if (timer <= 0) {
        enemy.body.setVelocity(
          Phaser.Math.Between(-160, 160) || 120,
          Phaser.Math.Between(-160, 160) || -120
        );
        enemy.setData('wanderTimer', Phaser.Math.Between(900, 1900));
      } else {
        enemy.setData('wanderTimer', timer);
      }
    });
  }

  resetWorld() {
    this.state.resetRun();
    this.scene.restart();
  }
}
