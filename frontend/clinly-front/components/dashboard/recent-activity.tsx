"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import type { RecentActivity } from "@/lib/types";

interface RecentActivityProps {
  data: RecentActivity[] | null;
  loading: boolean;
}

function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-3 py-3">
      <Skeleton className="size-2 rounded-full mt-1.5" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function RecentActivityFeed({ data, loading }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <ActivitySkeleton key={i} />
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <EmptyState
            title="Sem atividade"
            description="Nenhuma atividade recente para exibir."
            icon={<Clock className="size-6" />}
          />
        ) : (
          <div className="space-y-1">
            {data.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#2563EB]" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
