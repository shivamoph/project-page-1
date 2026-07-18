"use client";

import { motion } from "framer-motion";

export function Section({
  title,
  children,
  eyebrow
}: {
  title: string;
  children: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-500">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-semibold text-slate-800 sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}
