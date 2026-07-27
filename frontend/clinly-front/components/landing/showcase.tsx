"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCog,
  BarChart3,
  Settings,
  Activity,
  Bell,
  Search,
  ChevronLeft,
  CalendarDays,
  UserPlus,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useRef } from "react";
import {
  mockDashboardCharts,
  mockAppointments,
  mockActivities,
} from "@/lib/mock-data";

const sidebarItems = [
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
    description: "agendamentos para hoje",
    icon: CalendarDays,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Pacientes Ativos",
    value: "847",
    description: "pacientes cadastrados",
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

const PIE_COLORS = ["#2563EB", "#7C3AED", "#059669", "#D97706"];

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SCHEDULED: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const statusLabels: Record<string, string> = {
  CONFIRMED: "Confirmado",
  SCHEDULED: "Agendado",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluído",
};

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <section ref={containerRef} className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-[#2563EB]">
            Interface Premium
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Design feito para impressionar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Uma interface limpa, moderna e intuitiva que seus médicos e equipe
            vão adorar usar todos os dias.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <motion.div
            style={{ y: y1, scale }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#2563EB]/8 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-[#2563EB]/5">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-400/60" />
                  <div className="size-2.5 rounded-full bg-yellow-400/60" />
                  <div className="size-2.5 rounded-full bg-green-400/60" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                  clinly.com.br/dashboard
                </div>
              </div>

              {/* Dashboard Layout */}
              <div className="flex bg-background">
                {/* Sidebar */}
                <div className="hidden w-[220px] shrink-0 border-r border-border/50 lg:block">
                  <div className="flex h-12 items-center gap-2 border-b border-border/50 px-4">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-[#2563EB]">
                      <Activity className="size-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      Clinly
                    </span>
                    <ChevronLeft className="ml-auto size-3.5 text-muted-foreground" />
                  </div>
                  <div className="px-3 py-3">
                    <nav className="space-y-0.5">
                      {sidebarItems.map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium ${
                            item.active
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/50"
                          }`}
                        >
                          <item.icon
                            className={`size-4 shrink-0 ${
                              item.active ? "text-foreground" : ""
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </nav>
                    <div className="mt-3 border-t border-border/50 pt-3">
                      <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground">
                        <Settings className="size-4 shrink-0" />
                        <span>Configurações</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-[220px] border-t border-border/50 p-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback className="text-xs">U</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          Usuário
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          Admin
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                  {/* Topbar */}
                  <div className="flex h-12 items-center justify-between border-b border-border/50 px-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-sm font-semibold text-foreground">
                        Dashboard
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background px-3 py-1.5 text-xs text-muted-foreground">
                        <Search className="size-3" />
                        <span>Buscar...</span>
                      </div>
                      <div className="relative">
                        <Bell className="size-4 text-muted-foreground" />
                        <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#2563EB]" />
                      </div>
                      <Avatar size="sm">
                        <AvatarFallback className="text-xs">
                          US
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Page Content */}
                  <div className="p-6">
                    {/* Page Header */}
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          Visão Geral
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Confira os indicadores da sua clínica
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-emerald-200 bg-emerald-50 text-emerald-700"
                      >
                        <span className="mr-1 size-1 rounded-full bg-emerald-500" />
                        Sistema Online
                      </Badge>
                    </div>

                    {/* KPI Cards */}
                    <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                      {kpis.map((kpi) => (
                        <Card key={kpi.title}>
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground">
                              {kpi.title}
                            </CardTitle>
                            <div
                              className={`flex size-7 items-center justify-center rounded-lg ${kpi.bg}`}
                            >
                              <kpi.icon className={`size-3.5 ${kpi.color}`} />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-xl font-bold tracking-tight">
                              {kpi.value}
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              {kpi.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Charts Row */}
                    <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
                      {/* Revenue Chart */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="text-xs font-medium">
                            Receita Mensal
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={mockDashboardCharts.revenueByMonth}
                              >
                                <defs>
                                  <linearGradient
                                    id="showcaseGrad"
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
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  className="stroke-border/50"
                                />
                                <XAxis
                                  dataKey="month"
                                  className="text-xs"
                                  tick={{
                                    fill: "currentColor",
                                    fontSize: 11,
                                  }}
                                />
                                <YAxis
                                  className="text-xs"
                                  tick={{
                                    fill: "currentColor",
                                    fontSize: 11,
                                  }}
                                />
                                <Area
                                  type="monotone"
                                  dataKey="revenue"
                                  stroke="#2563EB"
                                  fillOpacity={1}
                                  fill="url(#showcaseGrad)"
                                  strokeWidth={2}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Pie Chart */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xs font-medium">
                            Consultas por Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={
                                    mockDashboardCharts.appointmentsByStatus
                                  }
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={45}
                                  outerRadius={75}
                                  paddingAngle={4}
                                  dataKey="count"
                                  nameKey="status"
                                >
                                  {mockDashboardCharts.appointmentsByStatus.map(
                                    (_, index) => (
                                      <Cell
                                        key={index}
                                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                                      />
                                    )
                                  )}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="mt-2 flex flex-wrap justify-center gap-3">
                            {mockDashboardCharts.appointmentsByStatus.map(
                              (item, i) => (
                                <div
                                  key={item.status}
                                  className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                                >
                                  <span
                                    className="size-2 rounded-full"
                                    style={{
                                      backgroundColor:
                                        PIE_COLORS[i % PIE_COLORS.length],
                                    }}
                                  />
                                  {item.status}
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Bottom Row: Appointments + Activity */}
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                      {/* Appointments */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xs font-medium">
                            Próximos Atendimentos
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            {mockAppointments.map((appt) => (
                              <div
                                key={appt.id}
                                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
                              >
                                <Avatar size="sm">
                                  <AvatarFallback>
                                    {appt.patientName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .slice(0, 2)
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-foreground">
                                    {appt.patientName}
                                  </p>
                                  <p className="truncate text-xs text-muted-foreground">
                                    {appt.professionalName} · {appt.startTime}{" "}
                                    - {appt.endTime}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={`shrink-0 text-xs font-medium ${
                                    statusStyles[appt.status] ?? ""
                                  }`}
                                >
                                  {statusLabels[appt.status] ?? appt.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Activity Feed */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xs font-medium">
                            Atividade Recente
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            {mockActivities.map((activity) => (
                              <div
                                key={activity.id}
                                className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
                              >
                                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#2563EB]" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-foreground">
                                    {activity.description}
                                  </p>
                                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="size-3" />
                                    {new Date(
                                      activity.timestamp
                                    ).toLocaleString("pt-BR", {
                                      day: "2-digit",
                                      month: "short",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating accent elements */}
          <motion.div
            style={{ y: y2 }}
            className="pointer-events-none absolute -right-12 top-1/4 hidden xl:block"
          >
            <div className="size-24 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 to-violet-500/10 blur-sm" />
          </motion.div>
          <motion.div
            style={{ y: y1 }}
            className="pointer-events-none absolute -left-8 bottom-1/4 hidden xl:block"
          >
            <div className="size-16 rounded-xl bg-gradient-to-br from-emerald-500/10 to-[#2563EB]/10 blur-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
