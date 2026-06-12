import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const REPO = "https://github.com/Facinorous-420/BambuCD";
// Drops the contributor straight into uploading a comic image (GitHub forks and
// opens a pull request automatically for non-maintainers).
const CONTRIBUTE_URL = `${REPO}/upload/main/content/comics`;

export default function AboutPage() {
  return (
    <div className="prose py-6 text-sm leading-relaxed">
      <h2 className="mb-3 text-2xl font-bold [font-variant:small-caps]">
        About BambuCD
      </h2>

      <p className="mb-3">
        BambuCD is a small webcomic about 3D printing — failed first layers,
        spaghetti monsters, heated-bed romance, and the eternal quest for the
        perfect support settings.
      </p>

      <p className="mb-3">
        It is styled after the absolutely magnificent{" "}
        <a href="https://xkcd.com" rel="noreferrer noopener" target="_blank">
          xkcd
        </a>
        , which is — and we cannot stress this enough — orders of magnitude
        better than the spaghetti our 3D printers churn out here. Randall draws
        comics that make you think. We draw comics about a print that failed at
        97%. Go read xkcd. Then maybe come back.
      </p>

      <p className="mb-3 font-semibold">
        BambuCD is an independent parody/fan project. We are not affiliated
        with, endorsed by, sponsored by, or associated with Bambu Lab in any
        way. All trademarks belong to their respective owners.
      </p>

      <h3 className="mb-2 mt-6 text-lg font-bold [font-variant:small-caps]">
        Got a comic? Send it our way
      </h3>
      <p className="mb-3">
        This whole thing lives on{" "}
        <a href={REPO} rel="noreferrer noopener" target="_blank">
          GitHub
        </a>
        , so you can add your own comics:{" "}
        <a href={CONTRIBUTE_URL} rel="noreferrer noopener" target="_blank">
          open a pull request
        </a>{" "}
        with an image and you&apos;re basically published. And because we are a
        3D-printing project, the code is{" "}
        <strong>AGPL-3.0</strong> licensed — meaning we actually <em>want</em>{" "}
        you to fork it, remix it, and share your changes back. Wild concept for
        this hobby, we know. We promise you won&apos;t have to discover the
        license terms the hard way, several years and one community uproar
        later. Copyleft: it&apos;s not just for slicers you&apos;ve heard about.
      </p>

      <h3 className="mb-2 mt-6 text-lg font-bold [font-variant:small-caps]">
        Who runs this
      </h3>
      <p className="mb-3">
        BambuCD is owned and managed by{" "}
        <a
          href="https://makerworld.com/en/@Facinorous"
          rel="noreferrer noopener"
          target="_blank"
        >
          Facinorous
        </a>
        . Say hi, or judge the models — both are valid.
      </p>

      <p>
        Comics are posted whenever inspiration (or a print failure) strikes.
        Browse the <a href="/archive">archive</a> to read them all.
      </p>
    </div>
  );
}
