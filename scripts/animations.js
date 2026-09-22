import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

export function initSectionReveals() {
  if (prefersReducedMotion) return;

  document.querySelectorAll(".page-section").forEach((section) => {
    scroll(
      animate(
        section,
        { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] },
        { duration: 0.6, easing: "ease-out" }
      ),
      { target: section, offset: ["start 85%", "start 55%"] }
    );
  });
}

export function initNavIndicator() {
  const navList = document.getElementById("nav-list");
  if (!navList) return;

  const indicator = document.createElement("div");
  indicator.className = "nav-indicator";
  navList.prepend(indicator);

  const moveIndicatorToLink = (link) => {
    if (!link) return;
    const li = link.parentElement;
    const top = li.offsetTop;
    const height = li.offsetHeight;

    if (prefersReducedMotion) {
      indicator.style.top = `${top}px`;
      indicator.style.height = `${height}px`;
      indicator.style.opacity = 1;
      return;
    }

    animate(
      indicator,
      { top: `${top}px`, height: `${height}px`, opacity: 1 },
      { duration: 0.35, easing: "ease-out" }
    );
  };

  const observer = new MutationObserver(() => {
    moveIndicatorToLink(navList.querySelector(".nav-link.active"));
  });
  observer.observe(navList, {
    attributes: true,
    attributeFilter: ["class"],
    subtree: true,
  });

  moveIndicatorToLink(navList.querySelector(".nav-link.active"));
}
