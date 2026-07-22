"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Clínica Saúde+" },
  { name: "Hospital Vida" },
  { name: "MedCenter" },
  { name: "Vitalis" },
  { name: "Saúde & Bem-Estar" },
  { name: "Grupo Médico" },
];

export function LogosSection() {
  return (
    <section className="border-y border-border/30 bg-muted/20 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground"
        >
          Confiado por clínicas e profissionais de saúde em todo o Brasil
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="text-sm font-medium text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {logo.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
