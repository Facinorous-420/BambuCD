/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (no Node server at runtime).
  output: "export",
  // GitHub Pages serves /path/ as /path/index.html — trailing slashes keep
  // permalinks working.
  trailingSlash: true,
  // No image optimization server is available on static hosting.
  images: { unoptimized: true },
};

export default nextConfig;
