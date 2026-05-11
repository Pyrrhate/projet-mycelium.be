import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorAttribution } from "@/components/content/AuthorAttribution";
import { getClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { writingBySlugQuery, writingSlugsQuery } from "@/lib/sanity/queries";
import type { WritingDetail } from "@/types/sanity";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 30;

export async function generateStaticParams() {
  const client = getClient();
  if (!client) return [];
  const rows = await client.fetch<{ slug: string }[]>(writingSlugsQuery);
  return rows.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) return { title: "Écrit" };
  const doc = await client.fetch<{ title: string } | null>(
    `*[_type == "writing" && slug.current == $slug][0]{ title }`,
    { slug },
  );
  if (!doc) return { title: "Écrit introuvable" };
  return { title: doc.title };
}

export default async function EcritPage({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) notFound();

  const writing = await client.fetch<WritingDetail | null>(writingBySlugQuery, {
    slug,
  });
  if (!writing) notFound();

  const hero = urlForImage(writing.heroIllustration);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#064e3b]">
      <header className="border-b border-[#064e3b]/08 bg-[#f8fafc]/90 px-5 py-5 backdrop-blur md:px-10">
        <Link
          href="/#ecrits"
          className="text-sm text-[#10b981] transition hover:underline"
        >
          ← Écrits
        </Link>
      </header>

      <article className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16">
        {hero ? (
          <div className="relative mb-12 aspect-[2/1] w-full overflow-hidden rounded-lg border border-[#064e3b]/08 md:aspect-[21/9]">
            <Image
              src={hero}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 42rem"
            />
          </div>
        ) : null}

        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight">
          {writing.title}
        </h1>

        <div className="mt-6">
          <AuthorAttribution author={writing.author} />
        </div>

        {writing.content && writing.content.length > 0 ? (
          <div className="prose-mycelium mt-12 space-y-4 text-[1.07rem] leading-[1.75] text-[#064e3b]/90">
            <PortableText
              value={writing.content}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-4 text-pretty first:mt-0">{children}</p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-display mt-12 mb-4 text-2xl font-semibold text-[#064e3b] first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-display mt-8 mb-3 text-xl font-semibold text-[#064e3b]">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-2 border-[#10b981]/50 pl-5 text-lg italic text-[#064e3b]/80">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      className="font-medium text-[#10b981] underline underline-offset-4 decoration-[#10b981]/40 hover:decoration-[#10b981]"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {children}
                    </a>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="my-4 list-disc space-y-1 pl-6">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="my-4 list-decimal space-y-1 pl-6">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          </div>
        ) : null}
      </article>
    </div>
  );
}
