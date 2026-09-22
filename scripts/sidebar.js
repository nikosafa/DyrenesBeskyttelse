import { pages } from "./config.js";

const navPages = pages.filter((page) => !page.isDivider);

export function buildNav() {
  const navList = document.getElementById("nav-list");
  if (!navList) return;

  let lastGroup = null;

  navPages.forEach((page) => {
    const li = document.createElement("li");
    if (page.group !== lastGroup) {
      li.classList.add("nav-group-start");
      lastGroup = page.group;
    }

    const link = document.createElement("a");
    link.href = `#${page.id}`;
    link.className = "nav-link";
    link.textContent = page.navLabel;
    link.dataset.navId = page.id;

    li.appendChild(link);
    navList.appendChild(li);
  });
}

export function initScrollSpy() {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  if (!navLinks.length) return;

  const linkById = new Map(navLinks.map((link) => [link.dataset.navId, link]));

  const sections = navPages
    .map((page) => document.getElementById(page.id))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    const nextActive = linkById.get(id);
    if (!nextActive || nextActive.classList.contains("active")) return;

    navLinks.forEach((link) => link.classList.remove("active"));
    nextActive.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  setActive(sections[0].id);
}
