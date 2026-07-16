"use client";

import React, { useState } from "react";
import { ShieldIcon, AtSignIcon } from "@/components/ui/auth-icons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="/login.png"
          alt="Redefinir Senha"
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShieldIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Redefinir Senha
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Informe seu e-mail para receber um link de redefinição
            </p>
          </div>

          {submitted ? (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Verifique seu e-mail
              </h3>
              <p className="text-sm text-gray-500">
                Enviamos um link de redefinição de senha para{" "}
                <span className="font-medium text-gray-900">{email}</span>
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Não recebeu o e-mail? Tentar novamente
              </button>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <AtSignIcon />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 text-sm"
              >
                Enviar link de redefinição
              </button>
            </form>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Lembra sua senha?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Entrar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
