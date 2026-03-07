import { GameState } from './state/GameState.js';
import { createTranslator } from './translations.js';
import { JoystickController } from './ui/JoystickController.js';
import { OverlayController } from './ui/OverlayController.js';
import { TouchWorldScene } from './scenes/TouchWorldScene.js';

const state = new GameState();
const t = createTranslator(state.lang);
const overlay = new OverlayController(state, t);
const joystick = new JoystickController(state);

function toggleTheme() {
  state.setTheme(state.theme === 'dark' ? 'light' : 'dark');
  overlay.render();
  if (state.scene) state.scene.resetWorld();
}

function createGame() {
  const root = document.getElementById('game-root');
  const bounds = root.getBoundingClientRect();

  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game-root',
    width: Math.max(320, Math.round(bounds.width || window.innerWidth)),
    height: Math.max(480, Math.round(bounds.height || window.innerHeight)),
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [new TouchWorldScene({ state, overlay, t })]
  });
}

function bindUi() {
  overlay.bind();
  joystick.bind();
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  overlay.ui.playAgain.addEventListener('click', () => state.scene?.resetWorld());
  overlay.ui.attackButton.addEventListener('pointerdown', event => {
    event.preventDefault();
    state.attackQueued = true;
  });
  overlay.render();
}

function init() {
  bindUi();
  createGame();
}

init();
