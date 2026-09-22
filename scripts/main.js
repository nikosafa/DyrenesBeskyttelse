async function loadSidebarShell() {
  const res = await fetch("components/sidebar.html");
  const html = await res.text();
  document.getElementById("sidebar-mount").innerHTML = html;
}

loadSidebarShell();
