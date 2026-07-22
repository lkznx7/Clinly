"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-6 text-8xl font-bold tracking-tighter text-muted-foreground/20">
          404
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Página não encontrada
        </h1>
        <p className="mt-3 text-muted-foreground">
          A página que você procura não existe ou foi movida para outro endereço.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button render={<Link href="/" />} nativeButton={false}>
            <Home className="size-4" />
            Página Inicial
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="size-4" />
            Voltar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
