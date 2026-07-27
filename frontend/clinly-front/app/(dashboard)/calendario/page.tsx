"use client";

import { useState, useMemo, useCallback } from "react";
import { useFetch } from "@/lib/hooks";
import { getAppointments, getProfessionals, createAppointment, updateAppointment, deleteAppointment } from "@/lib/api";
import type { Appointment, AppointmentFormData, AppointmentQueryParams, Staff, PaginatedResponse } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { ErrorState } from "@/components/shared/error-state";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

type ViewMode = "month" | "week" | "day";

const MONTH_NAMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_NAMES_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function CalendarioPage() {
  const today = new Date();
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(today);
  const [formOpen, setFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: "",
    professionalId: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "CONSULTATION",
    notes: "",
  });

  const startDate = useMemo(() => {
    if (viewMode === "month") {
      return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`;
    }
    if (viewMode === "week") {
      const d = new Date(currentDate);
      d.setDate(d.getDate() - d.getDay());
      return formatDateKey(d);
    }
    return formatDateKey(currentDate);
  }, [viewMode, currentDate]);

  const endDate = useMemo(() => {
    if (viewMode === "month") {
      const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
      return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(days).padStart(2, "0")}`;
    }
    if (viewMode === "week") {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + (6 - d.getDay()));
      return formatDateKey(d);
    }
    return formatDateKey(currentDate);
  }, [viewMode, currentDate]);

  const queryParams = useMemo<AppointmentQueryParams>(
    () => ({ startDate, endDate, size: 200, sort: "startAt,asc" }),
    [startDate, endDate]
  );

  const fetcher = useCallback(() => getAppointments(queryParams), [queryParams]);
  const { data: appointmentsData, loading, error, refetch } = useFetch<PaginatedResponse<Appointment>>(fetcher, [queryParams]);
  const { data: professionals, loading: loadingPros } = useFetch<Staff[]>(() => getProfessionals(), []);

  const appointments = useMemo(() => appointmentsData?.content ?? [], [appointmentsData]);

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    appointments.forEach((appt) => {
      const key = appt.date;
      if (!map[key]) map[key] = [];
      map[key].push(appt);
    });
    return map;
  }, [appointments]);

  function navigatePeriod(direction: number) {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() + direction);
    else if (viewMode === "week") d.setDate(d.getDate() + direction * 7);
    else d.setDate(d.getDate() + direction);
    setCurrentDate(d);
  }

  function openCreate(date?: string) {
    setEditingAppointment(null);
    setFormData({
      patientId: "",
      professionalId: "",
      date: date || formatDateKey(today),
      startTime: "09:00",
      endTime: "09:30",
      type: "CONSULTATION",
      notes: "",
    });
    setFormOpen(true);
  }

  function openEdit(appt: Appointment) {
    setEditingAppointment(appt);
    setFormData({
      patientId: appt.patientId,
      professionalId: appt.professionalId,
      date: appt.date,
      startTime: appt.startTime,
      endTime: appt.endTime,
      type: appt.type,
      notes: appt.notes ?? "",
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment.id, formData);
        toast.success("Consulta atualizada com sucesso.");
      } else {
        await createAppointment(formData);
        toast.success("Consulta criada com sucesso.");
      }
      setFormOpen(false);
      refetch();
    } catch {
      toast.error("Erro ao salvar consulta. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingAppointment) return;
    setDeleting(true);
    try {
      await deleteAppointment(deletingAppointment.id);
      toast.success("Consulta cancelada com sucesso.");
      setDeleteOpen(false);
      setDeletingAppointment(null);
      refetch();
    } catch {
      toast.error("Erro ao cancelar consulta. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  const calendarDays = useMemo(() => {
    if (viewMode !== "month") return [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  }, [currentDate, viewMode]);

  const weekDays = useMemo(() => {
    if (viewMode !== "week") return [];
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay());
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  }, [currentDate, viewMode]);

  const hours = Array.from({ length: 13 }, (_, i) => i + 7);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendário"
        description="Gerencie consultas e agendamentos"
        action={
          <Button onClick={() => openCreate()} size="sm">
            <Plus className="size-3.5" />
            Nova Consulta
          </Button>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" onClick={() => navigatePeriod(-1)}>
            <ChevronLeft className="size-4" />
          </Button>
          <h2 className="min-w-[180px] text-center text-sm font-semibold text-foreground">
            {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button variant="outline" size="icon-sm" onClick={() => navigatePeriod(1)}>
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(today)}>
            Hoje
          </Button>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
          {(["month", "week", "day"] as ViewMode[]).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              size="xs"
              onClick={() => setViewMode(mode)}
            >
              {mode === "month" ? "Mês" : mode === "week" ? "Semana" : "Dia"}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {error ? (
              <div className="p-6">
                <ErrorState message={error} onRetry={refetch} />
              </div>
            ) : viewMode === "month" ? (
              <div>
                <div className="grid grid-cols-7 border-b">
                  {DAY_NAMES.map((day) => (
                    <div key={day} className="px-2 py-2.5 text-center text-xs font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {calendarDays.map(({ date, isCurrentMonth }, idx) => {
                    const key = formatDateKey(date);
                    const dayAppts = appointmentsByDate[key] ?? [];
                    const isToday = formatDateKey(date) === formatDateKey(today);
                    return (
                      <div
                        key={idx}
                        className={`min-h-[100px] border-b border-r p-1.5 transition-colors hover:bg-muted/30 cursor-pointer ${
                          !isCurrentMonth ? "bg-muted/20 text-muted-foreground" : ""
                        }`}
                        onClick={() => openCreate(key)}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                              isToday
                                ? "bg-[#2563EB] text-white"
                                : isCurrentMonth
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {date.getDate()}
                          </span>
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {dayAppts.slice(0, 3).map((appt) => (
                            <Tooltip key={appt.id}>
                              <TooltipTrigger render={<div
                                className="truncate rounded px-1 py-0.5 text-[10px] font-medium cursor-pointer bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                onClick={(e) => { e.stopPropagation(); openEdit(appt); }}
                              />}>
                                {appt.startTime} {appt.patientName.split(" ")[0]}
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-medium">{appt.patientName}</p>
                                <p>{appt.startTime} - {appt.endTime}</p>
                                <p>{appt.professionalName}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                          {dayAppts.length > 3 && (
                            <p className="text-[10px] text-muted-foreground px-1">
                              +{dayAppts.length - 3} mais
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : viewMode === "week" ? (
              <div>
                <div className="grid grid-cols-8 border-b">
                  <div className="border-r px-2 py-2" />
                  {weekDays.map((d, i) => {
                    const isToday = formatDateKey(d) === formatDateKey(today);
                    return (
                      <div key={i} className="border-r px-2 py-2 text-center">
                        <p className="text-xs text-muted-foreground">{DAY_NAMES[d.getDay()]}</p>
                        <p className={`mt-0.5 text-sm font-semibold ${isToday ? "text-[#2563EB]" : "text-foreground"}`}>
                          {d.getDate()}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {hours.map((hour) => (
                    <div key={hour} className="grid grid-cols-8 border-b">
                      <div className="border-r px-2 py-2 text-xs text-muted-foreground">
                        {String(hour).padStart(2, "0")}:00
                      </div>
                      {weekDays.map((d, di) => {
                        const key = formatDateKey(d);
                        const hourAppts = (appointmentsByDate[key] ?? []).filter(
                          (a) => parseInt(a.startTime.split(":")[0]) === hour
                        );
                        return (
                          <div key={di} className="border-r p-0.5 min-h-[48px]">
                            {hourAppts.map((appt) => (
                              <div
                                key={appt.id}
                                className="mb-0.5 cursor-pointer rounded bg-blue-50 px-1 py-0.5 text-[10px] text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                onClick={() => openEdit(appt)}
                              >
                                <p className="font-medium truncate">{appt.patientName.split(" ")[0]}</p>
                                <p>{appt.startTime}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    {DAY_NAMES_FULL[currentDate.getDay()]} {currentDate.getDate()} de {MONTH_NAMES[currentDate.getMonth()]}
                  </p>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {hours.map((hour) => {
                    const key = formatDateKey(currentDate);
                    const hourAppts = (appointmentsByDate[key] ?? []).filter(
                      (a) => parseInt(a.startTime.split(":")[0]) === hour
                    );
                    return (
                      <div key={hour} className="flex border-b">
                        <div className="w-16 shrink-0 border-r px-2 py-3 text-xs text-muted-foreground">
                          {String(hour).padStart(2, "0")}:00
                        </div>
                        <div className="flex-1 p-1 min-h-[48px]">
                          {hourAppts.map((appt) => (
                            <div
                              key={appt.id}
                              className="mb-1 cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 dark:border-blue-800 dark:bg-blue-950"
                              onClick={() => openEdit(appt)}
                            >
                              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{appt.patientName}</p>
                              <p className="text-xs text-blue-600 dark:text-blue-400">
                                {appt.startTime} - {appt.endTime} · {appt.professionalName}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : appointments.length === 0 ? (
              <EmptyState
                title="Sem consultas"
                description="Nenhuma consulta encontrada para este período."
                icon={<CalendarIcon className="size-6" />}
              />
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {appointments.slice(0, 10).map((appt) => (
                  <div
                    key={appt.id}
                    className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    onClick={() => openEdit(appt)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{appt.patientName}</p>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {appt.date} · {appt.startTime} - {appt.endTime}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{appt.professionalName}</p>
                      </div>
                      <StatusBadge status={appt.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAppointment ? "Editar Consulta" : "Nova Consulta"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Data</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Tipo</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as AppointmentFormData["type"] })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONSULTATION">Consulta</SelectItem>
                    <SelectItem value="FOLLOW_UP">Retorno</SelectItem>
                    <SelectItem value="EXAM">Exame</SelectItem>
                    <SelectItem value="PROCEDURE">Procedimento</SelectItem>
                    <SelectItem value="TELEMEDICINE">Telemedicina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Horário Início</Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Horário Fim</Label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Profissional</Label>
                <Select value={formData.professionalId} onValueChange={(v) => { if (v) setFormData({ ...formData, professionalId: v }) }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingPros ? (
                      <SelectItem value="loading" disabled>Carregando...</SelectItem>
                    ) : (
                      professionals?.map((pro) => (
                        <SelectItem key={pro.id} value={pro.id}>
                          {pro.name} {pro.specialty ? `- ${pro.specialty}` : ""}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Observações</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observações sobre a consulta..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              {editingAppointment && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => { setFormOpen(false); setDeletingAppointment(editingAppointment); setDeleteOpen(true); }}
                  className="mr-auto"
                >
                  <Trash2 className="size-3.5" />
                  Cancelar Consulta
                </Button>
              )}
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                Fechar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Salvando..." : editingAppointment ? "Salvar" : "Criar Consulta"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Cancelar consulta"
        description={`Tem certeza que deseja cancelar esta consulta? Esta ação não pode ser desfeita.`}
        confirmLabel="Cancelar Consulta"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
