"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { useState } from "react";

const records = [
  { name: "Ana Maria Silva", age: 41, conditions: ["Hipertensão", "Diabetes Tipo 2"], lastVisit: "15/07/2026" },
  { name: "João Pedro Santos", age: 36, conditions: ["Asma"], lastVisit: "10/07/2026" },
  { name: "Maria Clara Oliveira", age: 48, conditions: ["Artrite Reumatoide", "Osteoporose"], lastVisit: "22/07/2026" },
  { name: "Pedro Henrique Costa", age: 31, conditions: ["Nenhuma condição crônica"], lastVisit: "20/06/2026" },
];

export default function ProntuariosPage() {
  const [search, setSearch] = useState("");
  const filtered = records.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Prontuários" description="Prontuários dos seus pacientes" />
      <SearchInput value={search} onChange={setSearch} placeholder="Buscar paciente..." className="w-80" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((r, i) => (
          <Card key={i} className="transition-all hover:border-border hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{r.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{r.age} anos · Último atendimento: {r.lastVisit}</p>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-medium text-muted-foreground mb-1">Condições:</p>
              <div className="flex flex-wrap gap-1.5">
                {r.conditions.map((c, j) => (
                  <Badge key={j} variant="secondary" className="text-xs">{c}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
