"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const MINT = "rgba(158, 217, 190, 0.5)";

const HERO_BODY =
  "Nous explorons ensemble des expositions, rencontres et un flux d’images et de mots — sans cloisonner la création. Le collectif est un territoire commun où l’art se nourrit de présence, de partage et de fragments vivants.";

/** Vitrine typographique du collectif — prolonge la toile globale sans fond en « bloc ». */
export function InformelHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[min(100svh,56rem)] overflow-hidden px-6 pb-20 pt-24 md:min-h-[90svh] md:px-14 md:pb-28 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 80% 60% at 25% 20%, ${MINT} 0%, transparent 55%),
            radial-gradient(ellipse 45% 35% at 90% 80%, rgba(110, 231, 183, 0.07) 0%, transparent 50%)`,
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full text-[color:var(--accent-mint)]/12"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.07}
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
        className="relative z-10 mx-auto flex min-h-[min(78svh,40rem)] max-w-4xl flex-col justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="mb-8 font-display text-xs font-medium uppercase tracking-[0.45em] text-[color:var(--accent-mint)]/90 md:text-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Collectif Mycélium
        </motion.p>

        <motion.h1
          className="font-display text-[clamp(2.25rem,7vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-[color:var(--text-primary)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Un territoire commun où l’art se nourrit de{" "}
          <span className="text-[color:var(--accent-spring)]">présence</span>, de
          partage et de fragments vivants.
        </motion.h1>

        <motion.p
          className="mt-10 max-w-2xl text-xl leading-relaxed text-[color:var(--text-muted)] md:text-2xl md:leading-snug"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.85 }}
        >
          {HERO_BODY}
        </motion.p>

        <motion.div
          className="mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88, duration: 0.7 }}
        >
          <Link
            href="#agenda"
            className="rounded-full border border-[color:var(--accent-mint)]/35 bg-[color:var(--accent-mint)]/8 px-8 py-3.5 text-center text-sm font-medium text-[color:var(--text-primary)] backdrop-blur-[2px] transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[color:var(--accent-spring)]/50 hover:bg-[color:var(--accent-mint)]/14 hover:shadow-lg hover:shadow-[color:var(--accent-mint)]/15 active:scale-[0.98]"
          >
            Agenda
          </Link>
          <Link
            href="#flux"
            className="rounded-full border border-white/12 px-8 py-3.5 text-center text-sm font-medium text-[color:var(--text-muted)] transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/25 hover:bg-white/[0.05] hover:text-[color:var(--text-primary)] active:scale-[0.98]"
          >
            Le flux
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
