import { EcritsTeasers } from "@/components/exposition/EcritsTeasers";
import { RealisationsMasonry } from "@/components/exposition/RealisationsMasonry";
import { InformelHero } from "@/components/home/InformelHero";
import { getClient } from "@/lib/sanity/client";
import {
  homeArtworksQuery,
  homeWritingsQuery,
} from "@/lib/sanity/queries";
import type { ArtworkCard, WritingCard } from "@/types/sanity";

export const revalidate = 30;

export default async function Home() {
  const client = getClient();
  const artworks: ArtworkCard[] = client
    ? await client.fetch(homeArtworksQuery)
    : [];
  const writings: WritingCard[] = client
    ? await client.fetch(homeWritingsQuery)
    : [];

  return (
    <>
      <InformelHero />
      <RealisationsMasonry artworks={artworks} />
      <EcritsTeasers writings={writings} />
      <footer className="border-t border-[#064e3b]/10 bg-[#064e3b] px-6 py-10 text-center text-sm text-[#f8fafc]/70 md:px-10">
        <p>Projet Mycélium — exposition collective.</p>
      </footer>
    </>
  );
}
