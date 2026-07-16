"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "clinic" | "notifications" | "security">("profile");

  const tabs = [
    { id: "profile" as const, label: "Perfil" },
    { id: "clinic" as const, label: "Clínica" },
    { id: "notifications" as const, label: "Notificações" },
    { id: "security" as const, label: "Segurança" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Configurações</h1>
        <p className="text-sm text-gray-500">Gerencie sua conta e preferências</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex gap-0 px-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-5">
          {activeTab === "profile" && (
            <div className="max-w-2xl space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-medium">
                  JD
                </div>
                <div>
                  <button className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Alterar foto
                  </button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG. Máx. 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input type="text" defaultValue="John" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                  <input type="text" defaultValue="Doe" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input type="email" defaultValue="john.doe@clinly.com" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input type="tel" defaultValue="(11) 99999-0000" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  <input type="text" defaultValue="Psicólogo(a) Clínico(a)" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registro</label>
                  <input type="text" defaultValue="CRP 12345" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                <textarea rows={3} defaultValue="Psicólogo(a) clínico(a) com experiência em terapia cognitivo-comportamental." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" />
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Salvar alterações
                </button>
              </div>
            </div>
          )}

          {activeTab === "clinic" && (
            <div className="max-w-2xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da clínica</label>
                  <input type="text" defaultValue="Clinly Psicologia" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input type="email" defaultValue="contato@clinly.com" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input type="tel" defaultValue="(11) 3000-1234" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input type="url" defaultValue="https://clinly.com" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input type="text" defaultValue="Rua Augusta, 1234 - São Paulo, SP" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuso horário</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>America/Sao_Paulo</option>
                    <option>America/New_York</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moeda</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>BRL (R$)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Português</option>
                    <option>Inglês</option>
                    <option>Espanhol</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Horário de Funcionamento</h3>
                <div className="space-y-1.5">
                  {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map((day) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="w-20 text-sm text-gray-600">{day}</span>
                      <input type="time" defaultValue="08:00" className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <span className="text-gray-400">até</span>
                      <input type="time" defaultValue="18:00" className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <label className="flex items-center gap-1.5">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                        <span className="text-xs text-gray-500">Ativo</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Salvar alterações
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="max-w-2xl space-y-4">
              <div className="space-y-2">
                {[
                  { category: "Consultas", desc: "Notificações sobre consultas próximas e alterações" },
                  { category: "Pacientes", desc: "Cadastros e atualizações de pacientes" },
                  { category: "Sistema", desc: "Atualizações, manutenção e alertas de segurança" },
                  { category: "Faturamento", desc: "Confirmações de pagamento e lembretes" },
                ].map((item) => (
                  <div key={item.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.category}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                        <span className="text-xs text-gray-500">E-mail</span>
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                        <span className="text-xs text-gray-500">Push</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Salvar preferências
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Alterar Senha</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha atual</label>
                    <input type="password" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
                    <input type="password" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova senha</label>
                    <input type="password" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                  <div className="flex justify-end">
                    <button className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                      Atualizar senha
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Autenticação em Duas Etapas</h3>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Aplicativo Autenticador</p>
                    <p className="text-xs text-gray-500">Use um aplicativo autenticador para gerar códigos únicos</p>
                  </div>
                  <button className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Ativar
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Sessões Ativas</h3>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-lg bg-green-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="8" x2="16" y1="21" y2="21" />
                        <line x1="12" x2="12" y1="17" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Windows — Chrome</p>
                      <p className="text-xs text-gray-500">São Paulo, Brasil • Sessão atual</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Ativa</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-sm font-medium text-red-600 mb-1">Zona de Perigo</h3>
                <p className="text-xs text-gray-500 mb-3">Excluir permanentemente sua conta e todos os dados associados.</p>
                <button className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  Excluir conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
