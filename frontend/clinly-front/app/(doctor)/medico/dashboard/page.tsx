"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/page-header";
import { CalendarDays, Users, Clock } from "lucide-react";

const kpis = [
  { title: "Consultas Hoje", value: "8", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Pacientes do Dia", value: "6", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Próximo Intervalo", value: "12:30", icon: Clock, color: "text-violet-600", bg: "bg-violet-50" },
];

const todayAppointments = [
  { time: "08:00", patient: "Ana Maria Silva", type: "Consulta", status: "COMPLETED" },
  { time: "09:00", patient: "João Pedro Santos", type: "Retorno", status: "CONFIRMED" },
  { time: "10:00", patient: "Maria Clara Oliveira", type: "Consulta", status: "IN_PROGRESS" },
  { time: "11:00", patient: "Pedro Henrique Costa", type: "Exame", status: "SCHEDULED" },
  { time: "14:00", patient: "Lucia Fernanda Martins", type: "Consulta", status: "SCHEDULED" },
];

const statusLabels: Record<string, string> = { COMPLETED: "Concluído", CONFIRMED: "Confirmado", IN_PROGRESS: "Em andamento", SCHEDULED: "Agendado" };
const statusColors: Record<string, string> = { COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200", CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200", IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200", SCHEDULED: "bg-zinc-100 text-zinc-600 border-zinc-200" };

export default function DoctorDashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Meu Dashboard" description="Visão geral do seu dia" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className={`flex size-8 items-center justify-center rounded-lg ${kpi.bg}`}><kpi.icon className={`size-4 ${kpi.color}`} /></div>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{kpi.value}</div></CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Consultas de Hoje</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todayAppointments.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50">
                <span className="text-sm font-mono text-muted-foreground w-12">{a.time}</span>
                <Avatar size="sm"><AvatarFallback>{a.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback></Avatar>
                <div className="flex-1"><p className="text-sm font-medium">{a.patient}</p><p className="text-xs text-muted-foreground">{a.type}</p></div>
                <Badge variant="outline" className={statusColors[a.status]}>{statusLabels[a.status]}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
