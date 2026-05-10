import { MyceliumHero } from "@/components/hero/MyceliumHero";
import { MemberNetwork } from "@/components/network/MemberNetwork";
import { getClient } from "@/lib/sanity/client";
import { membersWithRecentNodesQuery } from "@/lib/sanity/queries";
import type { MemberWithNodes } from "@/types/sanity";

export default async function Home() {
  const client = getClient();
  const members: MemberWithNodes[] = client
    ? await client.fetch(membersWithRecentNodesQuery)
    : [];

  return (
    <>
      <MyceliumHero />
      <MemberNetwork members={members} />
      <footer className="border-t border-[#064e3b]/10 bg-[#064e3b] px-6 py-10 text-center text-sm text-[#f8fafc]/70 md:px-10">
        <p>
          Projet Mycélium — vitrine &amp; collaboration. Hébergement prévu sur{" "}
          <span className="text-[#10b981]">Vercel</span>.
        </p>
      </footer>
    </>
  );
}
