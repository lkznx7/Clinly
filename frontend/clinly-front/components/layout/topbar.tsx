"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { NotificationCenter } from "./notification-center";
import { ThemeToggle } from "./theme-toggle";
import { Menu, LogOut, Settings, User } from "lucide-react";

const pageLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/pacientes": "Pacientes",
  "/calendario": "Calendário",
  "/equipe": "Equipe",
  "/relatorios": "Relatórios",
  "/configuracoes": "Configurações",
};

function getInitials(email: string): string {
  return email.split("@")[0].charAt(0).toUpperCase();
}

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const segments = pathname.split("/").filter(Boolean);
  const currentPage = segments[0] ? `/${segments[0]}` : "/dashboard";
  const label = pageLabels[currentPage] ?? "Clinly";
  const userEmail = user?.email ?? "";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm lg:px-6">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onMenuClick}
        className="lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="size-4" />
      </Button>

      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <span className="text-foreground font-medium">{label}</span>
      </nav>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <NotificationCenter />

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Menu do usuário" />}>
            <Avatar size="sm">
              <AvatarFallback>{getInitials(userEmail || "u")}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="size-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={logout}>
              <LogOut className="size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
