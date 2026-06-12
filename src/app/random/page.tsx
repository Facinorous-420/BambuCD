"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOrderedComics } from "@/lib/comics";

// xkcd-style "Random": on a static site we pick the target in the browser and
// redirect to its permalink.
export default function RandomPage() {
  const router = useRouter();

  useEffect(() => {
    const comics = getOrderedComics();
    if (comics.length === 0) {
      router.replace("/");
      return;
    }
    const pick = comics[Math.floor(Math.random() * comics.length)];
    router.replace(`/comic/${pick.id}/`);
  }, [router]);

  return (
    <p className="py-16 text-center text-black/60">Rolling the dice…</p>
  );
}
