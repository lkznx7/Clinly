"use client";

import { useFetch } from "@/lib/hooks";
import {
  getDashboardSummary,
  getDashboardCharts,
  getDashboardActivities,
  getAppointments,
} from "@/lib/api";
import { PageHeader } from "@/components/shared/page-header";
import { ErrorState } from "@/components/shared/error-state";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { AppointmentsTable } from "@/components/dashboard/appointments-table";
import { RecentActivityFeed } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  const {
    data: summary,
    loading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useFetch(() => getDashboardSummary());

  const {
    data: charts,
    loading: chartsLoading,
    error: chartsError,
    refetch: refetchCharts,
  } = useFetch(() => getDashboardCharts());

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    refetch: refetchActivities,
  } = useFetch(() => getDashboardActivities());

  const {
    data: appointmentsData,
    loading: appointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useFetch(() =>
    getAppointments({ page: 0, size: 5, sort: "startAt,asc" })
  );

  const hasError = summaryError || chartsError || activitiesError || appointmentsError;
  const isLoading = summaryLoading || chartsLoading || activitiesLoading || appointmentsLoading;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Visão geral da sua clínica"
      />

      {hasError && !isLoading ? (
        <ErrorState
          message={summaryError || chartsError || activitiesError || appointmentsError || "Erro desconhecido"}
          onRetry={() => {
            refetchSummary();
            refetchCharts();
            refetchActivities();
            refetchAppointments();
          }}
        />
      ) : (
        <>
          <KPICards data={summary} loading={summaryLoading} />
          <ChartsSection data={charts} loading={chartsLoading} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <AppointmentsTable
              data={appointmentsData?.content ?? null}
              loading={appointmentsLoading}
            />
            <RecentActivityFeed data={activities} loading={activitiesLoading} />
          </div>
        </>
      )}
    </div>
  );
}
