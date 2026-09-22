import { pages } from "./config.js";

export async function loadPages() {
  const container = document.getElementById("content");

  const htmlByIndex = await Promise.all(
    pages.map(async (page) => {
      const res = await fetch(`pages/${page.file}`);
      if (!res.ok) {
        console.error(`Failed to load pages/${page.file}: ${res.status}`);
        return "";
      }
      return res.text();
    })
  );

  container.innerHTML = htmlByIndex.join("\n");
}
