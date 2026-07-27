"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Home } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950">
          <Shield className="size-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Acesso Negado
        </h1>
        <p className="mt-3 text-muted-foreground">
          Você não tem permissão para acessar esta página. Entre em contato com o administrador.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button render={<Link href="/dashboard" />} nativeButton={false}>
            <Home className="size-4" />
            Dashboard
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
