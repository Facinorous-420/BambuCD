import type { Metadata } from "next";
import ComicView from "@/components/ComicView";
import { getLatestComic, getFirstComic, getPrevComic } from "@/lib/comics";
import { comicMetadata } from "@/lib/metadata";

// Share previews of the root URL show the latest comic.
export function generateMetadata(): Metadata {
  const latest = getLatestComic();
  return latest ? comicMetadata(latest) : {};
}

export default function HomePage() {
  const latest = getLatestComic();

  if (!latest) {
    return (
      <div className="py-16 text-center text-black/60">
        <h2 className="mb-2 text-2xl font-bold text-black">No comics yet</h2>
        <p>
          The first BambuCD comic hasn&apos;t been posted. Check back soon, or
          add one under <code>content/comics/</code> in the repo.
        </p>
      </div>
    );
  }

  const first = getFirstComic();
  const prev = getPrevComic(latest);

  return (
    <ComicView
      comic={latest}
      firstId={first?.id ?? null}
      prevId={prev?.id ?? null}
      nextId={null}
      latestId={latest.id}
    />
  );
}
