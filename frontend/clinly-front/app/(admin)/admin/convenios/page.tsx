"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Plus } from "lucide-react";

const convenios = [
  { id: "1", name: "Unimed", cnpj: "02.345.678/0001-90", patients: 320, status: "ACTIVE" },
  { id: "2", name: "Amil", cnpj: "62.073.200/0001-83", patients: 215, status: "ACTIVE" },
  { id: "3", name: "Bradesco Saúde", cnpj: "04.567.890/0001-12", patients: 180, status: "ACTIVE" },
];

export default function ConveniosPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Convênios" description="Gerencie os convênios aceitos" action={<Button><Plus className="size-4" />Novo Convênio</Button>} />
      <div className="rounded-lg border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Pacientes</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {convenios.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-muted-foreground">{c.cnpj}</TableCell>
                <TableCell>{c.patients}</TableCell>
                <TableCell><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Ativo</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
