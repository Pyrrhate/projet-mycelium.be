import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { WritingCard } from "@/types/sanity";

type Props = {
  writings: WritingCard[];
};

function truncate(s: string | null | undefined, len: number) {
  if (!s) return "";
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= len) return t;
  return `${t.slice(0, len).trim()}…`;
}

export function EcritsTeasers({ writings }: Props) {
  return (
    <section
      id="ecrits"
      className="scroll-mt-6 border-t border-[#064e3b]/08 bg-[#f8fafc] px-5 py-20 md:px-10 md:py-28"
    >
      <header className="mx-auto mb-14 max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-[#10b981]">
          Les ramifications
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#064e3b] md:text-4xl">
          Écrits
        </h2>
        <p className="mt-3 max-w-2xl text-[#064e3b]/70">
          Une lecture calme — manifestes, nouvelles, fragments — avec
          illustrations d’en-tête.
        </p>
      </header>

      {writings.length === 0 ? (
        <p className="mx-auto max-w-6xl text-center text-[#064e3b]/55">
          Les textes apparaîtront ici une fois publiés dans Sanity.
        </p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:gap-14 lg:grid-cols-2">
          {writings.map((w) => {
            const illu = urlForImage(w.heroIllustration);
            const dek = truncate(w.previewText, 160);
            return (
              <article
                key={w._id}
                className="flex flex-col border-b border-[#064e3b]/10 pb-10 last:border-0 md:pb-14"
              >
                <Link
                  href={`/ecrits/${w.slug}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
                >
                  {illu ? (
                    <div className="relative mb-6 aspect-[21/9] w-full overflow-hidden rounded-lg bg-[#064e3b]/5 md:aspect-[2/1]">
                      <Image
                        src={illu}
                        alt=""
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                  <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-[#064e3b] transition group-hover:text-[#10b981] md:text-[1.65rem]">
                    {w.title}
                  </h3>
                  {w.author?.name ? (
                    <p className="mt-3 text-xs uppercase tracking-wider text-[#064e3b]/45">
                      {w.author.name}
                    </p>
                  ) : null}
                  {dek ? (
                    <p className="mt-4 max-w-prose text-[#064e3b]/75 leading-relaxed">
                      {dek}
                    </p>
                  ) : null}
                  <span className="mt-5 inline-block text-sm font-medium text-[#10b981] group-hover:underline">
                    Lire
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
