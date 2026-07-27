"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: "Você aceitar os termos e a política de privacidade",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const acceptTerms = useWatch({ control: form.control, name: "acceptTerms" });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      console.error("Erro no registro:", error);
      if (error instanceof Error && error.message === "Network Error") {
        toast.error("Servidor indisponível. Verifique se o backend está rodando.");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
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
              Criar sua conta
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Comece gratuitamente. Configure em minutos.
            </p>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-3">
                <LoginSocialButton provider="google" />
                <LoginSocialButton provider="github" />
              </div>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  ou registre-se com e-mail
                </span>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

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
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita a senha"
                    {...form.register("confirmPassword")}
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    className="mt-0.5"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => form.setValue("acceptTerms", checked === true, { shouldValidate: true })}
                  />
                  <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                    Aceito os{" "}
                    <Link href="#" className="text-[#2563EB] hover:underline">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link href="#" className="text-[#2563EB] hover:underline">
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>
                {form.formState.errors.acceptTerms && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.acceptTerms.message}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Criando conta..." : "Criar Conta Grátis"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-[#2563EB] hover:underline">
              Fazer login
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
            Comece a gerenciar sua clínica hoje
          </h2>
          <p className="mt-4 text-muted-foreground">
            Crie sua conta gratuita e descubra como o Clinly pode transformar a
            gestão da sua clínica.
          </p>
          <div className="mt-8 space-y-3 text-left">
            {[
              "14 dias de teste gratuito",
              "Sem necessidade de cartão de crédito",
              "Migração de dados assistida",
              "Suporte dedicado na ativação",
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
