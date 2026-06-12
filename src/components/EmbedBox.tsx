// xkcd-style permalink / hotlink lines shown under each comic.
export default function EmbedBox({
  permalink,
  imageUrl,
}: {
  permalink: string;
  imageUrl: string;
}) {
  return (
    <div className="mt-6 text-center text-sm [font-variant:small-caps]">
      <p className="break-all">
        Permanent link to this comic:{" "}
        <a href={permalink}>{permalink}</a>
      </p>
      <p className="break-all">
        Image URL (for hotlinking/embedding):{" "}
        <a href={imageUrl}>{imageUrl}</a>
      </p>
    </div>
  );
}
