"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { Plus, Stethoscope } from "lucide-react";

const specialties = [
  { name: "Cardiologia", doctors: 8 },
  { name: "Pediatria", doctors: 6 },
  { name: "Ortopedia", doctors: 5 },
  { name: "Dermatologia", doctors: 4 },
  { name: "Neurologia", doctors: 3 },
  { name: "Ginecologia", doctors: 5 },
  { name: "Oftalmologia", doctors: 4 },
  { name: "Clínico Geral", doctors: 7 },
];

export default function EspecialidadesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Especialidades" description="Gerencie as especialidades médicas" action={<Button><Plus className="size-4" />Nova Especialidade</Button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((s) => (
          <Card key={s.name} className="transition-all hover:border-border hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <Stethoscope className="size-5 text-[#2563EB]" />
              </div>
              <CardTitle className="text-base">{s.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.doctors} médico{s.doctors !== 1 ? "s" : ""} cadastrado{s.doctors !== 1 ? "s" : ""}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
