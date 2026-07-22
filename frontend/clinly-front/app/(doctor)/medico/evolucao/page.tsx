"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Save } from "lucide-react";

const pastEvolutions = [
  { date: "22/07/2026", patient: "Ana Maria Silva", subjective: "Relata cefaleia há 3 dias", objective: "PA 140x90, FC 82", assessment: "Crise hipertensiva leve", plan: "Ajustar medicação" },
  { date: "15/07/2026", patient: "João Pedro Santos", subjective: "Retorno para reavaliação", objective: "PA 120x80, FR 16", assessment: "Controle adequado", plan: "Manter conduta" },
  { date: "10/07/2026", patient: "Maria Clara Oliveira", subjective: "Dor articular no joelho direito", objective: "Edema leve, amplitude reduzida", assessment: "Gonartrose Grau II", plan: "Fisioterapia + AINE" },
];

export default function EvolucaoPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Evolução Clínica" description="Registre a evolução dos pacientes (SOAP)" />
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Nova Evolução</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>Paciente</Label><select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Ana Maria Silva</option><option>João Pedro Santos</option><option>Maria Clara Oliveira</option></select></div>
            <div className="space-y-1.5"><Label>Data</Label><input type="date" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" defaultValue="2026-07-22" /></div>
          </div>
          <div className="space-y-1.5"><Label>Subjetivo (S)</Label><Textarea placeholder="Queixa principal, histórico da doença atual..." /></div>
          <div className="space-y-1.5"><Label>Objetivo (O)</Label><Textarea placeholder="Exame físico, sinais vitais, achados..." /></div>
          <div className="space-y-1.5"><Label>Avaliação (A)</Label><Textarea placeholder="Diagnóstico, hipótese diagnóstica..." /></div>
          <div className="space-y-1.5"><Label>Plano (P)</Label><Textarea placeholder="Conduta, medicação, encaminhamentos..." /></div>
          <Button onClick={() => toast.success("Evolução registrada com sucesso!")}><Save className="size-4" />Salvar Evolução</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Evoluções Anteriores</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastEvolutions.map((e, i) => (
              <div key={i} className="rounded-lg border border-border/50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{e.patient}</p>
                  <span className="text-xs text-muted-foreground">{e.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="font-medium text-muted-foreground">S:</span> {e.subjective}</div>
                  <div><span className="font-medium text-muted-foreground">O:</span> {e.objective}</div>
                  <div><span className="font-medium text-muted-foreground">A:</span> {e.assessment}</div>
                  <div><span className="font-medium text-muted-foreground">P:</span> {e.plan}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
