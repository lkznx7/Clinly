"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthGuard } from "@/components/layout/auth-guard";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <TooltipProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </TooltipProvider>
    </AuthGuard>
  );
}
