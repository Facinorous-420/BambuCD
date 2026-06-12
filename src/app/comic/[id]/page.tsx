import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ComicView from "@/components/ComicView";
import {
  getComicByParam,
  getOrderedComics,
  getFirstComic,
  getLatestComic,
  getPrevComic,
  getNextComic,
} from "@/lib/comics";
import { comicMetadata } from "@/lib/metadata";

// Static export: enumerate every permalink. Each comic is reachable by both
// its id (folder name) and its number.
export function generateStaticParams() {
  return getOrderedComics().flatMap((c) => [
    { id: c.id },
    { id: String(c.number) },
  ]);
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const comic = getComicByParam(params.id);
  if (!comic) return { title: "Comic not found" };
  return comicMetadata(comic);
}

export default function ComicPage({ params }: { params: { id: string } }) {
  const comic = getComicByParam(params.id);
  if (!comic) notFound();

  const first = getFirstComic();
  const latest = getLatestComic();
  const prev = getPrevComic(comic);
  const next = getNextComic(comic);

  return (
    <ComicView
      comic={comic}
      firstId={first?.id ?? null}
      prevId={prev?.id ?? null}
      nextId={next?.id ?? null}
      latestId={latest?.id ?? null}
    />
  );
}
