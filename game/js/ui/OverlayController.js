import { CRYSTAL_COUNT } from '../config.js';

export class OverlayController {
  constructor(state, t) {
    this.state = state;
    this.t = t;
    this.ui = {};
  }

  bind() {
    this.ui.stageObjective = document.getElementById('stage-objective');
    this.ui.stageStatus = document.getElementById('stage-status');
    this.ui.stageHint = document.getElementById('game-stage-hint');
    this.ui.endOverlay = document.getElementById('end-overlay');
    this.ui.endEyebrow = document.getElementById('end-eyebrow');
    this.ui.endTitle = document.getElementById('end-title');
    this.ui.endDescription = document.getElementById('end-description');
    this.ui.playAgain = document.getElementById('play-again-btn');
    this.ui.attackButton = document.getElementById('attack-button');
    this.ui.themeIcon = document.getElementById('theme-icon');
    return this.ui;
  }

  setHint(message) {
    this.ui.stageHint.textContent = message;
  }

  setStatus(key) {
    this.ui.stageStatus.textContent = this.t(key);
  }

  render() {
    const now = this.state.scene?.time?.now ?? performance.now();
    const attackCooldownRemaining = this.state.getAttackCooldownRemaining(now);
    const isAttackCoolingDown = attackCooldownRemaining > 0;

    this.ui.stageObjective.textContent = this.t('objective');
    this.ui.stageHint.textContent = this.state.crystalsCollected === CRYSTAL_COUNT
      ? this.t('allCrystals')
      : this.t('worldNote');

    if (!this.state.target && this.ui.stageStatus.textContent !== this.t('blocked')) {
      this.ui.stageStatus.textContent = this.t('idle');
    }

    if (this.state.isComplete) {
      this.ui.stageStatus.textContent = this.t('finished');
    }
    if (this.state.isDead) {
      this.ui.stageStatus.textContent = this.t('dead');
    }

    const isEnd = this.state.isComplete || this.state.isDead;
    this.ui.endEyebrow.textContent = this.state.isDead ? this.t('dead') : this.t('finished');
    this.ui.endTitle.textContent = this.state.isDead ? this.t('deadTitle') : this.t('completedTitle');
    this.ui.endDescription.textContent = this.state.isDead ? this.t('deadDescription') : this.t('allCrystals');
    this.ui.playAgain.textContent = this.t('playAgain');
    this.ui.attackButton.textContent = isAttackCoolingDown
      ? `${(attackCooldownRemaining / 1000).toFixed(1)}s`
      : this.t('attackButton');
    this.ui.attackButton.disabled = isAttackCoolingDown || this.state.isComplete || this.state.isDead;
    this.ui.attackButton.classList.toggle('is-cooling-down', isAttackCoolingDown);
    this.ui.endOverlay.classList.toggle('hidden', !isEnd);
    this.ui.themeIcon.textContent = this.state.theme === 'dark' ? '🌙' : '☀️';
  }
}
