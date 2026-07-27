"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quanto tempo leva para implementar o Clinly?",
    answer:
      "A implementação leva em média 3 a 5 dias úteis. Nosso time de sucesso do cliente ajuda em todas as etapas, desde a configuração inicial até a capacitação da equipe.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Utilizamos criptografia AES-256 para todos os dados, backups automáticos diários, e seguimos rigorosamente a LGPD. Seus dados ficam em servidores brasileiros com certificação ISO 27001.",
  },
  {
    question: "Posso acessar de qualquer dispositivo?",
    answer:
      "Sim! O Clinly é uma plataforma web responsiva que funciona perfeitamente em desktop, tablet e smartphone. Não é necessário instalar nenhum aplicativo.",
  },
  {
    question: "Existe limite de pacientes ou consultas?",
    answer:
      "Não. Todos os planos incluem pacientes e consultas ilimitados. Você paga apenas pelo número de profissionais ativos na plataforma.",
  },
  {
    question: "Vocês oferecem treinamento para a equipe?",
    answer:
      "Sim! Incluímos treinamento online ao vivo para toda a equipe, materiais de apoio, vídeos tutoriais e suporte contínuo por chat e email.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim, sem multa nem burocracia. Você pode cancelar a assinatura a qualquer momento pela própria plataforma e seus dados ficam disponíveis para exportação por 30 dias.",
  },
  {
    question: "O Clinly se integra com outros sistemas?",
    answer:
      "Sim, oferecemos integração com principais laboratórios, convênios, sistemas de faturamento e ERPs. Nossa API aberta permite integrações personalizadas.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="border-t border-border/30 bg-muted/20 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-[#2563EB]">Perguntas Frequentes</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tire suas dúvidas
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-12"
        >
          <Accordion className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border/50 bg-card px-5"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline hover:text-[#2563EB]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
