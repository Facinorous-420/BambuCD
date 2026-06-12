// Builds the static comic data from content/comics/<id>/ folders.
//
// Authoring is intentionally minimal: drop a folder under content/comics/ with
// an image in it (any filename). If the folder has no meta.json, one is
// generated automatically with the next comic number, today's date, a title
// derived from the folder name, and an empty tagline (altText) you can fill in
// later. An existing meta.json is never overwritten.
//
// For each comic it also generates a 512x512 share thumbnail (thumb.png) into
// the folder, copies the image + thumbnail into public/comics/, and writes the
// consolidated list to src/data/comics.json.
//
// Run automatically before `dev` and `build`, or manually: npm run build:content
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "content", "comics");
const publicComics = path.join(root, "public", "comics");
const dataFile = path.join(root, "src", "data", "comics.json");

const IMAGE_EXT = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"];
const THUMB_NAME = "thumb.png";
const THUMB_SIZE = 512; // square share thumbnail, padded on white

const today = () => new Date().toISOString().slice(0, 10);

// "the-stl-hoarder" -> "The Stl Hoarder" (a sensible default title to edit later)
function titleFromId(id) {
  return id
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function findImage(files) {
  return files.find(
    (f) => f !== THUMB_NAME && IMAGE_EXT.includes(path.extname(f).toLowerCase())
  );
}

// Generate thumb.png in the comic folder if missing or older than the source.
async function ensureThumbnail(dir, srcFile) {
  const srcPath = path.join(dir, srcFile);
  const thumbPath = path.join(dir, THUMB_NAME);

  let needs = true;
  try {
    const [s, t] = await Promise.all([fs.stat(srcPath), fs.stat(thumbPath)]);
    needs = s.mtimeMs > t.mtimeMs;
  } catch {
    needs = true;
  }

  if (needs) {
    // density helps SVG sources rasterize sharply; ignored for raster inputs.
    await sharp(srcPath, { density: 144 })
      .resize(THUMB_SIZE, THUMB_SIZE, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .flatten({ background: "#ffffff" })
      .png()
      .toFile(thumbPath);
  }
  return thumbPath;
}

async function main() {
  await fs.mkdir(contentDir, { recursive: true });

  // Reset the generated image folder so removed comics don't leave stragglers.
  await fs.rm(publicComics, { recursive: true, force: true });
  await fs.mkdir(publicComics, { recursive: true });

  const dirents = await fs.readdir(contentDir, { withFileTypes: true });
  const folders = dirents
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort(); // deterministic ordering for auto-assigned numbers

  // Pass 1: load existing meta.json files and find the highest number in use.
  const metas = new Map();
  const missing = [];
  let maxNumber = 0;
  for (const id of folders) {
    try {
      const meta = JSON.parse(
        await fs.readFile(path.join(contentDir, id, "meta.json"), "utf8")
      );
      if (typeof meta.number !== "number") {
        throw new Error(`content/comics/${id}/meta.json: "number" must be a number`);
      }
      if (!meta.title) {
        throw new Error(`content/comics/${id}/meta.json: "title" is required`);
      }
      metas.set(id, meta);
      maxNumber = Math.max(maxNumber, meta.number);
    } catch (err) {
      // Re-throw validation errors; treat a genuinely missing file as auto-gen.
      if (err.code !== "ENOENT" && !err.message.includes("JSON")) throw err;
      missing.push(id);
    }
  }

  // Pass 2: auto-generate meta.json for folders that don't have one.
  let counter = maxNumber;
  for (const id of missing) {
    counter += 1;
    const meta = {
      number: counter,
      title: titleFromId(id),
      altText: "",
      date: today(),
    };
    await fs.writeFile(
      path.join(contentDir, id, "meta.json"),
      JSON.stringify(meta, null, 2) + "\n"
    );
    metas.set(id, meta);
    console.log(`build-content: generated meta.json for "${id}" (#${meta.number})`);
  }

  // Pass 3: build thumbnails, copy assets, assemble the data list.
  const comics = [];
  for (const id of folders) {
    const dir = path.join(contentDir, id);
    const meta = metas.get(id);

    const files = await fs.readdir(dir);
    const imgFile = findImage(files);
    if (!imgFile) {
      throw new Error(
        `content/comics/${id}: no image file found (${IMAGE_EXT.join(", ")})`
      );
    }

    const thumbPath = await ensureThumbnail(dir, imgFile);

    const ext = path.extname(imgFile).toLowerCase();
    const outName = `${id}${ext}`;
    const thumbOut = `${id}.thumb.png`;
    await fs.copyFile(path.join(dir, imgFile), path.join(publicComics, outName));
    await fs.copyFile(thumbPath, path.join(publicComics, thumbOut));

    comics.push({
      id,
      number: meta.number,
      title: String(meta.title),
      altText: meta.altText ? String(meta.altText) : "",
      date: meta.date ? String(meta.date) : today(),
      image: `/comics/${outName}`,
      thumb: `/comics/${thumbOut}`,
    });
  }

  // Validate unique numbers.
  const seenNumbers = new Set();
  for (const c of comics) {
    if (seenNumbers.has(c.number)) {
      throw new Error(`Duplicate comic number ${c.number}`);
    }
    seenNumbers.add(c.number);
  }

  comics.sort((a, b) => a.number - b.number);

  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(comics, null, 2) + "\n");

  console.log(`build-content: wrote ${comics.length} comic(s) to src/data/comics.json`);
}

main().catch((err) => {
  console.error("build-content failed:", err.message);
  process.exit(1);
});
