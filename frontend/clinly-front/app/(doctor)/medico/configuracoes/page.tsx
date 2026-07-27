"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function ConfigMedicoPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Configurações" description="Personalize suas preferências" />
      <Card>
        <CardHeader>
          <CardTitle>Dados Profissionais</CardTitle>
          <CardDescription>Informações do seu cadastro médico</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>CRM</Label><Input defaultValue="12345/SP" /></div>
            <div className="space-y-1.5"><Label>Especialidade</Label><Input defaultValue="Clínico Geral" /></div>
          </div>
          <Button onClick={() => toast.success("Configurações salvas!")}><Save className="size-4" />Salvar</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
