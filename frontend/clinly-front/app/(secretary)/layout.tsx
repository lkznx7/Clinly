"use client";

import { AuthGuard } from "@/components/layout/auth-guard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function SecretaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <TooltipProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </TooltipProvider>
    </AuthGuard>
  );
}
