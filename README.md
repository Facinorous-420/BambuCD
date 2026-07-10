# BambuCD

An [xkcd](https://xkcd.com)-style webcomic about 3D printing and Bambu Lab printers. Built with **Next.js (static export) + TypeScript + Tailwind**, hosted on **GitHub Pages** at **https://bambucd.xyz**.

> **BambuCD is an independent parody/fan project. It is not affiliated with, endorsed by, or associated with Bambu Lab in any way.** All comics are AI-generated under human supervision.

> Licensed under **AGPL-3.0** — fork it, remix it, share your changes back.

## How it works

This is a fully static site — there is no server, database, or login. Comics are **content in this repo**: each comic is a folder under [`content/comics/`](content/comics/). A build step turns those folders into static data + images, and Next.js exports plain HTML that GitHub Pages serves.

- **Home** (`/`) shows the latest comic.
- **Permalinks**: `/comic/<id>/` (the folder name) and also `/comic/<number>/`.
- **Embed image URLs**: `https://bambucd.xyz/comics/<id>.<ext>` — shown under each comic.
- **Navigation**: First · Prev · Random · Next · Latest. Random is resolved in the browser.
- **Archive** (`/archive`) lists every comic.

## Adding a comic

I mainly use ChatGPT to generate comics, using these prompts, but feel free to change the prompts around to better match your style and workflow:

"Generate me a comic in the style of xkcd comics. This comic will be - panels. This comic will be about -. Put "BambuCD" in black text in the corner. Don't include the comic title as text anywhere in the comic. Come up with a clever comic title and metadata description based on the comic. "

If you want ChatGPT to come up with all the punchlines and everything,

 "Generate me a comic in the style of xkcd comics. This comic will be - panels. This comic will be about -. Make the comic funny, in the same humor style that xkcd uses with a very funny punch line. Put "BambuCD" in black text in the corner. Don't include the comic title as text anywhere in the comic. Come up with a clever comic title and metadata description based on the comic."


The minimal way — **just add a folder with an image in it:**

```
content/comics/
  spaghetti-monster/        <- folder name = the comic's id / URL
    comic.png               <- any image, any filename (png, jpg, gif, webp, svg, avif)
```

On the next build the pipeline auto-creates a `meta.json` for any folder that
doesn't have one, using the **next comic number**, **today's date**, a title
derived from the folder name, and an **empty tagline** to fill in later:

```json
{
  "number": 7,
  "title": "Spaghetti Monster",
  "altText": "",
  "date": "2026-06-12"
}
```

Edit that `meta.json` anytime to set the real title and the hover **tagline**
(`altText`). An existing `meta.json` is never overwritten. `number` and the
folder `id` must each be unique.

> `meta.json`, the share thumbnail (`thumb.png`), `public/comics/`, and
> `src/data/comics.json` are all **generated** — you never have to create them
> by hand. They're git-ignored and rebuilt on every dev/build and in CI.

### Helper script (optional, local)

```bash
npm run add-comic -- --title "Spaghetti Monster" --image ./my-comic.png \
  --alt "Hover text here" --date 2026-06-12
```

## Contributing a comic via Pull Request

Anyone can submit a comic:

1. Click **[open a pull request](https://github.com/Facinorous-420/BambuCD/upload/main/content/comics)** (GitHub will fork the repo for you).
2. Create/upload your comic into a new folder `content/comics/<your-comic-name>/`.
3. Submit the PR — the template walks you through it. Title/date/number are auto-filled if you don't include a `meta.json`.

**Comic content rules:**

- Must be about 3D printing / Bambu Lab and safe-for-work.
- The image **must include a "BambuCD" logo** somewhere on it.
- **No ads, no hyperlinks/URLs, no QR codes, no calls-to-action** baked into the image.
- A small **`By: <your name/handle>`** credit on the comic is welcome (plain text, no links).
- Only submit artwork you have the right to publish.
- Contributions are released under the project's **AGPL-3.0** license.

## Local development

```bash
npm install
cp .env.example .env   # optional; only sets NEXT_PUBLIC_SITE_URL
npm run dev            # http://localhost:3000  (regenerates content first)
```

Other commands:

```bash
npm run build:content  # regenerate meta.json/thumbnails/comics.json from content
npm run build          # static export to ./out
npm run preview        # serve ./out locally
```

Deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): every push to `main` rebuilds the site and publishes it to GitHub Pages (and commits back any auto-generated `meta.json`).

## Project layout

```
content/comics/<id>/         # authored comics (image; meta.json + thumb.png generated)
scripts/build-content.mjs     # content -> meta.json + thumbnails + comics.json + public/comics
scripts/new-comic.mjs         # `npm run add-comic` helper
src/
  app/
    page.tsx                  # latest comic
    comic/[id]/page.tsx       # permalink (id or number) — generateStaticParams
    archive/page.tsx
    about/page.tsx
    random/page.tsx           # client-side random redirect
  components/                 # Header, Footer, ComicView, ComicNav, EmbedBox
  lib/comics.ts               # reads generated src/data/comics.json
  lib/site.ts                 # absolute URL helpers
  lib/metadata.ts             # per-comic Open Graph / Twitter share metadata
public/CNAME                  # bambucd.xyz
.github/workflows/deploy.yml  # build + deploy to GitHub Pages
```
