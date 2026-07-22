"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BarChart3,
  Shield,
  Bell,
  Smartphone,
  FileText,
  Clock,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Agendamento Inteligente",
    description:
      "Gerencie consultas com facilidade. Calendário visual, lembretes automáticos e evitar conflitos de horário.",
  },
  {
    icon: Users,
    title: "Gestão de Pacientes",
    description:
      "Cadastro completo, histórico médico, prontuário digital e busca instantânea entre milhares de registros.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Avançados",
    description:
      "Dashboards com KPIs em tempo real, gráficos interativos e exportação de relatórios financeiros e clínicos.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description:
      "Dados protegidos com criptografia de ponta a ponta. Compliance com LGPD e backup automático.",
  },
  {
    icon: Bell,
    title: "Notificações & Lembretes",
    description:
      "Lembretes automáticos por SMS e email. Reduza faltas em até 60% com lembretes inteligentes.",
  },
  {
    icon: Smartphone,
    title: "Multi-dispositivo",
    description:
      "Acesse de qualquer lugar. Desktop, tablet ou mobile. Interface 100% responsiva e otimizada.",
  },
  {
    icon: FileText,
    title: "Prontuário Digital",
    description:
      "Prontuário eletrônico completo com anexos, resultados de exames e histórico de atendimentos.",
  },
  {
    icon: Clock,
    title: "Controle de Equipe",
    description:
      "Gerencie médicos, enfermeiros e recepcionistas. Escalas, permissões e acompanhamento em tempo real.",
  },
  {
    icon: Zap,
    title: "Automação",
    description:
      "Automatize tarefas repetitivas. Receitas, atestados, encaminhamentos e documentos em segundos.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-[#2563EB]">Funcionalidades</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tudo que sua clínica precisa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Uma plataforma completa projetada para simplificar a gestão da sua clínica
            e melhorar a experiência dos seus pacientes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-[#2563EB]/5"
            >
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
