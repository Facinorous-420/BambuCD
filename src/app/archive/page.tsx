import Link from "next/link";
import type { Metadata } from "next";
import { getAllComics } from "@/lib/comics";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every BambuCD comic, newest first.",
};

export default function ArchivePage() {
  const comics = getAllComics();

  return (
    <div className="py-6">
      <h2 className="mb-1 text-2xl font-bold [font-variant:small-caps]">
        Comic Archive
      </h2>
      <p className="mb-4 text-sm text-black/60">
        These are all the BambuCD comics, newest at the top.
      </p>

      {comics.length === 0 ? (
        <p className="text-black/60">No comics have been posted yet.</p>
      ) : (
        <ul className="space-y-1">
          {comics.map((c) => (
            <li key={c.id} className="flex gap-3 text-sm">
              <span className="w-32 shrink-0 text-black/50">
                {new Date(c.date).toLocaleDateString("en-US")}
              </span>
              <Link href={`/comic/${c.id}`}>
                #{c.number}: {c.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
