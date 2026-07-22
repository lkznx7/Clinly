"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Configurações Gerais" description="Configure as definições do sistema" />
      <Card>
        <CardHeader>
          <CardTitle>Dados da Clínica</CardTitle>
          <CardDescription>Informações básicas da organização</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Nome da Clínica</Label>
              <Input defaultValue="Clinly Centro" />
            </div>
            <div className="space-y-1.5">
              <Label>E-mail de Contato</Label>
              <Input type="email" defaultValue="contato@clinly.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Telefone</Label>
              <Input defaultValue="(11) 3000-1000" />
            </div>
            <div className="space-y-1.5">
              <Label>Fuso Horário</Label>
              <Input defaultValue="America/Sao_Paulo" />
            </div>
          </div>
          <Button onClick={() => toast.success("Configurações salvas com sucesso!")} className="mt-4">
            <Save className="size-4" />
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
