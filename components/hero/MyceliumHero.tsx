"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

const GLOW = "#10b981";

const NODES: { x: number; y: number }[] = [
  { x: 8, y: 22 },
  { x: 22, y: 12 },
  { x: 38, y: 28 },
  { x: 55, y: 10 },
  { x: 72, y: 24 },
  { x: 88, y: 18 },
  { x: 48, y: 45 },
  { x: 28, y: 55 },
  { x: 65, y: 58 },
  { x: 15, y: 72 },
  { x: 78, y: 72 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [2, 6],
  [6, 7],
  [7, 8],
  [6, 8],
  [7, 9],
  [8, 10],
  [9, 10],
  [0, 7],
  [4, 8],
];

function lineKey(a: number, b: number) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

export function MyceliumHero() {
  const viewBox = "0 0 100 100";

  const paths = useMemo(
    () =>
      EDGES.map(([from, to]) => {
        const A = NODES[from];
        const B = NODES[to];
        if (!A || !B) return null;
        return {
          key: lineKey(from, to),
          d: `M ${A.x} ${A.y} L ${B.x} ${B.y}`,
        };
      }).filter(Boolean) as { key: string; d: string }[],
    [],
  );

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#064e3b]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${GLOW}55 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, ${GLOW}33 0%, transparent 45%)`,
          }}
        />
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="vine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GLOW} stopOpacity="0.15" />
            <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.35" />
            <stop offset="100%" stopColor={GLOW} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {paths.map((p, i) => (
          <motion.path
            key={p.key}
            d={p.d}
            fill="none"
            stroke="url(#vine)"
            strokeWidth={0.16}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2.2,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={`${n.x}-${n.y}`}
            cx={n.x}
            cy={n.y}
            r={0.55}
            fill={GLOW}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ delay: 0.8 + i * 0.05, type: "spring", stiffness: 120 }}
          />
        ))}
      </svg>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-center px-6 py-24 md:px-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#10b981]/90">
          Projet Mycélium
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#f8fafc] md:text-6xl md:leading-[1.08]">
          Un réseau vivant&nbsp;:{" "}
          <span className="text-[#10b981]">connexions</span>, idées et
          symbiose numérique.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#f8fafc]/80 md:text-xl">
          Vitrine immersive du collectif — biomimétisme, nœuds de savoir et
          collaboration ouverte.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="#reseau"
            className="rounded-full border border-[#10b981]/40 bg-[#10b981]/15 px-6 py-3 text-sm font-medium text-[#f8fafc] backdrop-blur-sm transition hover:border-[#10b981] hover:bg-[#10b981]/25"
          >
            Explorer le réseau
          </Link>
          <Link
            href="/studio"
            className="rounded-full border border-[#f8fafc]/20 px-6 py-3 text-sm font-medium text-[#f8fafc]/90 transition hover:border-[#f8fafc]/50"
          >
            Espace collaboration
          </Link>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#064e3b] to-transparent" />
    </section>
  );
}
