import { BilletPortableText } from "@/components/billet/BilletPortableText";
import { AuthorAttribution } from "@/components/content/AuthorAttribution";
import { getClient } from "@/lib/sanity/client";
import { billetBySlugQuery, billetSlugsQuery } from "@/lib/sanity/queries";
import type { BilletDetail } from "@/types/sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 30;

export async function generateStaticParams() {
  const client = getClient();
  if (!client) return [];
  const rows = await client.fetch<{ slug: string }[]>(billetSlugsQuery);
  return rows.map(({ slug }) => ({ slug }));
}

function formatPub(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-BE", {
      weekday: "long",
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

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) return { title: "Billet" };
  const doc = await client.fetch<{ title: string | null } | null>(
    `*[_type == "billet" && slug.current == $slug][0]{ title }`,
    { slug },
  );
  if (!doc) return { title: "Billet introuvable" };
  return { title: doc.title?.trim() || "Billet" };
}

export default async function BilletPage({ params }: Props) {
  const { slug } = await params;
  const client = getClient();
  if (!client) notFound();

  const billet = await client.fetch<BilletDetail | null>(billetBySlugQuery, {
    slug,
  });
  if (!billet) notFound();

  return (
    <main className="relative z-10 min-h-screen text-[color:var(--text-primary)]">
      <header className="px-6 py-6 backdrop-blur-md md:px-14 md:py-7">
        <Link
          href="/#flux"
          className="text-sm text-[color:var(--accent-mint)] transition hover:underline"
        >
          ← Flux
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-6 pb-24 md:px-10 md:pb-32">
        <time
          dateTime={billet.publishedAt}
          className="text-xs uppercase tracking-wider text-[color:var(--text-subtle)]"
        >
          {formatPub(billet.publishedAt)}
        </time>

        {billet.title?.trim() ? (
          <h1 className="font-display mt-5 text-[clamp(1.85rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight">
            {billet.title}
          </h1>
        ) : (
          <h1 className="font-display mt-5 text-2xl font-normal italic text-[color:var(--text-muted)]">
            Billet sans titre
          </h1>
        )}

        <div className="mt-6">
          <AuthorAttribution author={billet.author} />
        </div>

        {billet.content && billet.content.length > 0 ? (
          <BilletPortableText
            value={billet.content}
            className="mt-12 text-[1.05rem] leading-[1.75] text-[color:var(--text-muted)]"
          />
        ) : null}
      </article>
    </main>
  );
}
