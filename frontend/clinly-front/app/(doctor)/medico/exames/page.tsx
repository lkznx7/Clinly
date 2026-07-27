"use client";

import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";

const requests = [
  { patient: "Ana Maria Silva", exam: "Hemograma Completo", date: "22/07/2026", status: "PENDING", result: null },
  { patient: "João Pedro Santos", exam: "Raio-X Tórax", date: "20/07/2026", status: "COMPLETED", result: "Normal" },
  { patient: "Maria Clara Oliveira", exam: "Ressonância Joelho", date: "18/07/2026", status: "COMPLETED", result: "Gonartrose Grau II" },
  { patient: "Pedro Henrique Costa", exam: "Eletrocardiograma", date: "15/07/2026", status: "COMPLETED", result: "Normal" },
  { patient: "Lucia Fernanda Martins", exam: "Ultrassom Abdominal", date: "22/07/2026", status: "PENDING", result: null },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pendente", className: "bg-amber-50 text-amber-700 border-amber-200" },
  COMPLETED: { label: "Concluído", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export default function ExamesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Solicitações de Exames" description="Gerencie pedidos de exames" />
      <div className="rounded-lg border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Exame</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{r.patient}</TableCell>
                <TableCell>{r.exam}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{r.date}</TableCell>
                <TableCell><Badge variant="outline" className={statusConfig[r.status].className}>{statusConfig[r.status].label}</Badge></TableCell>
                <TableCell className="text-muted-foreground text-sm">{r.result ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
