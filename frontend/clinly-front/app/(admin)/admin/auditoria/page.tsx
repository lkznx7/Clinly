"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const logs = [
  { id: "1", date: "22/07/2026 08:00", user: "Admin", action: "LOGIN", details: "Login realizado com sucesso", ip: "192.168.1.100" },
  { id: "2", date: "22/07/2026 07:55", user: "Dr. Carlos", action: "CREATE", details: "Consulta criada para Ana Silva", ip: "192.168.1.101" },
  { id: "3", date: "22/07/2026 07:30", user: "Recepcionista", action: "UPDATE", details: "Status do paciente alterado para Ativo", ip: "192.168.1.102" },
  { id: "4", date: "21/07/2026 16:00", user: "Admin", action: "UPDATE", details: "Configurações do sistema atualizadas", ip: "192.168.1.100" },
  { id: "5", date: "21/07/2026 14:30", user: "Dra. Mariana", action: "DELETE", details: "Consulta cancelada: Roberto Nogueira", ip: "192.168.1.103" },
  { id: "6", date: "21/07/2026 12:00", user: "Admin", action: "CREATE", details: "Novo usuário cadastrado: Enfermeira Carla", ip: "192.168.1.100" },
  { id: "7", date: "21/07/2026 10:00", user: "Sistema", action: "SYSTEM", details: "Backup automático concluído", ip: "—" },
  { id: "8", date: "20/07/2026 15:00", user: "Admin", action: "UPDATE", details: "Horário de funcionamento alterado", ip: "192.168.1.100" },
];

const actionColors: Record<string, string> = {
  LOGIN: "bg-blue-50 text-blue-700 border-blue-200",
  CREATE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  UPDATE: "bg-amber-50 text-amber-700 border-amber-200",
  DELETE: "bg-red-50 text-red-700 border-red-200",
  SYSTEM: "bg-violet-50 text-violet-700 border-violet-200",
};

export default function AuditoriaPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Auditoria" description="Log de atividades do sistema" />
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Filtrar por Período</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div className="space-y-1.5">
            <Label>Data Início</Label>
            <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-40" />
          </div>
          <div className="space-y-1.5">
            <Label>Data Fim</Label>
            <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-40" />
          </div>
        </CardContent>
      </Card>
      <div className="rounded-lg border border-border/50 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Detalhes</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="text-sm text-muted-foreground">{l.date}</TableCell>
                <TableCell className="font-medium">{l.user}</TableCell>
                <TableCell><Badge variant="outline" className={actionColors[l.action] ?? ""}>{l.action}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{l.details}</TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">{l.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
