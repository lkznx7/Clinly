"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/page-header";
import { MessageCircle, Phone, CheckCircle } from "lucide-react";

const unconfirmed = [
  { time: "09:00", patient: "Roberto Nogueira", doctor: "Dr. Carlos Souza", phone: "(11) 99000-1111" },
  { time: "10:00", patient: "Fernanda Lima", doctor: "Dra. Mariana Lima", phone: "(11) 99000-2222" },
  { time: "11:00", patient: "Antonio Ferreira", doctor: "Dr. Carlos Souza", phone: "(11) 99000-3333" },
  { time: "14:00", patient: "Juliana Costa", doctor: "Dra. Mariana Lima", phone: "(11) 99000-4444" },
  { time: "15:00", patient: "Carlos Eduardo Silva", doctor: "Dr. Carlos Souza", phone: "(11) 99000-5555" },
  { time: "16:00", patient: "Patricia Souza", doctor: "Dra. Mariana Lima", phone: "(11) 99000-6666" },
];

export default function ConfirmacaoPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Confirmação de Consultas" description="Confirme presença dos pacientes" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {unconfirmed.map((a, i) => (
          <Card key={i} className="transition-all hover:border-border hover:shadow-md">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar size="sm"><AvatarFallback>{a.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.patient}</p>
                  <p className="text-xs text-muted-foreground">{a.time} · {a.doctor}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="size-3" />{a.phone}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs"><MessageCircle className="size-3" />WhatsApp</Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs"><Phone className="size-3" />SMS</Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs"><CheckCircle className="size-3" />Compareceu</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
