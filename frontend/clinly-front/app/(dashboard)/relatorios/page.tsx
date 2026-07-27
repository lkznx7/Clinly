"use client";

import { useState, useMemo, useCallback } from "react";
import { useFetch } from "@/lib/hooks";
import { getReportSummary, getReportCharts } from "@/lib/api";
import type { ReportSummary, ReportChartData, ReportQueryParams } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { ErrorState } from "@/components/shared/error-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  DollarSign,
  Calendar,
  Users,
  TrendingDown,
  Ban,
  FileText,
  FileSpreadsheet,
} from "lucide-react";

const COLORS = ["#2563EB", "#7C3AED", "#059669", "#D97706", "#DC2626", "#6B7280"];

function KPISkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20" />
      </CardContent>
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </CardContent>
    </Card>
  );
}

export default function RelatoriosPage() {
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);

  const queryParams = useMemo<ReportQueryParams>(
    () => ({ startDate, endDate }),
    [startDate, endDate]
  );

  const fetchSummary = useCallback(() => getReportSummary(queryParams), [queryParams]);
  const fetchCharts = useCallback(() => getReportCharts(queryParams), [queryParams]);

  const { data: summary, loading: summaryLoading, error: summaryError, refetch: refetchSummary } = useFetch<ReportSummary>(fetchSummary, [queryParams]);
  const { data: charts, loading: chartsLoading, error: chartsError, refetch: refetchCharts } = useFetch<ReportChartData>(fetchCharts, [queryParams]);

  const isLoading = summaryLoading || chartsLoading;
  const hasError = summaryError || chartsError;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios"
        description="Análises e indicadores da clínica"
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <FileText className="size-3.5" />
              PDF
            </Button>
            <Button variant="outline" size="sm" disabled>
              <FileSpreadsheet className="size-3.5" />
              Excel
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="space-y-1.5">
              <Label className="text-xs">Data Início</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full sm:w-40"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Data Fim</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full sm:w-40"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {hasError && !isLoading ? (
        <ErrorState
          message={summaryError || chartsError || "Erro ao carregar relatórios"}
          onRetry={() => { refetchSummary(); refetchCharts(); }}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {summaryLoading ? (
              Array.from({ length: 5 }).map((_, i) => <KPISkeleton key={i} />)
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary?.totalRevenue ?? 0)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total de Consultas</CardTitle>
                    <Calendar className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{summary?.totalAppointments ?? 0}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pacientes Atendidos</CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{summary?.totalPatients ?? 0}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Cancelamento</CardTitle>
                    <Ban className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{((summary?.cancellationRate ?? 0) * 100).toFixed(1)}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">No-Show</CardTitle>
                    <TrendingDown className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{((summary?.noShowRate ?? 0) * 100).toFixed(1)}%</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <Tabs defaultValue="revenue" className="space-y-4">
            <TabsList variant="line">
              <TabsTrigger value="revenue">Receita</TabsTrigger>
              <TabsTrigger value="appointments">Consultas</TabsTrigger>
              <TabsTrigger value="specialties">Especialidades</TabsTrigger>
              <TabsTrigger value="cancellations">Cancelamentos</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {chartsLoading ? (
                  <>
                    <ChartSkeleton />
                    <ChartSkeleton />
                  </>
                ) : (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={charts?.revenueByMonth ?? []}>
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                            <XAxis dataKey="month" tick={{ fill: "currentColor", fontSize: 11 }} />
                            <YAxis tick={{ fill: "currentColor", fontSize: 11 }} />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--popover))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                fontSize: "12px",
                              }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#2563EB" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Comparativo Mensal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={charts?.revenueByMonth ?? []}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                            <XAxis dataKey="month" tick={{ fill: "currentColor", fontSize: 11 }} />
                            <YAxis tick={{ fill: "currentColor", fontSize: 11 }} />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--popover))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                fontSize: "12px",
                              }}
                            />
                            <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Consultas por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartsLoading ? (
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={charts?.appointmentsByMonth ?? []}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="month" tick={{ fill: "currentColor", fontSize: 11 }} />
                        <YAxis tick={{ fill: "currentColor", fontSize: 11 }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Line type="monotone" dataKey="count" stroke="#7C3AED" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specialties">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Consultas por Especialidade</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartsLoading ? (
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={charts?.appointmentsBySpecialty ?? []} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis type="number" tick={{ fill: "currentColor", fontSize: 11 }} />
                        <YAxis type="category" dataKey="specialty" tick={{ fill: "currentColor", fontSize: 11 }} width={120} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                          {(charts?.appointmentsBySpecialty ?? []).map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cancellations">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Cancelamentos por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartsLoading ? (
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={charts?.cancellationByMonth ?? []}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="month" tick={{ fill: "currentColor", fontSize: 11 }} />
                        <YAxis tick={{ fill: "currentColor", fontSize: 11 }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="count" fill="#DC2626" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
