"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users, UserPlus, DollarSign } from "lucide-react";
import type { DashboardSummary } from "@/lib/types";

interface KPICardsProps {
  data: DashboardSummary | null;
  loading: boolean;
}

export function KPICards({ data, loading }: KPICardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpis = [
    {
      title: "Consultas Hoje",
      value: data?.appointmentsToday ?? 0,
      description: "agendamentos para hoje",
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Pacientes Ativos",
      value: data?.activePatients ?? 0,
      description: "pacientes cadastrados",
      icon: Users,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950",
    },
    {
      title: "Novos Pacientes",
      value: data?.newPatientsThisMonth ?? 0,
      description: "este mês",
      icon: UserPlus,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-950",
    },
    {
      title: "Receita",
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(data?.revenueThisMonth ?? 0),
      description: "este mês",
      icon: DollarSign,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className={`flex size-8 items-center justify-center rounded-lg ${kpi.bg}`}>
              <kpi.icon className={`size-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
