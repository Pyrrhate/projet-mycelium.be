"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { urlForImage } from "@/lib/sanity/image";
import type { MemberWithNodes } from "@/types/sanity";

type Props = {
  members: MemberWithNodes[];
};

function formatDate(iso: string) {
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

export function MemberNetwork({ members }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (members.length === 0) {
    return (
      <section
        id="reseau"
        className="border-t border-[#10b981]/15 bg-[#f8fafc] px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-5xl text-center">
          <Users className="mx-auto mb-4 h-10 w-10 text-[#064e3b]/40" aria-hidden />
          <h2 className="text-2xl font-semibold text-[#064e3b]">Le Réseau</h2>
          <p className="mt-3 text-[#064e3b]/70">
            Aucun membre pour l’instant. Configurez{" "}
            <code className="rounded bg-[#064e3b]/10 px-1.5 py-0.5 text-sm">
              .env.local
            </code>{" "}
            avec Sanity, puis ajoutez des membres depuis le Studio.
          </p>
          <Link
            href="/studio"
            className="mt-6 inline-block rounded-full bg-[#064e3b] px-5 py-2.5 text-sm font-medium text-[#f8fafc] transition hover:bg-[#065f46]"
          >
            Ouvrir le Studio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reseau"
      className="border-t border-[#10b981]/15 bg-[#f8fafc] px-6 py-24 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[#064e3b] md:text-4xl">
            Le Réseau
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[#064e3b]/75">
            Sept nœuds, une colonie — survolez un membre pour voir ses
            dernières contributions.
          </p>
        </motion.div>

        <ul className="mt-16 flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {members.map((member, index) => {
            const isActive = activeId === member._id;
            const avatarUrl = urlForImage(member.avatar);
            return (
              <li key={member._id} className="relative list-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                  onMouseEnter={() => setActiveId(member._id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(member._id)}
                  onBlur={() => setActiveId(null)}
                  className="group relative"
                >
                  <Link
                    href={`/membre/${member.slug}`}
                    className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#10b981]/35 bg-[#064e3b]/5 shadow-[0_0_0_1px_rgba(16,185,129,0.08)] outline-none ring-offset-2 transition hover:border-[#10b981] hover:shadow-[0_0_28px_rgba(16,185,129,0.25)] focus-visible:ring-2 focus-visible:ring-[#10b981] md:h-32 md:w-32"
                  >
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-semibold text-[#064e3b]/60">
                        {member.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <span className="absolute -bottom-8 left-1/2 max-w-[10rem] -translate-x-1/2 text-center text-xs font-medium text-[#064e3b]/85 md:text-sm">
                      {member.name}
                    </span>
                  </Link>

                  <AnimatePresence>
                    {isActive && (
                      <motion.aside
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute left-1/2 top-full z-20 mt-10 w-64 -translate-x-1/2 rounded-xl border border-[#10b981]/25 bg-[#f8fafc] p-4 text-left shadow-xl shadow-[#064e3b]/10"
                      >
                        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#10b981]">
                          Dernières contributions
                        </p>
                        {(member.recentNodes?.length ?? 0) === 0 ? (
                          <p className="mt-2 text-sm text-[#064e3b]/60">
                            Pas encore de nœud publié.
                          </p>
                        ) : (
                          <ul className="mt-2 space-y-2">
                            {member.recentNodes!.map((n) => (
                              <li key={n._id}>
                                <span className="block text-sm font-medium text-[#064e3b]">
                                  {n.title}
                                </span>
                                <span className="text-xs text-[#064e3b]/55">
                                  {formatDate(n._updatedAt)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.aside>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
