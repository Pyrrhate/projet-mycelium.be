import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { EventCard } from "@/types/sanity";

type Props = {
  events: EventCard[];
};

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-BE", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function AgendaSection({ events }: Props) {
  return (
    <section
      id="agenda"
      className="relative z-10 scroll-mt-8 px-6 py-20 md:px-14 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent-mint)]">
          Agenda
        </p>
        <h2 className="font-display mt-3 max-w-xl text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl">
          Expositions & rencontres
        </h2>
        <p className="mt-4 max-w-2xl text-[color:var(--text-muted)]">
          Prochaines dates du collectif — à afficher, partager, prolonger.
        </p>
      </div>

      {events.length === 0 ? (
        <p className="mx-auto mt-14 max-w-6xl text-[color:var(--text-subtle)]">
          Aucune date à venir pour l’instant. Les événements publiés dans Sanity
          apparaîtront ici.
        </p>
      ) : (
        <div className="mx-auto mt-14 flex max-w-6xl gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:pl-0 [scrollbar-width:thin]">
          {events.map((ev, i) => {
            const cover = urlForImage(ev.coverImage);
            return (
              <article
                key={ev._id}
                className="flex w-[min(85vw,20rem)] shrink-0 flex-col rounded-2xl border border-white/[0.09] bg-white/[0.03] p-5 backdrop-blur-sm md:w-auto md:min-w-0"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="font-display text-2xl font-semibold tabular-nums text-[color:var(--accent-mint)]/70"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <time
                      dateTime={ev.date}
                      className="text-xs uppercase tracking-wider text-[color:var(--text-subtle)]"
                    >
                      {formatWhen(ev.date)}
                    </time>
                    <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-[color:var(--text-primary)]">
                      {ev.title}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                      {ev.location}
                    </p>
                  </div>
                </div>
                {cover ? (
                  <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/[0.06]">
                    <Image
                      src={cover}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 85vw, 20rem"
                    />
                  </div>
                ) : null}
                {ev.description && ev.description.length > 0 ? (
                  <div className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted)] [&_p]:mb-2 [&_p:last-child]:mb-0">
                    <PortableText value={ev.description} />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}

      <div className="mx-auto mt-12 max-w-6xl text-center md:text-left">
        <Link
          href="#flux"
          className="text-sm font-medium text-[color:var(--accent-mint)] hover:underline"
        >
          Voir le flux du collectif ↓
        </Link>
      </div>
    </section>
  );
}
