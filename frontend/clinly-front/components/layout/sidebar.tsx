"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/auth-context";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Activity,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pacientes", href: "/pacientes", icon: Users },
  { name: "Calendário", href: "/calendario", icon: Calendar },
  { name: "Equipe", href: "/equipe", icon: UserCog },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
];

const secondaryNav = [
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

function getInitials(email: string): string {
  return email.split("@")[0].charAt(0).toUpperCase();
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const userEmail = user?.email ?? "";
  const userName = user?.name ?? userEmail.split("@")[0];
  const userRole = user?.role ?? "USER";

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border/50 bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-border/50 px-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]">
          <Activity className="size-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Clinly
          </span>
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onToggle}
          className="ml-auto hidden lg:flex"
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? (
            <ChevronsRight className="size-3.5" />
          ) : (
            <ChevronsLeft className="size-3.5" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-3">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            const linkContent = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon className={cn("size-4 shrink-0", isActive && "text-foreground")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger render={<div />}>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.name}</TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.name}>{linkContent}</div>;
          })}
        </nav>

        <Separator className="my-3" />

        <nav className="space-y-1">
          {secondaryNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            const linkContent = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger render={<div />}>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.name}</TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.name}>{linkContent}</div>;
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-border/50 p-3">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-2.5 py-2",
            collapsed && "justify-center px-0"
          )}
        >
          <Avatar size="sm">
            <AvatarFallback>{getInitials(userEmail || "u")}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">
                {userName}
              </p>
              <p className="truncate text-xs text-muted-foreground capitalize">{userRole.toLowerCase()}</p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={logout}
              className="shrink-0 text-muted-foreground hover:text-destructive"
              aria-label="Sair"
            >
              <LogOut className="size-3.5" />
            </Button>
          )}
        </div>
        {collapsed && (
          <Tooltip>
            <TooltipTrigger render={<div className="flex justify-center" />}>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={logout}
                className="text-muted-foreground hover:text-destructive"
                aria-label="Sair"
              >
                <LogOut className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Sair</TooltipContent>
          </Tooltip>
        )}
      </div>
    </aside>
  );
}
