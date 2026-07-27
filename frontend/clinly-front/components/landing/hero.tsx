"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowRight,
  Play,
  LayoutDashboard,
  Users,
  Calendar,
  UserCog,
  BarChart3,
  Settings,
  Activity,
  CalendarDays,
  UserPlus,
  DollarSign,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  mockDashboardCharts,
  mockAppointments,
} from "@/lib/mock-data";

const miniSidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Pacientes", active: false },
  { icon: Calendar, label: "Calendário", active: false },
  { icon: UserCog, label: "Equipe", active: false },
  { icon: BarChart3, label: "Relatórios", active: false },
];

const kpis = [
  {
    title: "Consultas Hoje",
    value: "12",
    description: "agendamentos",
    icon: CalendarDays,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Pacientes Ativos",
    value: "847",
    description: "cadastrados",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Novos Pacientes",
    value: "34",
    description: "este mês",
    icon: UserPlus,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Receita",
    value: "R$ 48.750",
    description: "este mês",
    icon: DollarSign,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const statusStyles: Record<string, string> = {
  CONFIRMED:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  SCHEDULED:
    "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS:
    "bg-amber-50 text-amber-700 border-amber-200",
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#2563EB]/5 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-violet-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] -translate-x-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Plataforma de gestão clínica de nova geração
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Gerencie sua clínica com{" "}
          <span className="bg-gradient-to-r from-[#2563EB] to-violet-600 bg-clip-text text-transparent">
            inteligência
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          A plataforma completa para clínicas modernas. Agendamento inteligente,
          gestão de pacientes, relatórios avançados e muito mais em um só lugar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="px-6" render={<Link href="/register" />} nativeButton={false}>
            Começar Agora
            <ArrowRight className="size-4" />
          </Button>
          <Button variant="outline" size="lg" className="px-6" render={<Link href="/login" />} nativeButton={false}>
            <Play className="size-3.5" />
            Entrar na Plataforma
          </Button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-[#2563EB]/10 to-transparent blur-xl" />
          <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl shadow-[#2563EB]/5">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-400/60" />
                <div className="size-2.5 rounded-full bg-yellow-400/60" />
                <div className="size-2.5 rounded-full bg-green-400/60" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                clinly.com.br/dashboard
              </div>
            </div>
            {/* Dashboard Content */}
            <div className="flex bg-background">
              {/* Mini Sidebar */}
              <div className="hidden w-[200px] shrink-0 border-r border-border/50 p-3 lg:block">
                <div className="mb-4 flex items-center gap-2 px-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB]">
                    <Activity className="size-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Clinly
                  </span>
                </div>
                <nav className="space-y-0.5">
                  {miniSidebarItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                        item.active
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <item.icon className="size-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </nav>
                <div className="mt-4 border-t border-border/50 pt-3">
                  <div className="flex items-center gap-2 px-2">
                    <div className="flex size-6 items-center justify-center rounded-full bg-muted">
                      <Settings className="size-3 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Configurações
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4">
                {/* Page Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Dashboard
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Visão geral da sua clínica
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700"
                    >
                      <span className="mr-1 size-1 rounded-full bg-emerald-500" />
                      Online
                    </Badge>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {kpis.map((kpi) => (
                    <Card key={kpi.title} className="py-0">
                      <CardHeader className="flex flex-row items-center justify-between px-3 pt-3 pb-1">
                        <CardTitle className="text-[10px] font-medium text-muted-foreground">
                          {kpi.title}
                        </CardTitle>
                        <div
                          className={`flex size-6 items-center justify-center rounded-md ${kpi.bg}`}
                        >
                          <kpi.icon className={`size-3 ${kpi.color}`} />
                        </div>
                      </CardHeader>
                      <CardContent className="px-3 pb-3 pt-0">
                        <div className="text-lg font-bold tracking-tight">
                          {kpi.value}
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          {kpi.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Charts + Activity Row */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Chart */}
                  <Card className="col-span-2 py-0">
                    <CardHeader className="px-3 pt-3 pb-1">
                      <CardTitle className="text-[10px] font-medium">
                        Receita Mensal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 pb-3 pt-0">
                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={mockDashboardCharts.revenueByMonth}
                          >
                            <defs>
                              <linearGradient
                                id="heroGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#2563EB"
                                  stopOpacity={0.15}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#2563EB"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="month"
                              tick={{ fontSize: 9, fill: "currentColor" }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{ fontSize: 9, fill: "currentColor" }}
                              axisLine={false}
                              tickLine={false}
                              width={35}
                            />
                            <Area
                              type="monotone"
                              dataKey="revenue"
                              stroke="#2563EB"
                              fillOpacity={1}
                              fill="url(#heroGrad)"
                              strokeWidth={1.5}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Appointments */}
                  <Card className="py-0">
                    <CardHeader className="px-3 pt-3 pb-1">
                      <CardTitle className="text-[10px] font-medium">
                        Próximos Atendimentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 pb-3 pt-0">
                      <div className="space-y-1.5">
                        {mockAppointments.slice(0, 4).map((appt) => (
                          <div
                            key={appt.id}
                            className="flex items-center gap-2 rounded-md px-1.5 py-1.5 transition-colors hover:bg-muted/50"
                          >
                            <Avatar size="sm">
                              <AvatarFallback className="text-[9px]">
                                {appt.patientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[10px] font-medium text-foreground">
                                {appt.patientName}
                              </p>
                              <p className="truncate text-[9px] text-muted-foreground">
                                {appt.startTime}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`shrink-0 border px-1.5 py-0 text-[8px] font-medium ${
                                statusStyles[appt.status] ?? ""
                              }`}
                            >
                              {appt.status === "CONFIRMED"
                                ? "Confirmado"
                                : appt.status === "SCHEDULED"
                                  ? "Agendado"
                                  : "Andamento"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
