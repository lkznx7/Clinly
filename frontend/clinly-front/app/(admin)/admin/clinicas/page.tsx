"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Plus } from "lucide-react";
import { useState } from "react";

const clinics = [
  { id: "1", name: "Clinly Centro", address: "Rua Augusta, 1000 - São Paulo, SP", phone: "(11) 3000-1000", doctors: 15, status: "ACTIVE" },
  { id: "2", name: "Clinly Zona Sul", address: "Av. Paulista, 2000 - São Paulo, SP", phone: "(11) 3000-2000", doctors: 12, status: "ACTIVE" },
  { id: "3", name: "Clinly Leste", address: "Rua Taquatra, 500 - São Paulo, SP", phone: "(11) 3000-3000", doctors: 8, status: "INACTIVE" },
];

export default function ClinicasPage() {
  const [search, setSearch] = useState("");
  const filtered = clinics.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Gestão de Clínicas" description="Gerencie as unidades clínicas" action={<Button><Plus className="size-4" />Nova Clínica</Button>} />
      <div className="flex items-center gap-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Buscar clínica..." className="w-80" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Médicos</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.address}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.doctors}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={c.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-600 border-zinc-200"}>
                      {c.status === "ACTIVE" ? "Ativa" : "Inativa"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
