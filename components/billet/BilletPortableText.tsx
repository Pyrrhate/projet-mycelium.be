import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

import { urlForImage } from "@/lib/sanity/image";
import { VideoEmbed } from "@/lib/media/videoEmbed";
import type { BilletContentItem } from "@/types/sanity";

type Props = {
  value: BilletContentItem[];
  className?: string;
};

export function BilletPortableText({ value, className }: Props) {
  const components: PortableTextComponents = {
    types: {
      bodyImage: ({ value: v }) => {
        if (!v?.image) return null;
        const src = urlForImage(v.image);
        if (!src) return null;
        return (
          <figure className="my-8">
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/25">
              <Image
                src={src}
                alt={v.alt ?? ""}
                width={1200}
                height={900}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 42rem"
              />
            </div>
            {v.caption ? (
              <figcaption className="mt-2 text-center text-sm text-[color:var(--text-subtle)]">
                {v.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      bodyVideo: ({ value: v }) => {
        if (!v?.url) return null;
        return (
          <figure className="my-8">
            <VideoEmbed url={v.url} title={v.caption} />
            {v.caption ? (
              <figcaption className="mt-2 text-center text-sm text-[color:var(--text-subtle)]">
                {v.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
    },
    block: {
      normal: ({ children }) => (
        <p className="mb-4 text-pretty leading-relaxed last:mb-0">{children}</p>
      ),
      h2: ({ children }) => (
        <h2 className="font-display mt-10 mb-4 text-2xl font-semibold text-[color:var(--text-primary)] first:mt-0">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-display mt-8 mb-3 text-xl font-semibold text-[color:var(--text-primary)]">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-2 border-[color:var(--accent-mint)]/45 pl-5 text-lg italic text-[color:var(--text-muted)]">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ value, children }) => (
        <a
          href={value?.href}
          className="font-medium text-[color:var(--accent-spring)] underline underline-offset-4 decoration-[color:var(--accent-mint)]/40"
          rel="noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold text-[color:var(--text-primary)]">
          {children}
        </strong>
      ),
      em: ({ children }) => <em>{children}</em>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-4 list-disc space-y-1 pl-6">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 list-decimal space-y-1 pl-6">{children}</ol>
      ),
    },
  };

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
