// Scaffold a new comic folder, then rebuild the static comic data.
//
// Usage:
//   npm run add-comic -- --title "Spaghetti Monster" --image ./my-comic.png \
//     [--alt "hover text"] [--id custom-slug] [--date 2026-06-11]
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "content", "comics");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function nextNumber() {
  await fs.mkdir(contentDir, { recursive: true });
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  let max = 0;
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    try {
      const meta = JSON.parse(
        await fs.readFile(path.join(contentDir, e.name, "meta.json"), "utf8")
      );
      if (typeof meta.number === "number") max = Math.max(max, meta.number);
    } catch {
      /* ignore folders without valid meta */
    }
  }
  return max + 1;
}

async function main() {
  const title = arg("title");
  const imagePath = arg("image");
  if (!title || !imagePath) {
    console.error(
      'Usage: npm run add-comic -- --title "Title" --image path/to/image.png [--alt "hover"] [--id slug] [--date YYYY-MM-DD]'
    );
    process.exit(1);
  }

  const id = slugify(arg("id") || title) || "comic";
  const dir = path.join(contentDir, id);

  try {
    await fs.access(dir);
    console.error(`A comic folder already exists: content/comics/${id}`);
    process.exit(1);
  } catch {
    /* doesn't exist — good */
  }

  const ext = path.extname(imagePath).toLowerCase() || ".png";
  await fs.mkdir(dir, { recursive: true });
  await fs.copyFile(imagePath, path.join(dir, `comic${ext}`));

  const meta = {
    number: await nextNumber(),
    title,
    altText: arg("alt") || "",
    date: arg("date") || new Date().toISOString().slice(0, 10),
  };
  await fs.writeFile(
    path.join(dir, "meta.json"),
    JSON.stringify(meta, null, 2) + "\n"
  );

  console.log(`Created content/comics/${id}/ (comic #${meta.number}).`);

  // Regenerate the static data so it shows up immediately.
  await import("./build-content.mjs");
}

main().catch((err) => {
  console.error("add-comic failed:", err.message);
  process.exit(1);
});
