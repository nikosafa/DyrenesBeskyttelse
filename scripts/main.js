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
}

init();
