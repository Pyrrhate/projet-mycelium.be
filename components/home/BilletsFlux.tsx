import Image from "next/image";
import Link from "next/link";

import { inferFluxVariant } from "@/lib/billet/inferFluxVariant";
import { VideoEmbed } from "@/lib/media/videoEmbed";
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

const CARD_SHELL =
  "group block w-full break-inside-avoid rounded-2xl border border-white/[0.09] bg-white/[0.03] p-1 transition-all duration-300 ease-out hover:border-[color:var(--accent-mint)]/32 hover:bg-white/[0.055] hover:shadow-xl hover:shadow-black/25";

function BilletCard({ b }: { b: BilletFluxItem }) {
  const variant: FluxVariant =
    b.previewLayout ?? inferFluxVariant(b.content, b.previewText);
  const imgUrl =
    b.demoImageUrl ||
    (b.firstImage?.image ? urlForImage(b.firstImage.image) : null);
  const imgAlt =
    b.demoImageAlt ?? b.firstImage?.alt ?? "";
  const prev = b.previewText ? excerpt(b.previewText, 220) : "";
  const videoUrl = b.demoEmbedVideoUrl ?? b.firstVideo?.url ?? null;

  const inner = (
    <>
      {(variant === "image-hero" || variant === "image-featured") && imgUrl ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:aspect-[16/10]">
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 22rem"
          />
        </div>
      ) : null}

      {variant === "video-hero" && videoUrl ? (
        <div className="p-2">
          <VideoEmbed
            url={videoUrl}
            title={b.title ?? "Vidéo"}
            className="rounded-xl"
          />
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
        ) : null}
        {b.author?.name ? (
          <p className="mt-2 text-xs text-[color:var(--text-subtle)]">
            {b.author.name}
          </p>
        ) : null}

        {variant !== "image-hero" &&
        variant !== "image-featured" &&
        prev &&
        variant !== "video-hero" ? (
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

        {variant === "video-hero" && prev ? (
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
            {excerpt(prev, 280)}
          </p>
        ) : null}

        {(variant === "mixed" || variant === "text-long") && imgUrl ? (
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg border border-white/[0.06]">
            <Image
              src={imgUrl}
              alt={imgAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 28rem"
            />
          </div>
        ) : null}

        {b.isStaticDemo ? (
          <span className="mt-5 inline-block text-xs uppercase tracking-wider text-[color:var(--text-subtle)]">
            Exemple de mise en page
          </span>
        ) : (
          <span className="mt-5 inline-block text-sm font-medium text-[color:var(--accent-mint)] group-hover:underline">
            Ouvrir le billet
          </span>
        )}
      </div>
    </>
  );

  if (b.isStaticDemo) {
    return (
      <article className={`${CARD_SHELL} mb-8 cursor-default`}>{inner}</article>
    );
  }

  return (
    <Link
      href={`/billet/${b.slug}`}
      className={`${CARD_SHELL} mb-8`}
    >
      {inner}
    </Link>
  );
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
        <p className="mx-auto mt-16 max-w-md text-center font-display text-lg text-[color:var(--text-muted)]">
          Le fil accueillera vos billets dès leur publication.
        </p>
      ) : (
        <div className="mx-auto mt-14 max-w-6xl columns-1 gap-x-8 [column-fill:_balance] sm:columns-2">
          {billets.map((b) => (
            <BilletCard key={b._id} b={b} />
          ))}
        </div>
      )}
    </section>
  );
}
