"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-6 text-8xl font-bold tracking-tighter text-muted-foreground/20">
          500
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Algo deu errado
        </h1>
        <p className="mt-3 text-muted-foreground">
          Ocorreu um erro inesperado. Nossa equipe já foi notificada.
        </p>
        {error.digest && (
          <p className="mt-2 rounded-md bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
            {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset}>
            <RefreshCw className="size-4" />
            Tentar Novamente
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
