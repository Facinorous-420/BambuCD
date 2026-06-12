import Link from "next/link";

// xkcd-style masthead: a left sidebar nav box beside a logo/tagline box.
export default function Header() {
  return (
    <div className="flex items-stretch gap-2">
      {/* Left: stacked small-caps nav links */}
      <nav className="panel w-[180px] shrink-0 px-4 py-3 text-[19px] font-bold leading-tight [font-variant:small-caps]">
        <Link href="/archive" className="block !text-black hover:underline">
          Archive
        </Link>
        <Link href="/about" className="block !text-black hover:underline">
          About
        </Link>
        <Link href="/random" className="block !text-black hover:underline">
          Random
        </Link>
      </nav>

      {/* Right: wordmark + tagline */}
      <div className="panel flex-1 px-5 py-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <Link href="/" className="hover:!no-underline">
            <span className="text-5xl font-bold tracking-tight text-[#6e6e6e] sm:text-6xl">
              bambu<span className="text-bambu">cd</span>
            </span>
          </Link>
          <span className="text-sm font-bold italic text-black/80 [font-variant:small-caps] sm:text-base">
            A webcomic of 3D printing, spaghetti, and questionable supports.
          </span>
        </div>
        <p className="mt-2 text-sm text-black/70 [font-variant:small-caps]">
          BambuCD updates whenever a print finishes (or fails spectacularly).
        </p>
      </div>
    </div>
  );
}
