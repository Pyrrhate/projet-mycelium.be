import Image from "next/image";
import Link from "next/link";

import { inferFluxVariant } from "@/lib/billet/inferFluxVariant";
import { urlForImage } from "@/lib/sanity/image";
import type { BilletFluxItem, FluxVariant } from "@/types/sanity";

type Props = {
  billets: BilletFluxItem[];
};

function formatPub(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-BE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function excerpt(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

function cardLayoutClass(v: FluxVariant) {
  switch (v) {
    case "image-hero":
      return "sm:col-span-2 sm:row-span-2";
    case "video-hero":
      return "sm:col-span-2";
    case "text-long":
      return "sm:col-span-2";
    default:
      return "";
  }
}

export function BilletsFlux({ billets }: Props) {
  return (
    <section
      id="flux"
      className="relative z-10 scroll-mt-8 px-6 py-20 md:px-14 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent-mint)]">
          Flux
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] md:text-4xl">
          Billets
        </h2>
        <p className="mt-4 max-w-2xl text-[color:var(--text-muted)]">
          Actualités hybrides — texte, image, vidéo — dans un seul fil
          organique.
        </p>
      </div>

      {billets.length === 0 ? (
        <p className="mx-auto mt-14 max-w-6xl text-[color:var(--text-subtle)]">
          Les billets publiés dans Sanity composeront ce flux.
        </p>
      ) : (
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {billets.map((b) => {
            const variant = inferFluxVariant(b.content, b.previewText);
            const layout = cardLayoutClass(variant);
            const imgUrl = b.firstImage?.image
              ? urlForImage(b.firstImage.image)
              : null;
            const prev = b.previewText ? excerpt(b.previewText, 220) : "";

            return (
              <Link
                key={b._id}
                href={`/billet/${b.slug}`}
                className={`group block break-inside-avoid rounded-2xl border border-white/[0.09] bg-white/[0.03] p-1 transition hover:border-[color:var(--accent-mint)]/28 hover:bg-white/[0.05] ${layout}`}
              >
                {variant === "image-hero" || variant === "image-featured" ? (
                  imgUrl ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:aspect-[16/10]">
                      <Image
                        src={imgUrl}
                        alt={b.firstImage?.alt ?? ""}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ) : null
                ) : null}

                {variant === "video-hero" && b.firstVideo?.url ? (
                  <div className="mx-2 mt-2 flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-black/35 text-sm text-[color:var(--text-muted)]">
                    Vidéo — lecture sur la page du billet
                  </div>
                ) : null}

                <div className="px-4 py-5 sm:px-5 sm:py-6">
                  <time
                    dateTime={b.publishedAt}
                    className="text-[0.7rem] uppercase tracking-wider text-[color:var(--text-subtle)]"
                  >
                    {formatPub(b.publishedAt)}
                  </time>
                  {b.title?.trim() ? (
                    <h3 className="font-display mt-2 text-xl font-semibold leading-snug text-[color:var(--text-primary)] group-hover:text-[color:var(--accent-spring)]">
                      {b.title}
                    </h3>
                  ) : (
                    <h3 className="font-display mt-2 text-sm font-normal italic text-[color:var(--text-subtle)]">
                      Sans titre
                    </h3>
                  )}
                  {b.author?.name ? (
                    <p className="mt-2 text-xs text-[color:var(--text-subtle)]">
                      {b.author.name}
                    </p>
                  ) : null}

                  {variant !== "image-hero" &&
                  variant !== "image-featured" &&
                  prev ? (
                    <p
                      className={`mt-4 leading-relaxed text-[color:var(--text-muted)] ${
                        variant === "text-long"
                          ? "font-display text-lg md:text-xl md:leading-relaxed"
                          : "text-sm md:text-base"
                      }`}
                    >
                      {variant === "text-long" ? excerpt(prev, 400) : prev}
                    </p>
                  ) : null}

                  {(variant === "mixed" || variant === "text-long") && imgUrl ? (
                    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg border border-white/[0.06]">
                      <Image
                        src={imgUrl}
                        alt={b.firstImage?.alt ?? ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 28rem"
                      />
                    </div>
                  ) : null}

                  <span className="mt-5 inline-block text-sm font-medium text-[color:var(--accent-mint)] group-hover:underline">
                    Ouvrir le billet
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
