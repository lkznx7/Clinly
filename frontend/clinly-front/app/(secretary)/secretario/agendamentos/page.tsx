"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Plus, Pencil, X } from "lucide-react";
import { useState } from "react";

const apts = [
  { id: "1", date: "22/07/2026", time: "09:00", patient: "Ana Maria Silva", doctor: "Dr. Carlos Souza", type: "Consulta", status: "CONFIRMED" },
  { id: "2", date: "22/07/2026", time: "10:00", patient: "João Pedro Santos", doctor: "Dra. Mariana Lima", type: "Retorno", status: "SCHEDULED" },
  { id: "3", date: "22/07/2026", time: "11:00", patient: "Maria Clara Oliveira", doctor: "Dr. Carlos Souza", type: "Exame", status: "IN_PROGRESS" },
  { id: "4", date: "23/07/2026", time: "09:00", patient: "Pedro Henrique Costa", doctor: "Dra. Mariana Lima", type: "Consulta", status: "SCHEDULED" },
  { id: "5", date: "23/07/2026", time: "14:00", patient: "Lucia Fernanda Martins", doctor: "Dr. Carlos Souza", type: "Consulta", status: "CONFIRMED" },
  { id: "6", date: "24/07/2026", time: "08:00", patient: "Roberto Nogueira", doctor: "Dr. Carlos Souza", type: "Retorno", status: "SCHEDULED" },
  { id: "7", date: "24/07/2026", time: "10:00", patient: "Fernanda Lima", doctor: "Dra. Mariana Lima", type: "Consulta", status: "SCHEDULED" },
  { id: "8", date: "25/07/2026", time: "09:00", patient: "Carlos Eduardo Silva", doctor: "Dr. Carlos Souza", type: "Consulta", status: "CONFIRMED" },
  { id: "9", date: "25/07/2026", time: "11:00", patient: "Patricia Souza", doctor: "Dra. Mariana Lima", type: "Exame", status: "SCHEDULED" },
  { id: "10", date: "25/07/2026", time: "15:00", patient: "Marcos Oliveira", doctor: "Dr. Carlos Souza", type: "Consulta", status: "CANCELLED" },
];

export default function AgendamentosSecretarioPage() {
  const [search, setSearch] = useState("");
  const filtered = apts.filter((a) => a.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Agendamentos" description="Gerencie todos os agendamentos" action={<Button><Plus className="size-4" />Novo Agendamento</Button>} />
      <SearchInput value={search} onChange={setSearch} placeholder="Buscar por paciente..." className="w-80" />
      <div className="rounded-lg border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Médico</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="text-sm">{a.date}</TableCell>
                <TableCell className="text-sm font-mono">{a.time}</TableCell>
                <TableCell className="font-medium">{a.patient}</TableCell>
                <TableCell className="text-muted-foreground">{a.doctor}</TableCell>
                <TableCell className="text-sm">{a.type}</TableCell>
                <TableCell><StatusBadge status={a.status as "CONFIRMED" | "SCHEDULED" | "IN_PROGRESS" | "CANCELLED"} /></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-xs"><Pencil className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon-xs" className="text-destructive"><X className="size-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
