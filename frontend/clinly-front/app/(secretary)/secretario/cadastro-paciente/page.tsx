"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function CadastroPacientePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Cadastro de Paciente" description="Registre um novo paciente" />
      <Card>
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
          <CardDescription>Preencha os dados do paciente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>Nome Completo</Label><Input placeholder="Nome do paciente" /></div>
            <div className="space-y-1.5"><Label>E-mail</Label><Input type="email" placeholder="email@exemplo.com" /></div>
            <div className="space-y-1.5"><Label>CPF</Label><Input placeholder="000.000.000-00" /></div>
            <div className="space-y-1.5"><Label>Telefone</Label><Input placeholder="(00) 00000-0000" /></div>
            <div className="space-y-1.5"><Label>Data de Nascimento</Label><Input type="date" /></div>
            <div className="space-y-1.5"><Label>Gênero</Label><select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Masculino</option><option>Feminino</option><option>Outro</option></select></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Endereço</Label><Input placeholder="Rua, número - Cidade, UF" /></div>
            <div className="space-y-1.5"><Label>Convênio</Label><select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Particular</option><option>Unimed</option><option>Amil</option><option>Bradesco Saúde</option></select></div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={() => toast.success("Paciente cadastrado com sucesso!")}><Save className="size-4" />Salvar</Button>
            <Button variant="outline">Cancelar</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
