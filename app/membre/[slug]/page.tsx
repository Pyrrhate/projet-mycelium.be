import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { memberBySlugQuery, memberSlugsQuery } from "@/lib/sanity/queries";
import type { MemberProfile } from "@/types/sanity";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 30;

export async function generateStaticParams() {
  const client = getClient();
  if (!client) return [];
  const rows = await client.fetch<{ slug: string }[]>(memberSlugsQuery);
  return rows.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) {
    return { title: "Membre — Mycélium" };
  }
  const member = await client.fetch<MemberProfile | null>(memberBySlugQuery, {
    slug,
  });
  if (!member) return { title: "Membre introuvable" };
  return {
    title: `${member.name} — Mycélium`,
    description: member.bio ?? `Profil et jardin de contenus de ${member.name}.`,
  };
}

export default async function MembrePage({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) notFound();

  const member = await client.fetch<MemberProfile | null>(memberBySlugQuery, {
    slug,
  });
  if (!member) notFound();

  const avatarUrl = urlForImage(member.avatar);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#064e3b]">
      <header className="border-b border-[#10b981]/20 bg-[#064e3b] px-6 py-6 text-[#f8fafc] md:px-10">
        <Link
          href="/"
          className="text-sm font-medium text-[#10b981] transition hover:text-[#34d399]"
        >
          ← Accueil
        </Link>
        <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={member.name}
              width={120}
              height={120}
              className="h-28 w-28 rounded-full border-2 border-[#10b981]/40 object-cover shadow-lg shadow-[#10b981]/10"
              priority
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#10b981]/40 bg-[#064e3b]/50 text-3xl font-semibold text-[#f8fafc]/80">
              {member.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {member.name}
            </h1>
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="mt-2 inline-block text-sm text-[#10b981] hover:underline"
              >
                {member.email}
              </a>
            ) : null}
            {member.bio ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#f8fafc]/80">
                {member.bio}
              </p>
            ) : null}
            {member.links && member.links.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-3">
                {member.links.map((link) =>
                  link.url ? (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[#f8fafc]/25 px-3 py-1 text-xs text-[#f8fafc]/90 transition hover:border-[#10b981]"
                      >
                        {link.label ?? link.url}
                      </a>
                    </li>
                  ) : null,
                )}
              </ul>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-14 md:px-10">
        <h2 className="text-xl font-semibold text-[#064e3b]">
          Jardin de contenus
        </h2>
        <p className="mt-2 text-sm text-[#064e3b]/65">
          Nœuds liés à ce membre dans le réseau.
        </p>

        {(member.nodes?.length ?? 0) === 0 ? (
          <p className="mt-10 text-[#064e3b]/60">
            Aucun contenu pour l’instant.
          </p>
        ) : (
          <ul className="mt-10 space-y-12">
            {member.nodes!.map((node) => {
              const img = urlForImage(node.mainImage);
              return (
                <li
                  key={node._id}
                  className="rounded-2xl border border-[#064e3b]/10 bg-white/60 p-6 shadow-sm shadow-[#064e3b]/5 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold text-[#064e3b]">
                    {node.title}
                  </h3>
                  {node.tags && node.tags.length > 0 ? (
                    <p className="mt-2 text-xs text-[#10b981]">
                      {node.tags.join(" · ")}
                    </p>
                  ) : null}
                  {img ? (
                    <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#064e3b]/10">
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 48rem"
                      />
                    </div>
                  ) : null}
                  {node.content && node.content.length > 0 ? (
                    <div className="portable-text mt-4 space-y-3 text-sm leading-relaxed text-[#064e3b]/90">
                      <PortableText
                        value={node.content}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="mt-2 first:mt-0">{children}</p>
                            ),
                            h2: ({ children }) => (
                              <h4 className="mt-4 text-base font-semibold text-[#064e3b] first:mt-0">
                                {children}
                              </h4>
                            ),
                            h3: ({ children }) => (
                              <h5 className="mt-3 text-sm font-semibold text-[#064e3b]">
                                {children}
                              </h5>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-[#10b981]/50 pl-4 text-[#064e3b]/80 italic">
                                {children}
                              </blockquote>
                            ),
                          },
                          marks: {
                            link: ({ value, children }) => (
                              <a
                                href={value?.href}
                                className="font-medium text-[#10b981] underline underline-offset-2"
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {children}
                              </a>
                            ),
                          },
                          list: {
                            bullet: ({ children }) => (
                              <ul className="list-inside list-disc space-y-1 pl-1">
                                {children}
                              </ul>
                            ),
                            number: ({ children }) => (
                              <ol className="list-inside list-decimal space-y-1 pl-1">
                                {children}
                              </ol>
                            ),
                          },
                        }}
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
