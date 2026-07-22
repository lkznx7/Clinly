"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import type { Appointment } from "@/lib/types";

interface AppointmentsTableProps {
  data: Appointment[] | null;
  loading: boolean;
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <Skeleton className="size-8 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-5 w-20 rounded-full" />
    </div>
  );
}

export function AppointmentsTable({ data, loading }: AppointmentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Próximos Atendimentos</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <EmptyState
            title="Nenhum agendamento"
            description="Não há consultas agendadas para exibir."
            icon={<Calendar className="size-6" />}
          />
        ) : (
          <div className="space-y-1">
            {data.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50"
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
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">
                    {appt.patientName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {appt.professionalName} · {appt.startTime} - {appt.endTime}
                  </p>
                </div>
                <StatusBadge status={appt.status} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
