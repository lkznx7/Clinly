"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { MapPin, CalendarDays } from "lucide-react";

const nextApts = [
  { doctor: "Dr. Carlos Souza", specialty: "Clínico Geral", date: "25/07/2026", time: "09:00", type: "Consulta", location: "Sala 101 - Clinly Centro" },
  { doctor: "Dra. Mariana Lima", specialty: "Pediatria", date: "02/08/2026", time: "14:00", type: "Retorno", location: "Sala 102 - Clinly Centro" },
];

const pastApts = [
  { doctor: "Dr. Carlos Souza", date: "15/07/2026", type: "Consulta", diagnosis: "Hipertensão controlada" },
  { doctor: "Dra. Mariana Lima", date: "01/07/2026", type: "Retorno", diagnosis: "Paciente estável" },
  { doctor: "Dr. Carlos Souza", date: "15/06/2026", type: "Exame", diagnosis: "Exames dentro da normalidade" },
];

const typeColors: Record<string, string> = { Consulta: "bg-blue-50 text-blue-700 border-blue-200", Retorno: "bg-violet-50 text-violet-700 border-violet-200", Exame: "bg-amber-50 text-amber-700 border-amber-200" };

export default function ConsultasPacientePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Minhas Consultas" description="Acompanhe seus atendimentos" action={<Button>Agendar Consulta</Button>} />
      <Tabs defaultValue="next">
        <TabsList>
          <TabsTrigger value="next">Próximas</TabsTrigger>
          <TabsTrigger value="past">Anteriores</TabsTrigger>
        </TabsList>
        <TabsContent value="next" className="space-y-3 mt-4">
          {nextApts.map((a, i) => (
            <Card key={i}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="font-medium">{a.doctor}</p>
                  <p className="text-xs text-muted-foreground">{a.specialty}</p>
                </div>
                <div className="text-sm"><CalendarDays className="mr-1 inline size-3" />{a.date} às {a.time}</div>
                <Badge variant="outline" className={typeColors[a.type]}>{a.type}</Badge>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="size-3" />{a.location}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="past" className="space-y-3 mt-4">
          {pastApts.map((a, i) => (
            <Card key={i}>
              <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="font-medium">{a.doctor}</p>
                  <p className="text-xs text-muted-foreground">{a.diagnosis}</p>
                </div>
                <span className="text-sm text-muted-foreground">{a.date}</span>
                <Badge variant="outline" className={typeColors[a.type]}>{a.type}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
