export const WORLD_WIDTH = 2200;
export const WORLD_HEIGHT = 1600;
export const PLAYER_SPEED = 280;
export const ARRIVAL_RADIUS = 18;
export const CRYSTAL_COUNT = 6;
export const MELEE_RANGE = 78;
export const STONE_RANGE = 320;
export const STONE_SPEED = 520;
export const ATTACK_COOLDOWN_MS = 650;
export const ENEMY_DODGE_CHANCE = 0.4;
export const ENEMY_DODGE_DISTANCE = 88;
export const ENEMY_DODGE_SPEED = 340;

export function getCameraZoom(width, height) {
  const isPortrait = height > width;
  if (isPortrait) {
    if (width < 430) return 0.56;
    if (width < 700) return 0.6;
    return 0.68;
  }

  if (width < 520) return 0.72;
  if (width < 900) return 0.84;
  return 0.96;
}
