import { AgendaSection } from "@/components/home/AgendaSection";
import { BilletsFlux } from "@/components/home/BilletsFlux";
import { InformelHero } from "@/components/home/InformelHero";
import { getClient } from "@/lib/sanity/client";
import {
  billetsFluxQuery,
  upcomingEventsQuery,
} from "@/lib/sanity/queries";
import type { BilletFluxItem, EventCard } from "@/types/sanity";

export const revalidate = 30;

export default async function Home() {
  let events: EventCard[] = [];
  let billets: BilletFluxItem[] = [];

  const client = getClient();
  if (client) {
    try {
      events = await client.fetch(upcomingEventsQuery);
    } catch {
      events = [];
    }
    try {
      billets = await client.fetch(billetsFluxQuery);
    } catch {
      billets = [];
    }
  }

  return (
    <main className="relative z-10 flex min-h-screen flex-col">
      <InformelHero />
      <AgendaSection events={events} />
      <BilletsFlux billets={billets} />
      <footer className="px-8 py-16 text-center text-sm text-[color:var(--text-subtle)] md:px-14 md:py-20">
        <p>Projet Mycélium — collectif & vitrine.</p>
      </footer>
    </main>
  );
}
