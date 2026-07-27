"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Plus, FileText, Trash2 } from "lucide-react";
import { useState } from "react";

interface Med { name: string; dosage: string; frequency: string; duration: string; instructions: string; }

const pastPrescriptions = [
  { date: "22/07/2026", patient: "Ana Maria Silva", meds: [{ name: "Losartana 50mg", dosage: "1 comprimido", frequency: "2x ao dia", duration: "30 dias", instructions: "Tomar de manhã e noite" }] },
  { date: "15/07/2026", patient: "João Pedro Santos", meds: [{ name: "Salbutamol Spray", dosage: "2 jatos", frequency: "Conforme necessário", duration: "15 dias", instructions: "Usar ao sentir falta de ar" }] },
];

export default function PrescricoesPage() {
  const [meds, setMeds] = useState<Med[]>([]);
  const [form, setForm] = useState<Med>({ name: "", dosage: "", frequency: "", duration: "", instructions: "" });

  function addMed() {
    if (!form.name) return;
    setMeds([...meds, form]);
    setForm({ name: "", dosage: "", frequency: "", duration: "", instructions: "" });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Prescrições" description="Crie e gerencie prescrições médicas" />
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Nova Prescrição</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Paciente</Label><select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Ana Maria Silva</option><option>João Pedro Santos</option></select></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Medicamento</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Amoxicilina 500mg" /></div>
            <div className="space-y-1.5"><Label>Dosagem</Label><Input value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="Ex: 1 comprimido" /></div>
            <div className="space-y-1.5"><Label>Frequência</Label><Input value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} placeholder="Ex: 8/8h" /></div>
            <div className="space-y-1.5"><Label>Duração</Label><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Ex: 7 dias" /></div>
          </div>
          <div className="space-y-1.5"><Label>Instruções</Label><Textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} placeholder="Observações adicionais..." /></div>
          <Button type="button" variant="outline" onClick={addMed}><Plus className="size-4" />Adicionar Medicamento</Button>
          {meds.length > 0 && (
            <div className="space-y-2">
              {meds.map((m, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 px-3 py-2">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1"><p className="text-sm font-medium">{m.name}</p><p className="text-xs text-muted-foreground">{m.dosage} · {m.frequency} · {m.duration}</p></div>
                  <Button variant="ghost" size="icon-xs" onClick={() => setMeds(meds.filter((_, j) => j !== i))}><Trash2 className="size-3.5 text-destructive" /></Button>
                </div>
              ))}
            </div>
          )}
          <Button onClick={() => { toast.success("Prescrição gerada com sucesso!"); setMeds([]); }}>Gerar Prescrição</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Prescrições Anteriores</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pastPrescriptions.map((p, i) => (
              <div key={i} className="rounded-lg border border-border/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{p.patient}</span>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
                {p.meds.map((m, j) => <p key={j} className="text-xs text-muted-foreground">{m.name} — {m.dosage} · {m.frequency}</p>)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
