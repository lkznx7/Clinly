"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-xs text-muted-foreground">
        Página {page + 1} de {totalPages}
      </p>
      <div className="flex items-center gap-1" role="navigation" aria-label="Paginação">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          aria-label="Página anterior"
        >
          <ChevronLeft className="size-3.5" />
        </Button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pageNum = (() => {
            if (totalPages <= 5) return i;
            if (page < 3) return i;
            if (page > totalPages - 4) return totalPages - 5 + i;
            return page - 2 + i;
          })();
          return (
            <Button
              key={pageNum}
              variant={pageNum === page ? "default" : "outline"}
              size="icon-xs"
              onClick={() => onPageChange(pageNum)}
              aria-label={`Página ${pageNum + 1}`}
              aria-current={pageNum === page ? "page" : undefined}
            >
              {pageNum + 1}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          aria-label="Próxima página"
        >
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
