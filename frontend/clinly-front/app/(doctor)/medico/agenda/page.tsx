"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { useState } from "react";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const hours = Array.from({ length: 11 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

const weekAppointments: Record<string, { time: string; patient: string; type: string }[]> = {
  Seg: [
    { time: "08:00", patient: "Ana Maria Silva", type: "Consulta" },
    { time: "10:00", patient: "João Pedro Santos", type: "Retorno" },
    { time: "14:00", patient: "Maria Clara Oliveira", type: "Exame" },
  ],
  Ter: [
    { time: "09:00", patient: "Pedro Henrique Costa", type: "Consulta" },
    { time: "11:00", patient: "Lucia Fernanda Martins", type: "Consulta" },
  ],
  Qua: [
    { time: "08:00", patient: "Roberto Nogueira", type: "Retorno" },
    { time: "10:00", patient: "Fernanda Lima", type: "Consulta" },
    { time: "15:00", patient: "Carlos Eduardo Silva", type: "Consulta" },
  ],
  Qui: [
    { time: "09:00", patient: "Patricia Souza", type: "Exame" },
    { time: "14:00", patient: "Marcos Oliveira", type: "Consulta" },
  ],
  Sex: [
    { time: "08:00", patient: "Juliana Costa", type: "Consulta" },
    { time: "11:00", patient: "Antonio Ferreira", type: "Retorno" },
  ],
};

export default function AgendaMedicoPage() {
  const [selectedDay, setSelectedDay] = useState("Seg");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Minha Agenda" description="Visualize sua agenda semanal" />
      <div className="flex gap-2">
        {days.map((d) => (
          <button key={d} onClick={() => setSelectedDay(d)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selectedDay === d ? "bg-[#2563EB] text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{d}</button>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {hours.map((h) => {
              const appt = weekAppointments[selectedDay]?.find((a) => a.time === h);
              return (
                <div key={h} className="flex items-center gap-4 px-4 py-3">
                  <span className="w-12 text-xs font-mono text-muted-foreground">{h}</span>
                  <div className="flex-1 min-h-[36px]">
                    {appt ? (
                      <div className="flex items-center gap-3 rounded-lg bg-[#2563EB]/5 border border-[#2563EB]/20 px-3 py-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{appt.patient}</p>
                          <p className="text-xs text-muted-foreground">{appt.type}</p>
                        </div>
                        <Badge variant="outline" className="bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20">{appt.type}</Badge>
                      </div>
                    ) : (
                      <div className="h-full" />
                    )}
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
