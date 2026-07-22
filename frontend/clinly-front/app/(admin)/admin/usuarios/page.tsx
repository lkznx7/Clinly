"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Plus } from "lucide-react";
import { useState } from "react";

const roleLabels: Record<string, string> = { ADMIN: "Admin", DOCTOR: "Médico", NURSE: "Enfermeiro", RECEPTIONIST: "Recepcionista", PATIENT: "Paciente" };

const users = [
  { id: "1", name: "Admin Geral", email: "admin@clinly.com", role: "ADMIN", status: "ACTIVE", lastAccess: "22/07/2026 08:00" },
  { id: "2", name: "Dr. Carlos Souza", email: "carlos@clinly.com", role: "DOCTOR", status: "ACTIVE", lastAccess: "22/07/2026 07:45" },
  { id: "3", name: "Dra. Mariana Lima", email: "mariana@clinly.com", role: "DOCTOR", status: "ACTIVE", lastAccess: "22/07/2026 07:30" },
  { id: "4", name: "Ana Rezende", email: "ana@clinly.com", role: "NURSE", status: "ACTIVE", lastAccess: "21/07/2026 16:00" },
  { id: "5", name: "Paula Fernandes", email: "paula@clinly.com", role: "RECEPTIONIST", status: "ACTIVE", lastAccess: "22/07/2026 07:00" },
  { id: "6", name: "Roberto Nogueira", email: "roberto@email.com", role: "PATIENT", status: "INACTIVE", lastAccess: "15/07/2026 10:00" },
];

export default function UsuariosPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Gestão de Usuários" description="Gerencie todos os usuários do sistema" action={<Button><Plus className="size-4" />Novo Usuário</Button>} />
      <SearchInput value={search} onChange={setSearch} placeholder="Buscar por nome ou e-mail..." className="w-80" />
      <div className="rounded-lg border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell><Badge variant="secondary">{roleLabels[u.role] ?? u.role}</Badge></TableCell>
                <TableCell>
                  <Badge variant="outline" className={u.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-600 border-zinc-200"}>
                    {u.status === "ACTIVE" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{u.lastAccess}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
