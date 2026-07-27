"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { CalendarDays, Users, CheckCircle, Clock } from "lucide-react";

const kpis = [
  { title: "Consultas Hoje", value: "15", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Pacientes Agendados", value: "12", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Confirmadas", value: "10", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Pendentes", value: "5", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
];

const pending = [
  { time: "09:00", patient: "Roberto Nogueira", doctor: "Dr. Carlos Souza", phone: "(11) 99000-1111" },
  { time: "10:00", patient: "Fernanda Lima", doctor: "Dra. Mariana Lima", phone: "(11) 99000-2222" },
  { time: "11:00", patient: "Antonio Ferreira", doctor: "Dr. Carlos Souza", phone: "(11) 99000-3333" },
  { time: "14:00", patient: "Juliana Costa", doctor: "Dra. Mariana Lima", phone: "(11) 99000-4444" },
];

export default function SecretaryDashboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Dashboard" description="Painel da recepção" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <CardHeader><CardTitle className="text-sm font-medium">Confirmar Consultas Pendentes</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pending.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 hover:bg-muted/50">
                <span className="text-sm font-mono text-muted-foreground w-12">{a.time}</span>
                <Avatar size="sm"><AvatarFallback>{a.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.patient}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.doctor}</p>
                </div>
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" className="h-7 text-xs">Confirmar</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive">Cancelar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
