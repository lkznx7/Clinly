"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/layout/auth-guard";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
        <TooltipProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </TooltipProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
