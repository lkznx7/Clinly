"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function PerfilPacientePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Meu Perfil" description="Gerencie seus dados pessoais" />
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#2563EB]/10 text-xl font-bold text-[#2563EB]">JS</div>
          <div>
            <h3 className="text-lg font-semibold">João Silva</h3>
            <p className="text-sm text-muted-foreground">joao.silva@email.com</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>Nome</Label><Input defaultValue="João Silva" /></div>
            <div className="space-y-1.5"><Label>E-mail</Label><Input defaultValue="joao.silva@email.com" type="email" /></div>
            <div className="space-y-1.5"><Label>CPF</Label><Input defaultValue="123.456.789-00" /></div>
            <div className="space-y-1.5"><Label>Telefone</Label><Input defaultValue="(11) 99000-1111" /></div>
            <div className="space-y-1.5"><Label>Data de Nascimento</Label><Input type="date" defaultValue="1990-05-15" /></div>
            <div className="space-y-1.5"><Label>Convênio</Label><Input defaultValue="Unimed" /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Endereço</Label><Input defaultValue="Rua das Flores, 123 - São Paulo, SP" /></div>
          </div>
          <Button onClick={() => toast.success("Perfil atualizado com sucesso!")}><Save className="size-4" />Salvar Alterações</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
