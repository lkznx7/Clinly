"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { Clock, User } from "lucide-react";

const waiting = [
  { name: "Roberto Nogueira", reason: "Retorno - Check-up", arrival: "08:15", wait: "45 min", priority: "normal" },
  { name: "Fernanda Lima", reason: "Consulta - Dor lombar", arrival: "08:30", wait: "30 min", priority: "normal" },
  { name: "Antonio Ferreira", reason: "Exame - Pressão arterial", arrival: "08:45", wait: "15 min", priority: "low" },
  { name: "Juliana Costa", reason: "Consulta - Enxaqueca", arrival: "09:00", wait: "5 min", priority: "high" },
  { name: "Marcos Oliveira", reason: "Retorno - Pós-operatório", arrival: "09:05", wait: "2 min", priority: "normal" },
];

const priorityConfig: Record<string, { label: string; className: string }> = {
  high: { label: "Alta", className: "bg-red-50 text-red-700 border-red-200" },
  normal: { label: "Normal", className: "bg-blue-50 text-blue-700 border-blue-200" },
  low: { label: "Baixa", className: "bg-zinc-100 text-zinc-600 border-zinc-200" },
};

export default function ListaEsperaPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Lista de Espera" description="Pacientes aguardando atendimento" />
      <Button className="w-full sm:w-auto"><User className="size-4" />Chamar Próximo</Button>
      <div className="space-y-3">
        {waiting.map((w, i) => (
          <Card key={i} className="transition-all hover:border-border hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{w.name}</p>
                <p className="text-xs text-muted-foreground">{w.reason}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Chegou: {w.arrival}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end"><Clock className="size-3" />{w.wait}</p>
              </div>
              <Badge variant="outline" className={priorityConfig[w.priority].className}>{priorityConfig[w.priority].label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
