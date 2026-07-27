"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { Bell, Check, Calendar, AlertCircle, FileText, Clock } from "lucide-react";

const notifications = [
  { id: "1", icon: Calendar, title: "Consulta agendada", message: "Nova consulta com Ana Maria Silva amanhã às 09:00", time: "há 10 min", read: false },
  { id: "2", icon: AlertCircle, title: "Resultado de exame disponível", message: "Hemograma de João Pedro Santos disponível", time: "há 1 hora", read: false },
  { id: "3", icon: FileText, title: "Prontuário atualizado", message: "Prontuário de Maria Clara Oliveira foi atualizado", time: "há 2 horas", read: true },
  { id: "4", icon: Clock, title: "Lembrete de intervalo", message: "Intervalo programado para 12:30", time: "há 3 horas", read: true },
  { id: "5", icon: Bell, title: "Sistema atualizado", message: "Nova versão do Clinly disponível", time: "ontem", read: true },
  { id: "6", icon: AlertCircle, title: "Paciente cancelou", message: "Pedro Henrique cancelou a consulta de amanhã", time: "ontem", read: true },
];

export default function NotificacoesMedicoPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Notificações" description="Suas notificações e alertas" />
      <div className="space-y-2">
        {notifications.map((n) => (
          <Card key={n.id} className={`transition-colors ${!n.read ? "border-[#2563EB]/20 bg-[#2563EB]/5" : ""}`}>
            <CardContent className="flex items-start gap-3 p-4">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${!n.read ? "bg-[#2563EB]/10" : "bg-muted"}`}>
                <n.icon className={`size-4 ${!n.read ? "text-[#2563EB]" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
              </div>
              {!n.read && <Button variant="ghost" size="icon-xs"><Check className="size-3.5" /></Button>}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
