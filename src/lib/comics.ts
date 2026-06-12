import comicsData from "@/data/comics.json";

export type Comic = {
  id: string;
  number: number;
  title: string;
  altText: string;
  date: string;
  image: string;
  thumb: string;
};

// Ordered oldest -> newest (ascending by comic number).
const comics: Comic[] = (comicsData as Comic[])
  .slice()
  .sort((a, b) => a.number - b.number);

/** All comics, ordered oldest -> newest. */
export function getOrderedComics(): Comic[] {
  return comics;
}

/** All comics, newest first (for the archive list). */
export function getAllComics(): Comic[] {
  return comics.slice().reverse();
}

export function getLatestComic(): Comic | null {
  return comics[comics.length - 1] ?? null;
}

export function getFirstComic(): Comic | null {
  return comics[0] ?? null;
}

/** Resolve a permalink param that may be a comic id (slug) or a number. */
export function getComicByParam(param: string): Comic | null {
  return (
    comics.find((c) => c.id === param || String(c.number) === param) ?? null
  );
}

export function getPrevComic(comic: Comic): Comic | null {
  const idx = comics.findIndex((c) => c.id === comic.id);
  return idx > 0 ? comics[idx - 1] : null;
}

export function getNextComic(comic: Comic): Comic | null {
  const idx = comics.findIndex((c) => c.id === comic.id);
  return idx >= 0 && idx < comics.length - 1 ? comics[idx + 1] : null;
}

export function getRandomComic(): Comic | null {
  if (comics.length === 0) return null;
  return comics[Math.floor(Math.random() * comics.length)];
}
