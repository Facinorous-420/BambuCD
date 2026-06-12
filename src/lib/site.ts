// Absolute base URL of the deployed site, used for permalink / embed URLs.
// Set NEXT_PUBLIC_SITE_URL at build time (the deploy workflow does this).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bambucd.xyz"
).replace(/\/$/, "");

/** Absolute permalink for a comic. */
export function permalinkFor(id: string): string {
  return `${SITE_URL}/comic/${id}/`;
}

/** Absolute URL for a comic image (image is a root-relative path like /comics/x.png). */
export function imageUrlFor(image: string): string {
  return `${SITE_URL}${image}`;
}
