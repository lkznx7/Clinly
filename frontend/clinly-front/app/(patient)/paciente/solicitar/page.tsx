"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Send } from "lucide-react";

export default function SolicitarAgendamentoPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Solicitar Agendamento" description="Solicite uma nova consulta" />
      <Card>
        <CardHeader>
          <CardTitle>Dados do Agendamento</CardTitle>
          <CardDescription>Preencha as informações desejadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Especialidade</Label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                <option>Clínico Geral</option><option>Cardiologia</option><option>Pediatria</option><option>Ortopedia</option><option>Dermatologia</option><option>Neurologia</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Data Preferida</Label>
              <input type="date" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label>Horário Preferido</Label>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                <option>Manhã (08:00 - 12:00)</option><option>Tarde (13:00 - 18:00)</option><option>Qualquer horário</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Motivo da Consulta</Label>
            <Textarea placeholder="Descreva brevemente o motivo da consulta..." />
          </div>
          <Button onClick={() => toast.success("Solicitação enviada! Você receberá uma confirmação em breve.")}>
            <Send className="size-4" />Enviar Solicitação
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
