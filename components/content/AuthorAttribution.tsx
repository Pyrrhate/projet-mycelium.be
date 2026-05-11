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
      <p className="text-sm text-[#064e3b]/65">
        Une ramification nourrie par{" "}
        <button
          type="button"
          id={labelId}
          className="border-b border-[#10b981]/40 font-medium text-[#064e3b] decoration-transparent transition hover:border-[#10b981] hover:text-[#10b981]"
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
              className="fixed inset-0 z-40 bg-[#064e3b]/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-labelledby={labelId}
              className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#10b981]/25 bg-[#f8fafc] p-6 shadow-2xl shadow-[#064e3b]/15"
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
                    className="h-[5.5rem] w-[5.5rem] rounded-full object-cover ring-2 ring-[#10b981]/30"
                  />
                ) : (
                  <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-[#064e3b]/10 text-xl font-semibold text-[#064e3b]/70">
                    {author.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <p className="mt-4 font-display text-lg font-semibold text-[#064e3b]">
                  {author.name}
                </p>
                {author.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-[#064e3b]/75">
                    {author.bio}
                  </p>
                ) : (
                  <p className="mt-3 text-sm italic text-[#064e3b]/45">
                    Membre du collectif.
                  </p>
                )}
                <button
                  type="button"
                  className="mt-5 text-xs font-medium uppercase tracking-wider text-[#10b981] hover:underline"
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
