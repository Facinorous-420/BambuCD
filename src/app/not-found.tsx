import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h2 className="mb-2 text-3xl font-bold">404 — Comic Not Found</h2>
      <p className="mb-4 text-black/60">
        This comic must have failed to adhere to the build plate.
      </p>
      <p>
        <Link href="/">Back to the latest comic</Link> &middot;{" "}
        <Link href="/archive">Browse the archive</Link>
      </p>
    </div>
  );
}
