"use client";

import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { useState } from "react";

const patients = [
  { name: "Ana Maria Silva", lastVisit: "15/07/2026", nextVisit: "22/07/2026", status: "ACTIVE" },
  { name: "João Pedro Santos", lastVisit: "10/07/2026", nextVisit: "24/07/2026", status: "ACTIVE" },
  { name: "Maria Clara Oliveira", lastVisit: "22/07/2026", nextVisit: "05/08/2026", status: "ACTIVE" },
  { name: "Pedro Henrique Costa", lastVisit: "20/06/2026", nextVisit: null, status: "INACTIVE" },
  { name: "Lucia Fernanda Martins", lastVisit: "18/07/2026", nextVisit: "18/08/2026", status: "ACTIVE" },
  { name: "Roberto Nogueira", lastVisit: "01/07/2026", nextVisit: null, status: "INACTIVE" },
];

export default function PacientesMedicoPage() {
  const [search, setSearch] = useState("");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Meus Pacientes" description="Pacientes sob seus cuidados" />
      <SearchInput value={search} onChange={setSearch} placeholder="Buscar paciente..." className="w-80" />
      <div className="rounded-lg border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Última Consulta</TableHead>
              <TableHead>Próxima Consulta</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-muted-foreground">{p.lastVisit}</TableCell>
                <TableCell className="text-muted-foreground">{p.nextVisit ?? "—"}</TableCell>
                <TableCell><StatusBadge status={p.status as "ACTIVE" | "INACTIVE"} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
