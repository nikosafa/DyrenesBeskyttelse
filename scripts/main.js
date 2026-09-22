import { loadPages } from "./pageLoader.js";
import { buildNav, initScrollSpy } from "./sidebar.js";

async function loadSidebarShell() {
  const res = await fetch("components/sidebar.html");
  const html = await res.text();
  // Replace the mount point itself (not just its innerHTML) so <aside id="sidebar">
  // becomes a direct child of the #app flex container — position: sticky only has
  // room to work when the sticky element's own parent is the scrollable flex item.
  document.getElementById("sidebar-mount").outerHTML = html;
}

async function init() {
  await Promise.all([loadSidebarShell(), loadPages()]);
  buildNav();
  initScrollSpy();

  // Loaded dynamically so a blocked/offline CDN only disables animation,
  // it never breaks page loading or navigation.
  try {
    const { initSectionReveals, initNavIndicator } = await import("./animations.js");
    initSectionReveals();
    initNavIndicator();
  } catch (err) {
    console.warn("Motion.js animations unavailable:", err);
  }
}

init();
