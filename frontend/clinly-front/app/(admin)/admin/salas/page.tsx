"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Plus, DoorOpen } from "lucide-react";

const rooms = [
  { id: "1", number: "101", floor: "1°", specialty: "Clínico Geral", status: "available" },
  { id: "2", number: "102", floor: "1°", specialty: "Pediatria", status: "occupied" },
  { id: "3", number: "201", floor: "2°", specialty: "Cardiologia", status: "available" },
  { id: "4", number: "202", floor: "2°", specialty: "Ortopedia", status: "maintenance" },
  { id: "5", number: "301", floor: "3°", specialty: "Dermatologia", status: "available" },
  { id: "6", number: "302", floor: "3°", specialty: "Neurologia", status: "occupied" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  available: { label: "Disponível", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  occupied: { label: "Ocupada", className: "bg-red-50 text-red-700 border-red-200" },
  maintenance: { label: "Manutenção", className: "bg-amber-50 text-amber-700 border-amber-200" },
};

export default function SalasPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Salas" description="Gerencie as salas de atendimento" action={<Button><Plus className="size-4" />Nova Sala</Button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((r) => (
          <Card key={r.id} className="transition-all hover:border-border hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <DoorOpen className="size-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Sala {r.number}</CardTitle>
                <p className="text-xs text-muted-foreground">{r.floor} andar</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{r.specialty}</p>
              <Badge variant="outline" className={statusConfig[r.status].className}>{statusConfig[r.status].label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
