export class GameState {
  constructor() {
    this.lang = localStorage.getItem('lang') === 'ko' ? 'ko' : 'en';
    this.theme = localStorage.getItem('theme') || 'dark';
    this.target = null;
    this.moveInput = { active: false, x: 0, y: 0 };
    this.facing = { x: 1, y: 0 };
    this.attackQueued = false;
    this.attackCooldownUntil = 0;
    this.crystalsCollected = 0;
    this.isComplete = false;
    this.isDead = false;
    this.scene = null;
  }

  resetRun() {
    this.target = null;
    this.moveInput = { active: false, x: 0, y: 0 };
    this.facing = { x: 1, y: 0 };
    this.attackQueued = false;
    this.attackCooldownUntil = 0;
    this.crystalsCollected = 0;
    this.isComplete = false;
    this.isDead = false;
  }

  startAttackCooldown(now, duration) {
    this.attackCooldownUntil = now + duration;
  }

  getAttackCooldownRemaining(now) {
    return Math.max(0, this.attackCooldownUntil - now);
  }

  canAttack(now) {
    return this.getAttackCooldownRemaining(now) === 0;
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
