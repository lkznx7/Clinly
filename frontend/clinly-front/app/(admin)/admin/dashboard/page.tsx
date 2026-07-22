"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Building2, Users, UserCog, DollarSign, Clock } from "lucide-react";

const kpis = [
  { title: "Total de Clínicas", value: "3", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Total de Usuários", value: "247", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Total de Médicos", value: "42", icon: UserCog, color: "text-violet-600", bg: "bg-violet-50" },
  { title: "Receita Total", value: "R$ 1.245.000", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
];

const activities = [
  { id: "1", user: "Dr. Carlos Souza", action: "criou uma nova consulta", time: "há 5 min" },
  { id: "2", user: "Ana Rezende", action: "cadastrou um novo paciente", time: "há 15 min" },
  { id: "3", user: "Admin", action: "atualizou as configurações do sistema", time: "há 1 hora" },
  { id: "4", user: "Dra. Mariana Lima", action: "finalizou uma consulta", time: "há 2 horas" },
  { id: "5", user: "Recepcionista", action: "confirmou 5 consultas pendentes", time: "há 3 horas" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function AdminDashboardPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
      <motion.div variants={fadeUp}>
        <PageHeader title="Dashboard Administrativo" description="Visão geral do sistema Clinly" />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <motion.div key={kpi.title} variants={fadeUp} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <div className={`flex size-8 items-center justify-center rounded-lg ${kpi.bg}`}>
                  <kpi.icon className={`size-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Atividade Recente do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50">
                  <Clock className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">{a.user}</span> {a.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
