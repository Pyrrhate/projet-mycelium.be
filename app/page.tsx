import { MyceliumHero } from "@/components/hero/MyceliumHero";
import { MemberNetwork } from "@/components/network/MemberNetwork";
import { getClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import { membersWithRecentNodesQuery } from "@/lib/sanity/queries";
import type { MemberWithNodes } from "@/types/sanity";

/** Données Sanity à jour sans redeploy complet (Vercel / prod) */
export const revalidate = 30;

export default async function Home() {
  const sanityConfigured = isSanityConfigured();
  const client = getClient();
  const members: MemberWithNodes[] = client
    ? await client.fetch(membersWithRecentNodesQuery)
    : [];

  return (
    <>
      <MyceliumHero />
      <MemberNetwork
        members={members}
        sanityConfigured={sanityConfigured}
      />
      <footer className="border-t border-[#064e3b]/10 bg-[#064e3b] px-6 py-10 text-center text-sm text-[#f8fafc]/70 md:px-10">
        <p>
          Projet Mycélium — vitrine &amp; collaboration. Hébergement prévu sur{" "}
          <span className="text-[#10b981]">Vercel</span>.
        </p>
      </footer>
    </>
  );
}
