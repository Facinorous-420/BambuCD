import type { Metadata } from "next";
import type { Comic } from "./comics";
import { permalinkFor, imageUrlFor } from "./site";

// Share-preview metadata for a comic. Uses the Twitter "summary" card so the
// comic shows as a small thumbnail (not a giant banner), with the comic title
// and the hover "secret" tagline as the description.
export function comicMetadata(comic: Comic): Metadata {
  const title = `#${comic.number}: ${comic.title}`;
  const description = comic.altText || comic.title;
  // Use the small generated thumbnail (always a PNG) for share previews.
  const image = imageUrlFor(comic.thumb);
  const url = permalinkFor(comic.id);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "BambuCD",
      url,
      title,
      description,
      images: [{ url: image, alt: comic.title }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}
