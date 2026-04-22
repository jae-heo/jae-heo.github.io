(() => {
  'use strict';

  const MIN_THUMB = 28;
  const MAX_THUMB_RATIO = 0.32;
  const PAGE_WIDTH = 12;
  const INNER_WIDTH = 10;
  const instances = new Set();

  function create(cls) {
    const el = document.createElement('div');
    el.className = cls;
    return el;
  }

  function build(target) {
    const isWindow = target === window;
    const existing = [...instances].find(i => i.target === target);
    if (existing) return existing;

    const wrap = create('wood-scrollbar ' + (isWindow ? 'wood-scrollbar-page' : 'wood-scrollbar-inner'));
    const track = create('wood-scrollbar-track');
    const thumb = create('wood-scrollbar-thumb');
    wrap.appendChild(track);
    wrap.appendChild(thumb);
    document.body.appendChild(wrap);

    if (!isWindow) target.classList.add('wood-scroll-host');

    const inst = { wrap, track, thumb, target, isWindow };
    instances.add(inst);
    wireEvents(inst);
    updatePosition(inst);
    updateThumb(inst);
    return inst;
  }

  function metrics(inst) {
    if (inst.isWindow) {
      return {
        viewport: window.innerHeight,
        total: document.documentElement.scrollHeight,
        scrolled: window.scrollY || document.documentElement.scrollTop
      };
    }
    const el = inst.target;
    return {
      viewport: el.clientHeight,
      total: el.scrollHeight,
      scrolled: el.scrollTop
    };
  }

  function updatePosition(inst) {
    const style = inst.wrap.style;
    if (inst.isWindow) {
      style.top = '0';
      style.right = '0';
      style.bottom = '0';
      style.left = '';
      style.height = '';
      style.width = PAGE_WIDTH + 'px';
      return;
    }
    const rect = inst.target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      style.display = 'none';
      return;
    }
    style.position = 'fixed';
    style.top = rect.top + 'px';
    style.left = (rect.right - INNER_WIDTH - 2) + 'px';
    style.right = '';
    style.bottom = '';
    style.height = rect.height + 'px';
    style.width = INNER_WIDTH + 'px';
  }

  function updateThumb(inst) {
    const { viewport, total, scrolled } = metrics(inst);
    const trackHeight = inst.track.clientHeight || viewport;

    if (total <= viewport + 1) {
      inst.wrap.style.display = 'none';
      return;
    }
    inst.wrap.style.display = '';

    const ratio = Math.min(MAX_THUMB_RATIO, viewport / total);
    const thumbHeight = Math.max(MIN_THUMB, Math.floor(trackHeight * ratio));
    const maxScroll = total - viewport;
    const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
    const thumbTop = Math.round((trackHeight - thumbHeight) * Math.max(0, Math.min(1, progress)));

    inst.thumb.style.height = thumbHeight + 'px';
    inst.thumb.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
  }

  function update(inst) {
    updatePosition(inst);
    updateThumb(inst);
  }

  function setScroll(inst, y) {
    if (inst.isWindow) window.scrollTo({ top: y });
    else inst.target.scrollTop = y;
  }

  function scrollBy(inst, delta) {
    if (inst.isWindow) window.scrollTo({ top: (window.scrollY || document.documentElement.scrollTop) + delta });
    else inst.target.scrollTop += delta;
  }

  function wireEvents(inst) {
    const upd = () => update(inst);

    if (inst.isWindow) {
      window.addEventListener('scroll', upd, { passive: true });
    } else {
      inst.target.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('scroll', () => updatePosition(inst), { passive: true });
      const ro = new ResizeObserver(upd);
      ro.observe(inst.target);

      // Peek on hover over target or scrollbar itself
      const peek = () => inst.wrap.classList.add('is-peek');
      const unpeek = () => inst.wrap.classList.remove('is-peek');
      inst.target.addEventListener('mouseenter', peek);
      inst.target.addEventListener('mouseleave', unpeek);
      inst.wrap.addEventListener('mouseenter', peek);
      inst.wrap.addEventListener('mouseleave', unpeek);
    }
    window.addEventListener('resize', upd);

    // Drag
    let dragging = false;
    let startY = 0;
    let startScroll = 0;

    inst.thumb.addEventListener('pointerdown', (e) => {
      dragging = true;
      startY = e.clientY;
      startScroll = metrics(inst).scrolled;
      inst.thumb.setPointerCapture(e.pointerId);
      inst.wrap.classList.add('is-dragging');
      e.preventDefault();
    });

    inst.thumb.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const { viewport, total } = metrics(inst);
      const trackHeight = inst.track.clientHeight || viewport;
      const thumbHeight = inst.thumb.clientHeight;
      const travel = trackHeight - thumbHeight;
      if (travel <= 0) return;
      const dy = e.clientY - startY;
      const scrollMax = total - viewport;
      setScroll(inst, startScroll + (dy / travel) * scrollMax);
    });

    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      inst.wrap.classList.remove('is-dragging');
      try { inst.thumb.releasePointerCapture(e.pointerId); } catch {}
    };
    inst.thumb.addEventListener('pointerup', endDrag);
    inst.thumb.addEventListener('pointercancel', endDrag);

    inst.track.addEventListener('mousedown', (e) => {
      if (e.target !== inst.track) return;
      const rect = inst.track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const transformY = parseFloat((inst.thumb.style.transform.match(/-?\d+(\.\d+)?px/g) || [,,'0'])[1] || 0);
      const thumbHeight = inst.thumb.clientHeight;
      const { viewport } = metrics(inst);
      const step = viewport * 0.85;
      if (clickY < transformY) scrollBy(inst, -step);
      else if (clickY > transformY + thumbHeight) scrollBy(inst, step);
    });
  }

  function refreshAll() {
    instances.forEach(update);
  }

  function centerCurrentInSeriesList() {
    document.querySelectorAll('.post-series-list').forEach(list => {
      const current = list.querySelector('.post-series-item.current');
      if (!current) return;
      const target = current.offsetTop - (list.clientHeight / 2) + (current.clientHeight / 2);
      list.scrollTop = Math.max(0, target);
    });
  }

  function init() {
    build(window);
    document.querySelectorAll('.home-series-posts, .post-series-list, .series-group.scrollable .series-posts, .series-navigation.scrollable .series-posts').forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.overflowY === 'visible' || el.scrollHeight <= el.clientHeight + 1) return;
      build(el);
    });
    document.documentElement.classList.add('has-wood-scroll');
    centerCurrentInSeriesList();
    // Re-sync thumbs after the scroll adjustment above so they match content position
    instances.forEach(update);
    // Observe body mutations so late-mounting content still gets refreshed
    const mo = new MutationObserver(refreshAll);
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
