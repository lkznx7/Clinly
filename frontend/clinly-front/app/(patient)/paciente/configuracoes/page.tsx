"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function ConfigPacientePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Configurações" description="Preferências da sua conta" />
      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Escolha como deseja receber notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Notificações por E-mail</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Notificações por SMS</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Lembretes de medicação</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Lembretes de consulta</Label>
            <Switch defaultChecked />
          </div>
          <Button onClick={() => toast.success("Configurações salvas!")}><Save className="size-4" />Salvar</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
