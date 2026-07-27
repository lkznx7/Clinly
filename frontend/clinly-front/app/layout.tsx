import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Clinly — Gestão Inteligente de Clínicas",
    template: "%s | Clinly",
  },
  description:
    "A plataforma completa para gestão de clínicas. Agendamento online, prontuário eletrônico, controle financeiro e muito mais. Experimente grátis.",
  keywords: [
    "gestão clínica",
    "prontuário eletrônico",
    "agendamento médico",
    "software clínica",
    "saúde digital",
  ],
  openGraph: {
    title: "Clinly — Gestão Inteligente de Clínicas",
    description:
      "A plataforma completa para gestão de clínicas. Agendamento online, prontuário eletrônico, controle financeiro e muito mais.",
    siteName: "Clinly",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinly — Gestão Inteligente de Clínicas",
    description:
      "A plataforma completa para gestão de clínicas. Agendamento online, prontuário eletrônico, controle financeiro e muito mais.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
