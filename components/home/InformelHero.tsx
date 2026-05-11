"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const H = "#10b981";

/** Entrée immersive « L’informel » : ramifications douces, sans navigation sociale. */
export function InformelHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#064e3b]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 70% 50% at 20% 30%, ${H}44 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 80% 70%, ${H}33 0%, transparent 50%)`,
        }}
      />

      {/* Filaments organiques */}
      <svg
        className="absolute inset-0 h-full w-full text-[#10b981]/20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.08}
            strokeLinecap="round"
            d={`M ${10 + i * 18} 100 Q ${30 + i * 12} ${55 - i * 8}, ${50 + i * 5} ${25 + i * 6} T ${85 - i * 3} 0`}
            initial={reduceMotion ? { opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            animate={reduceMotion ? {} : { pathLength: 1, opacity: 0.55 }}
            transition={{
              duration: 2.8 + i * 0.25,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </svg>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-6 pb-32 pt-24 md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="mb-6 font-display text-xs font-medium uppercase tracking-[0.4em] text-[#10b981]/85 md:text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          L’informel
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.12] tracking-tight text-[#f8fafc]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          Ici, rien d’imposé&nbsp;: des filaments, des œuvres, des textes. Une{" "}
          <span className="text-[#10b981]">symbiose</span> tranquille entre
          regards et mots.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-[#f8fafc70] md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
        >
          Explorez sans carte. Ce qui pousse ici appartient au collectif — en
          ramifications visuelles et éditoriales.
        </motion.p>

        <motion.div
          className="mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <Link
            href="#realisations"
            className="rounded-full border border-[#10b981]/45 bg-[#10b981]/10 px-7 py-3 text-center text-sm font-medium text-[#f8fafc] transition hover:border-[#10b981] hover:bg-[#10b981]/20"
          >
            Voir les réalisations
          </Link>
          <Link
            href="#ecrits"
            className="rounded-full border border-[#f8fafc]/15 px-7 py-3 text-center text-sm font-medium text-[#f8fafc]/90 transition hover:border-[#f8fafc]/35"
          >
            Lire les écrits
          </Link>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-10 left-1/2 w-full max-w-3xl -translate-x-1/2 px-6 text-center md:px-10"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.35em] text-[#f8fafc]/45"
            animate={
              reduceMotion
                ? {}
                : { y: [0, 6, 0], opacity: [0.45, 0.85, 0.45] }
            }
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            découvrir
          </motion.span>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#10b981]/15" aria-hidden />
    </section>
  );
}
