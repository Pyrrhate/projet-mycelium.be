"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useId, useState } from "react";

import { urlForImage } from "@/lib/sanity/image";
import type { MemberAuthor } from "@/types/sanity";

type Props = {
  author: MemberAuthor | null | undefined;
};

export function AuthorAttribution({ author }: Props) {
  const [open, setOpen] = useState(false);
  const labelId = useId();

  if (!author?.name) return null;

  const avatarUrl = urlForImage(author.avatar);

  return (
    <>
      <p className="text-sm text-[color:var(--text-subtle)]">
        Une ramification nourrie par{" "}
        <button
          type="button"
          id={labelId}
          className="border-b border-[color:var(--accent-mint)]/40 font-medium text-[color:var(--text-primary)] decoration-transparent transition hover:border-[color:var(--accent-spring)] hover:text-[color:var(--accent-spring)]"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          {author.name}
        </button>
        .
      </p>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Fermer"
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-labelledby={labelId}
              className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.12] bg-[color:var(--canvas-ink)]/92 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.94, y: "-48%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.96, y: "-48%" }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="flex flex-col items-center text-center">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt=""
                    width={88}
                    height={88}
                    className="h-[5.5rem] w-[5.5rem] rounded-full object-cover ring-2 ring-[color:var(--accent-mint)]/35"
                  />
                ) : (
                  <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-white/[0.06] text-xl font-semibold text-[color:var(--text-muted)]">
                    {author.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <p className="mt-4 font-display text-lg font-semibold text-[color:var(--text-primary)]">
                  {author.name}
                </p>
                {author.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
                    {author.bio}
                  </p>
                ) : (
                  <p className="mt-3 text-sm italic text-[color:var(--text-subtle)]">
                    Membre du collectif.
                  </p>
                )}
                <button
                  type="button"
                  className="mt-5 text-xs font-medium uppercase tracking-wider text-[color:var(--accent-mint)] hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
