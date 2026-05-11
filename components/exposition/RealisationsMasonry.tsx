import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/lib/sanity/image";
import type { ArtworkCard } from "@/types/sanity";

type Props = {
  artworks: ArtworkCard[];
};

export function RealisationsMasonry({ artworks }: Props) {
  return (
    <section
      id="realisations"
      className="scroll-mt-6 bg-[#f8fafc] px-5 py-20 md:px-10 md:py-28"
    >
      <header className="mx-auto mb-14 max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-[#10b981]">
          Les ramifications
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#064e3b] md:text-4xl">
          Réalisations
        </h2>
        <p className="mt-3 max-w-2xl text-[#064e3b]/70">
          Peintures, photographies, vidéos, design — une grille vivante, sans
          hiérarchie figée.
        </p>
      </header>

      {artworks.length === 0 ? (
        <p className="mx-auto max-w-6xl text-center text-[#064e3b]/55">
          Les œuvres apparaîtront ici une fois publiées dans Sanity.
        </p>
      ) : (
        <div className="mx-auto max-w-7xl columns-1 gap-5 sm:columns-2 lg:columns-3 xl:gap-6">
          {artworks.map((a, i) => {
            const img = urlForImage(a.mainImage);
            return (
              <article
                key={a._id}
                className="mb-5 break-inside-avoid xl:mb-6"
              >
                <Link
                  href={`/realisations/${a.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-[#064e3b]/08 bg-white/50 shadow-sm shadow-[#064e3b]/05 transition hover:border-[#10b981]/35 hover:shadow-md hover:shadow-[#10b981]/10"
                >
                  <div className="relative w-full overflow-hidden bg-[#064e3b]/5">
                    {img ? (
                      <Image
                        src={img}
                        alt=""
                        width={800}
                        height={1100}
                        className={`h-auto w-full object-cover transition duration-700 group-hover:scale-[1.02] ${
                          i % 3 === 0 ? "min-h-[14rem]" : i % 3 === 1 ? "min-h-[11rem]" : "min-h-[12rem]"
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : a.mainVideoUrl ? (
                      <div className="flex aspect-[4/5] items-center justify-center bg-[#064e3b]/80 text-sm text-[#f8fafc]/80">
                        Vidéo
                      </div>
                    ) : null}
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="font-display text-base font-semibold text-[#064e3b] group-hover:text-[#10b981]">
                      {a.title}
                    </h3>
                    {a.author?.name ? (
                      <p className="mt-1 text-xs text-[#064e3b]/50">
                        {a.author.name}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
