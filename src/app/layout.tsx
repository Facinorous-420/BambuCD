import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const description =
  "BambuCD — a webcomic of 3D printing, spaghetti, and questionable supports. Not affiliated with Bambu Lab.";

export const metadata: Metadata = {
  // Lets relative metadata URLs resolve to absolute ones for share previews.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BambuCD: 3D Printing Comics",
    template: "%s — BambuCD",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "BambuCD",
    url: SITE_URL,
    title: "BambuCD: 3D Printing Comics",
    description,
  },
  twitter: {
    card: "summary",
    title: "BambuCD: 3D Printing Comics",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-[16px]">
        <div className="mx-auto max-w-[966px] space-y-2 px-2 py-3">
          <Header />
          <div className="panel px-4 py-3">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
