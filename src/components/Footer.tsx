import Link from "next/link";

export default function Footer() {
  return (
    <div className="panel px-4 py-4 text-center text-xs text-black/60">
      <p className="mb-3 [font-variant:small-caps]">
        <Link href="/archive">Archive</Link> &middot;{" "}
        <Link href="/about">About</Link> &middot;{" "}
        <Link href="/random">Random</Link>
      </p>
      <p className="mx-auto mb-2 max-w-[640px]">
        <strong>BambuCD is a parody fan project and is not affiliated with,
        endorsed by, or associated with Bambu Lab in any way.</strong>{" "}
        &quot;Bambu Lab&quot; and related names are trademarks of their
        respective owners. Comics are for entertainment only.
      </p>
      <p className="mx-auto max-w-[640px] italic">
        Every comic on this site is lovingly hallucinated by AI under the firm
        supervision of a human who typed the prompt, sighed, and clicked
        &quot;regenerate&quot; eleven times. No stick figures were harmed; a few
        were spaghettified. If a comic is funny, thank the human. If it&apos;s
        weird, blame the robot. (It was the robot.)
      </p>
    </div>
  );
}
