"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[#2563EB] px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pronto para transformar sua clínica?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
              Comece gratuitamente. Sem cartão de crédito. Cancele quando quiser.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                variant="light"
                size="lg"
                className="px-6"
                render={<Link href="/register" />}
                nativeButton={false}
              >
                Criar Conta Grátis
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white/90 hover:bg-white/10 hover:text-white px-6"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                Entrar na Plataforma
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
