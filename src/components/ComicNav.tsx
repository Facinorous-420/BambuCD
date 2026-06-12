import Link from "next/link";

type Props = {
  firstId: string | null;
  prevId: string | null;
  nextId: string | null;
  latestId: string | null;
};

// xkcd-style gray button row: |< Prev  Random  Next >|
function NavButton({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center rounded px-3 py-1 text-sm font-bold [font-variant:small-caps]";
  if (disabled) {
    return (
      <span className={`${base} cursor-default bg-[#dcdcdc] text-black/30`}>
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={`${base} bg-[#bbbbbb] !text-black hover:bg-[#a6a6a6] hover:!no-underline`}
    >
      {children}
    </Link>
  );
}

export default function ComicNav({
  firstId,
  prevId,
  nextId,
  latestId,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <NavButton href={`/comic/${firstId}`} disabled={firstId === null}>
        |&lt;
      </NavButton>
      <NavButton href={`/comic/${prevId}`} disabled={prevId === null}>
        &lt; Prev
      </NavButton>
      <NavButton href="/random" disabled={latestId === null}>
        Random
      </NavButton>
      <NavButton href={`/comic/${nextId}`} disabled={nextId === null}>
        Next &gt;
      </NavButton>
      <NavButton href={`/comic/${latestId}`} disabled={latestId === null}>
        &gt;|
      </NavButton>
    </div>
  );
}
