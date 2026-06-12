import type { Comic } from "@/lib/comics";
import { permalinkFor, imageUrlFor } from "@/lib/site";
import ComicNav from "./ComicNav";
import EmbedBox from "./EmbedBox";

type Props = {
  comic: Comic;
  firstId: string | null;
  prevId: string | null;
  nextId: string | null;
  latestId: string | null;
};

export default function ComicView({
  comic,
  firstId,
  prevId,
  nextId,
  latestId,
}: Props) {
  const published = new Date(comic.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-6 text-center">
      <h2 className="mb-1 text-2xl font-bold [font-variant:small-caps]">
        {comic.title}
      </h2>
      <p className="mb-4 text-xs text-black/50">
        #{comic.number} &middot; {published}
      </p>

      <div className="mb-4">
        <ComicNav
          firstId={firstId}
          prevId={prevId}
          nextId={nextId}
          latestId={latestId}
        />
      </div>

      {/* The comic. title attribute gives the xkcd-style hover joke. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={comic.image}
        alt={comic.altText || comic.title}
        title={comic.altText || undefined}
        className="mx-auto h-auto max-w-full border border-black/10"
      />

      <div className="mt-4">
        <ComicNav
          firstId={firstId}
          prevId={prevId}
          nextId={nextId}
          latestId={latestId}
        />
      </div>

      <EmbedBox
        permalink={permalinkFor(comic.id)}
        imageUrl={imageUrlFor(comic.image)}
      />
    </article>
  );
}
