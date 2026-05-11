import { AuthorAttribution } from "@/components/content/AuthorAttribution";
import { getClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import {
  artworkBySlugQuery,
  artworkSlugsQuery,
} from "@/lib/sanity/queries";
import type { ArtworkDetail } from "@/types/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 30;

export async function generateStaticParams() {
  const client = getClient();
  if (!client) return [];
  const rows = await client.fetch<{ slug: string }[]>(artworkSlugsQuery);
  return rows.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) return { title: "Réalisation" };
  const doc = await client.fetch<Pick<ArtworkDetail, "title"> | null>(
    `*[_type == "artwork" && slug.current == $slug][0]{ title }`,
    { slug },
  );
  if (!doc) return { title: "Réalisation introuvable" };
  return { title: doc.title };
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) notFound();

  const artwork = await client.fetch<ArtworkDetail | null>(artworkBySlugQuery, {
    slug,
  });
  if (!artwork) notFound();

  const mainImg = urlForImage(artwork.mainImage);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#064e3b]">
      <header className="border-b border-[#064e3b]/08 bg-[#f8fafc]/90 px-5 py-5 backdrop-blur md:px-10">
        <Link
          href="/#realisations"
          className="text-sm text-[#10b981] transition hover:underline"
        >
          ← Réalisations
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12 md:px-10 md:py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {artwork.title}
        </h1>
        <div className="mt-4">
          <AuthorAttribution author={artwork.author} />
        </div>

        <div className="mt-10 space-y-8">
          {artwork.mainVideoUrl ? (
            <video
              src={artwork.mainVideoUrl}
              controls
              playsInline
              className="w-full rounded-2xl border border-[#064e3b]/10 bg-black/5"
            />
          ) : null}
          {mainImg ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#064e3b]/10 bg-[#064e3b]/5">
              <Image
                src={mainImg}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 52rem"
                priority
              />
            </div>
          ) : null}

          {artwork.gallery && artwork.gallery.length > 0 ? (
            <div className="columns-1 gap-4 sm:columns-2">
              {artwork.gallery.map((g, i) => {
                const u = urlForImage(g);
                if (!u) return null;
                return (
                  <div
                    key={`${artwork._id}-g-${i}`}
                    className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[#064e3b]/08"
                  >
                    <Image
                      src={u}
                      alt=""
                      width={900}
                      height={700}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                );
              })}
            </div>
          ) : null}

          {artwork.description ? (
            <div className="max-w-prose whitespace-pre-wrap text-[#064e3b]/85 leading-relaxed">
              {artwork.description}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
