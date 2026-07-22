"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

const themes = [
  { value: "light" as const, label: "Claro", icon: Sun },
  { value: "dark" as const, label: "Escuro", icon: Moon },
  { value: "system" as const, label: "Sistema", icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const CurrentIcon = theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground" aria-label="Alternar tema" />
        }
      >
        <CurrentIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={theme === t.value ? "bg-accent text-accent-foreground" : ""}
          >
            <t.icon className="size-4" />
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
