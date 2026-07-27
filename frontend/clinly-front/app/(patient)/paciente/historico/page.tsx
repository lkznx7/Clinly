"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Pill, FileText } from "lucide-react";

const history = [
  { date: "15/07/2026", doctor: "Dr. Carlos Souza", type: "Consulta", diagnosis: "Hipertensão arterial sistêmica - controle adequado", prescriptions: ["Losartana 50mg 2x/dia"] },
  { date: "01/07/2026", doctor: "Dra. Mariana Lima", type: "Retorno", diagnosis: "Paciente pediátrico estável, sem alterações", prescriptions: [] },
  { date: "15/06/2026", doctor: "Dr. Carlos Souza", type: "Exame", diagnosis: "Hemograma completo dentro da normalidade", prescriptions: [] },
  { date: "01/06/2026", doctor: "Dr. Carlos Souza", type: "Consulta", diagnosis: "Check-up anual - sem alterações significativas", prescriptions: ["Vitamina D 1000UI/dia"] },
  { date: "15/05/2026", doctor: "Dra. Mariana Lima", type: "Consulta", diagnosis: "Infecção respiratória aguda - quadro leve", prescriptions: ["Amoxicilina 500mg 8/8h por 7 dias"] },
];

const typeColors: Record<string, string> = { Consulta: "bg-blue-50 text-blue-700 border-blue-200", Retorno: "bg-violet-50 text-violet-700 border-violet-200", Exame: "bg-amber-50 text-amber-700 border-amber-200" };

export default function HistoricoPacientePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Histórico de Atendimentos" description="Todos os seus atendimentos anteriores" />
      <div className="space-y-3">
        {history.map((h, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <FileText className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{h.doctor}</p>
                    <p className="text-xs text-muted-foreground">{h.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className={typeColors[h.type]}>{h.type}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{h.diagnosis}</p>
              {h.prescriptions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {h.prescriptions.map((p, j) => (
                    <Badge key={j} variant="secondary" className="text-xs"><Pill className="mr-1 size-3" />{p}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
