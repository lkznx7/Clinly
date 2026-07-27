"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { CalendarDays, Bell, Pill } from "lucide-react";

const nextAppointments = [
  { doctor: "Dr. Carlos Souza", specialty: "Clínico Geral", date: "25/07/2026", time: "09:00", type: "Consulta" },
  { doctor: "Dra. Mariana Lima", specialty: "Pediatria", date: "02/08/2026", time: "14:00", type: "Retorno" },
];

const reminders = [
  { icon: Pill, title: "Medicação", message: "Tomar Losartana 50mg às 08:00" },
  { icon: CalendarDays, title: "Próxima Consulta", message: "Dr. Carlos Souza em 25/07 às 09:00" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PatientDashboardPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
      <motion.div variants={fadeUp}>
        <PageHeader title="Meu Painel" description="Bem-vindo de volta!" />
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="border-[#2563EB]/20 bg-gradient-to-r from-[#2563EB]/5 to-transparent">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#2563EB]/10 text-lg font-bold text-[#2563EB]">JS</div>
            <div>
              <h3 className="text-lg font-semibold">Olá, João Silva!</h3>
              <p className="text-sm text-muted-foreground">Você tem 2 consultas agendadas e 1 exame pendente.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.div variants={fadeUp} whileHover={{ y: -2, transition: { duration: 0.2 } }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Próximas Consultas</CardTitle>
              <CalendarDays className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              {nextAppointments.map((a, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2 transition-colors hover:bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{a.doctor}</p>
                    <p className="text-xs text-muted-foreground">{a.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{a.date}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ y: -2, transition: { duration: 0.2 } }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Lembretes</CardTitle>
              <Bell className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              {reminders.map((r, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2 transition-colors hover:bg-muted/50">
                  <r.icon className="size-4 shrink-0 text-[#2563EB]" />
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
