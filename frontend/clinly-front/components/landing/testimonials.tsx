"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Ricardo Almeida",
    role: "Diretor Médico",
    company: "Clínica Saúde+",
    content:
      "O Clinly revolucionou nossa gestão. Reduzimos faltas em 50% e o tempo administrativo caiu pela metade. Equipe adora a interface.",
    rating: 5,
  },
  {
    name: "Ana Carolina Silva",
    role: "Gerente Administrativa",
    company: "Hospital Vida",
    content:
      "Implementamos o Clinly em 3 dias. O suporte é excepcional e a plataforma é intuitiva demais. Não imaginamos mais sem ele.",
    rating: 5,
  },
  {
    name: "Dr. Marcos Oliveira",
    role: "Médico Cardiologista",
    company: "MedCenter",
    content:
      "Finalmente um sistema que entende as necessidades do médico. Prontuário rápido, agenda inteligente e relatórios que fazem sentido.",
    rating: 5,
  },
  {
    name: "Patricia Costa",
    role: "CEO",
    company: "Vitalis",
    content:
      "Com 5 unidades, o Clinly centralizou tudo. Dashboard em tempo real, controle de equipe e relatórios financeiros impecáveis.",
    rating: 5,
  },
  {
    name: "Dr. Fernando Santos",
    role: "Dermatologista",
    company: "Skin Clinic",
    content:
      "A experiência do paciente melhorou drasticamente. Check-in digital, lembretes automáticos e portal do paciente são incríveis.",
    rating: 5,
  },
  {
    name: "Juliana Ferreira",
    role: "Coordenadora de Enfermagem",
    company: "Grupo Médico",
    content:
      "Organização impecável. Escalas, prontuários e comunicação entre a equipe ficaram muito mais eficientes com o Clinly.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-[#2563EB]">Depoimentos</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Amados por profissionais de saúde
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Veja o que nossos clientes dizem sobre a experiência de usar o Clinly
            no dia a dia da clínica.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-[#2563EB]/5"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback>
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} — {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
