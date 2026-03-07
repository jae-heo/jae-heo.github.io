export class JoystickController {
  constructor(state) {
    this.state = state;
    this.base = null;
    this.knob = null;
    this.pointerId = null;
    this.radius = 0;
  }

  bind() {
    this.base = document.getElementById('joystick-base');
    this.knob = document.getElementById('joystick-knob');
    this.radius = this.base.clientWidth / 2;

    this.base.addEventListener('pointerdown', event => {
      event.preventDefault();
      this.pointerId = event.pointerId;
      this.base.setPointerCapture(event.pointerId);
      this.updateFromEvent(event);
    });

    this.base.addEventListener('pointermove', event => {
      if (event.pointerId !== this.pointerId) return;
      event.preventDefault();
      this.updateFromEvent(event);
    });

    const release = event => {
      if (event.pointerId !== this.pointerId) return;
      this.pointerId = null;
      this.state.moveInput = { active: false, x: 0, y: 0 };
      this.resetKnob();
    };

    this.base.addEventListener('pointerup', release);
    this.base.addEventListener('pointercancel', release);
  }

  updateFromEvent(event) {
    const rect = this.base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.min(Math.hypot(dx, dy), this.radius - 24);
    const angle = Math.atan2(dy, dx);
    const knobX = Math.cos(angle) * distance;
    const knobY = Math.sin(angle) * distance;
    const normalizedX = knobX / (this.radius - 24);
    const normalizedY = knobY / (this.radius - 24);

    this.knob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;
    this.state.moveInput = {
      active: true,
      x: Number.isFinite(normalizedX) ? normalizedX : 0,
      y: Number.isFinite(normalizedY) ? normalizedY : 0
    };
  }

  resetKnob() {
    this.knob.style.transform = 'translate(-50%, -50%)';
  }
}
