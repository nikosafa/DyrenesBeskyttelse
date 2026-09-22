import { loadPages } from "./pageLoader.js";
import { buildNav, initScrollSpy } from "./sidebar.js";

async function loadSidebarShell() {
  const res = await fetch("components/sidebar.html");
  const html = await res.text();
  document.getElementById("sidebar-mount").innerHTML = html;
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
