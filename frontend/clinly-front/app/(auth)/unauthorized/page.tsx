"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, Home } from "lucide-react";

export default function NotAuthenticatedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950">
          <LogIn className="size-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Sessão Expirada
        </h1>
        <p className="mt-3 text-muted-foreground">
          Sua sessão expirou ou você não está autenticado. Faça login para continuar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button render={<Link href="/login" />} nativeButton={false}>
            <LogIn className="size-4" />
            Fazer Login
          </Button>
          <Button variant="outline" render={<Link href="/" />} nativeButton={false}>
            <Home className="size-4" />
            Página Inicial
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
