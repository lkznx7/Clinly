"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Bell, Calendar, FileText, AlertCircle, Clock } from "lucide-react";

const notifications = [
  { icon: Calendar, title: "Consulta agendada", message: "Sua consulta com Dr. Carlos Souza foi confirmada para 25/07", time: "há 1 hora", read: false },
  { icon: FileText, title: "Resultado disponível", message: "Seu hemograma completo está disponível", time: "há 3 horas", read: false },
  { icon: Bell, title: "Lembrete de medicação", message: "Não esqueça de tomar sua medicação às 20:00", time: "hoje 08:00", read: true },
  { icon: AlertCircle, title: "Convênio atualizado", message: "Sua cobertura foi renovada pela Unimed", time: "ontem", read: true },
  { icon: Clock, title: "Horário alterado", message: "Sua consulta foi remarcada de 14:00 para 15:00", time: "18/07", read: true },
];

export default function NotificacoesPacientePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Notificações" description="Suas notificações e lembretes" />
      <div className="space-y-2">
        {notifications.map((n, i) => (
          <Card key={i} className={`transition-colors ${!n.read ? "border-[#2563EB]/20 bg-[#2563EB]/5" : ""}`}>
            <CardContent className="flex items-start gap-3 p-4">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${!n.read ? "bg-[#2563EB]/10" : "bg-muted"}`}>
                <n.icon className={`size-4 ${!n.read ? "text-[#2563EB]" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
              </div>
              {!n.read && <Badge variant="secondary" className="text-[10px]">Nova</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
