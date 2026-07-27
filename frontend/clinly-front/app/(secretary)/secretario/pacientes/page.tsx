"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Plus } from "lucide-react";
import { useState } from "react";

const patients = [
  { name: "Ana Maria Silva", cpf: "123.456.789-00", phone: "(11) 99000-1111", convenio: "Unimed", lastVisit: "15/07/2026", status: "ACTIVE" },
  { name: "João Pedro Santos", cpf: "234.567.890-12", phone: "(11) 99000-2222", convenio: "Amil", lastVisit: "10/07/2026", status: "ACTIVE" },
  { name: "Maria Clara Oliveira", cpf: "345.678.901-23", phone: "(11) 99000-3333", convenio: "Bradesco", lastVisit: "22/07/2026", status: "ACTIVE" },
  { name: "Pedro Henrique Costa", cpf: "456.789.012-34", phone: "(11) 99000-4444", convenio: "Unimed", lastVisit: "20/06/2026", status: "INACTIVE" },
  { name: "Lucia Fernanda Martins", cpf: "567.890.123-45", phone: "(11) 99000-5555", convenio: "Amil", lastVisit: "18/07/2026", status: "ACTIVE" },
  { name: "Roberto Nogueira", cpf: "678.901.234-56", phone: "(11) 99000-6666", convenio: null, lastVisit: "01/07/2026", status: "ACTIVE" },
  { name: "Fernanda Lima", cpf: "789.012.345-67", phone: "(11) 99000-7777", convenio: "Bradesco", lastVisit: "19/07/2026", status: "ACTIVE" },
  { name: "Carlos Eduardo Silva", cpf: "890.123.456-78", phone: "(11) 99000-8888", convenio: "Unimed", lastVisit: "12/07/2026", status: "ACTIVE" },
];

export default function PacientesSecretarioPage() {
  const [search, setSearch] = useState("");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Pacientes" description="Cadastro de pacientes" action={<Button><Plus className="size-4" />Novo Paciente</Button>} />
      <SearchInput value={search} onChange={setSearch} placeholder="Buscar paciente..." className="w-80" />
      <div className="rounded-lg border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Convênio</TableHead>
              <TableHead>Última Visita</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.cpf}</TableCell>
                <TableCell className="text-sm">{p.phone}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.convenio ?? "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.lastVisit}</TableCell>
                <TableCell><StatusBadge status={p.status as "ACTIVE" | "INACTIVE"} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
