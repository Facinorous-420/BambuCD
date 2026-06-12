# Publishing a New BambuCD Comic

This guide explains how to add a new comic to BambuCD. Everything can be done from a phone's mobile web browser — **use Chrome or Safari on the web, not the GitHub mobile app** (the app can't upload images). If buttons are hidden on mobile, switch your browser to **Desktop site** mode.

---

## How comics are organised

Each comic lives in its own folder under `content/comics/`. The folder name is the comic's **slug** — a short, lowercase, hyphenated identifier, e.g. `spaghetti-monster`. Inside every comic folder there are exactly two things:

- `meta.json` — the comic's metadata
- `comic.png` or `comic.jpg` — the comic image

The share thumbnail (`thumb.png`) is generated automatically during the build. **Do not create it yourself.**

---

## meta.json format

```json
{
  "number": 2,
  "title": "Comic Title",
  "altText": "the hover 'secret' tagline shown when you mouse over the comic",
  "date": "YYYY-MM-DD"
}
```

| Field | Notes |
|-------|-------|
| `number` | Next unused integer. Browse `content/comics/` or the site's Archive page to find the highest existing number, then add 1. Must be unique. |
| `title` | The comic's display title. |
| `altText` | The secret hover/tooltip text — the joke-within-a-joke. |
| `date` | Publication date in `YYYY-MM-DD` format, e.g. `2024-06-11`. |

---

## Adding a new comic from your phone

> **Use a mobile web browser (Chrome or Safari), NOT the GitHub mobile app.**
> If you don't see an "Upload files" button, switch to Desktop site in your browser's menu.

### Step 1 — Create the comic folder and meta.json

1. Open [github.com/Facinorous-420/BambuCD](https://github.com/Facinorous-420/BambuCD) and sign in.
2. Tap **content** → **comics**.
3. Tap **Add file** → **Create new file**.
4. In the name box at the top, type your slug followed by a slash and the filename:
   ```
   your-comic-id/meta.json
   ```
   Typing the `/` automatically creates the folder.
5. Paste this template into the editor and fill it in:
   ```json
   {
     "number": 2,
     "title": "Your Comic Title",
     "altText": "Your secret hover tagline",
     "date": "2024-06-11"
   }
   ```
6. Scroll down, leave the commit message as-is, and tap **Commit changes**.

### Step 2 — Upload the comic image

1. You should now be inside `content/comics/your-comic-id/`. If not, tap into it.
2. Tap **Add file** → **Upload files**.
3. Tap **Choose your files** and pick the image from your phone.
   - Name the file `comic.png` or `comic.jpg` before uploading, or rename it after selecting if your browser allows it.
4. Tap **Commit changes**.

### Step 3 — Wait for the build

The **Deploy to GitHub Pages** Action runs automatically after every commit. It usually finishes in **1–2 minutes**. You can watch it at:

> Actions tab → Deploy to GitHub Pages → latest run

Once it's green, the comic will be live at **https://bambucd.xyz**.

---

## Editing an existing comic

1. Browse to `content/comics/your-comic-id/meta.json`.
2. Tap the **pencil icon** (Edit this file).
3. Make your changes and tap **Commit changes**.
4. Wait ~1–2 min for the build.

---

## Deleting a comic

1. Browse to `content/comics/your-comic-id/`.
2. Delete each file inside the folder one at a time:
   - Open the file → tap the **⋯** menu (or trash icon) → **Delete file** → Commit.
3. Once the folder is empty it disappears automatically.
4. Wait ~1–2 min for the build.

---

## Quick reference

| Action | Where |
|--------|-------|
| Find the next comic number | Browse `content/comics/` and count, or check the Archive page on the site |
| Watch the build | [Actions tab](https://github.com/Facinorous-420/BambuCD/actions) |
| Live site | https://bambucd.xyz |
| Fallback URL | https://facinorous-420.github.io/BambuCD/ |

