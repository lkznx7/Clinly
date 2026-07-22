"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  {
    title: "Reduza faltas em até 60%",
    description:
      "Lembretes automáticos por SMS e email garantem que seus pacientes não esqueçam das consultas.",
  },
  {
    title: "Economize 15 horas por semana",
    description:
      "Automatize tarefas administrativas como agendamento, prontuário e relatórios financeiros.",
  },
  {
    title: "Aumente a receita em 30%",
    description:
      "Otimize a agenda, reduza horários vagos e identifique oportunidades de crescimento.",
  },
  {
    title: "Satisfação do paciente 5x maior",
    description:
      "Check-in digital, portal do paciente e comunicação automatizada transformam a experiência.",
  },
];

const items = [
  "Agendamento online 24/7",
  "Prontuário eletrônico completo",
  "Relatórios financeiros automáticos",
  "Gestão multi-unidades",
  "Suporte dedicado 24/7",
  "Integração com laboratórios",
  "Backup automático diário",
  "Atualizações gratuitas",
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-[#2563EB]">Benefícios</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Resultados que você pode sentir
            </h2>
            <p className="mt-4 text-muted-foreground">
              Nossos clientes relatam melhorias significativas em produtividade,
              satisfação do paciente e receita clínica.
            </p>

            <div className="mt-8 space-y-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-border hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border/50 bg-card p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Tudo incluso, sem surpresas
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Um plano que cabe no seu bolso com todas as funcionalidades.
              </p>

              <div className="mt-8 space-y-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10">
                      <Check className="size-3 text-[#2563EB]" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
