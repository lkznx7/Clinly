"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Algo deu errado",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </div>
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
