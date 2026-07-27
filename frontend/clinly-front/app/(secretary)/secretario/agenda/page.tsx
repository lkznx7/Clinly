"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { Plus } from "lucide-react";

const hours = Array.from({ length: 11 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);
const appointments: Record<string, { time: string; patient: string; doctor: string; type: string; status: string }> = {
  "08:00": { time: "08:00", patient: "Ana Maria Silva", doctor: "Dr. Carlos Souza", type: "Consulta", status: "CONFIRMED" },
  "09:00": { time: "09:00", patient: "João Pedro Santos", doctor: "Dra. Mariana Lima", type: "Retorno", status: "CONFIRMED" },
  "10:00": { time: "10:00", patient: "Maria Clara Oliveira", doctor: "Dr. Carlos Souza", type: "Exame", status: "SCHEDULED" },
  "11:00": { time: "11:00", patient: "Pedro Henrique Costa", doctor: "Dra. Mariana Lima", type: "Consulta", status: "SCHEDULED" },
  "14:00": { time: "14:00", patient: "Lucia Fernanda Martins", doctor: "Dr. Carlos Souza", type: "Consulta", status: "CONFIRMED" },
  "15:00": { time: "15:00", patient: "Roberto Nogueira", doctor: "Dra. Mariana Lima", type: "Retorno", status: "SCHEDULED" },
  "16:00": { time: "16:00", patient: "Fernanda Lima", doctor: "Dr. Carlos Souza", type: "Consulta", status: "CONFIRMED" },
};

const typeColors: Record<string, string> = { Consulta: "bg-blue-50 text-blue-700 border-blue-200", Retorno: "bg-violet-50 text-violet-700 border-violet-200", Exame: "bg-amber-50 text-amber-700 border-amber-200" };

export default function AgendaSecretarioPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Agenda do Dia" description="Acompanhamento em tempo real" action={<Button><Plus className="size-4" />Novo Agendamento</Button>} />
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {hours.map((h) => {
              const a = appointments[h];
              return (
                <div key={h} className="flex items-center gap-4 px-4 py-3">
                  <span className="w-12 text-xs font-mono text-muted-foreground">{h}</span>
                  <div className="flex-1 min-h-[36px]">
                    {a ? (
                      <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{a.patient}</p>
                          <p className="text-xs text-muted-foreground truncate">{a.doctor}</p>
                        </div>
                        <Badge variant="outline" className={typeColors[a.type] ?? ""}>{a.type}</Badge>
                        <Badge variant="outline" className={a.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-600 border-zinc-200"}>
                          {a.status === "CONFIRMED" ? "Confirmado" : "Agendado"}
                        </Badge>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
