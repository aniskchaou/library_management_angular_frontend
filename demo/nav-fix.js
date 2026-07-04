(function () {
  'use strict';

  /**
   * nav-fix.js
   *
   * Fixes mat-expansion-panel collapse / expand in the demo build.
   *
   * Root cause: Angular Material 21 uses OnPush change detection.  In demo
   * mode Zone.js does not trigger a CD cycle after navigation-header clicks,
   * so the panels never visually open / close even though Angular's internal
   * _expanded flag is toggled.
   *
   * Fix: listen in the capture phase (fires before Angular's bubble-phase
   * handler) and immediately drive panel state via CSS class + DOM attributes.
   * Angular Material's own stylesheet already contains the rules:
   *
   *   .mat-expansion-panel.mat-expanded > .mat-expansion-panel-content-wrapper
   *       { grid-template-rows: 1fr }
   *
   *   .mat-expansion-panel.mat-expanded .mat-expansion-panel-content
   *       { visibility: visible }
   *
   * so toggling the "mat-expanded" class is all that is needed for the visual
   * change.  We also maintain aria-expanded and the `inert` attribute on the
   * content wrapper so links inside expanded panels remain interactive.
   *
   * Because we do NOT call stopPropagation(), Angular's own click handler
   * still runs (in the bubble phase) and keeps _expanded in sync.  If Angular
   * change detection does eventually fire the rendered output will agree with
   * what we set here.
   */

  document.addEventListener('click', function (e) {
    var header = e.target.closest('mat-expansion-panel-header');
    if (!header) return;

    var panel = header.closest('mat-expansion-panel');
    if (!panel) return;

    var isExpanded = panel.classList.contains('mat-expanded');
    var wrapper    = panel.querySelector('.mat-expansion-panel-content-wrapper');

    if (isExpanded) {
      // ── Collapse ────────────────────────────────────────────────────────────
      panel.classList.remove('mat-expanded');
      header.setAttribute('aria-expanded', 'false');
      if (wrapper) wrapper.setAttribute('inert', '');
    } else {
      // ── Expand ──────────────────────────────────────────────────────────────
      panel.classList.add('mat-expanded');
      header.setAttribute('aria-expanded', 'true');
      if (wrapper) wrapper.removeAttribute('inert');
    }
  }, true /* capture — fires before Angular's bubble-phase listener */);

}());
