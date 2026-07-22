"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { LoginSocialButton } from "@/components/auth/login-social-button";
import { Activity, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Login realizado com sucesso!");
    } catch {
      toast.error("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Left side — Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-md"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar ao site
          </Link>

          <div className="mb-8">
            <Link href="/" className="mb-6 inline-flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB]">
                <Activity className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Clinly
              </span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Entrar na plataforma
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Bem-vindo de volta. Faça login para continuar.
            </p>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              {/* Social logins */}
              <div className="grid grid-cols-2 gap-3">
                <LoginSocialButton provider="google" />
                <LoginSocialButton provider="github" />
              </div>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  ou continue com e-mail
                </span>
              </div>

              {/* Form */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-[#2563EB] hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...form.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                    Lembrar-me por 30 dias
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/register" className="font-medium text-[#2563EB] hover:underline">
              Criar conta grátis
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side — Decorative */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-br from-[#2563EB]/5 via-background to-[#2563EB]/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md px-8 text-center"
        >
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#2563EB]/10">
            <Activity className="size-8 text-[#2563EB]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Gestão que simplifica sua clínica
          </h2>
          <p className="mt-4 text-muted-foreground">
            Acesse agendamentos, prontuários, relatórios e muito mais em uma
            única plataforma moderna e intuitiva.
          </p>
          <div className="mt-8 space-y-3 text-left">
            {[
              "Agendamento inteligente",
              "Prontuário eletrônico completo",
              "Relatórios financeiros em tempo real",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 shrink-0 text-[#2563EB]" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
