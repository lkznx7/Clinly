"use client";

import { useState } from "react";

const patientsData = [
  { id: "1", initials: "MS", name: "Maria Silva", age: 34, email: "maria@email.com", phone: "(11) 99999-1111", condition: "Transtorno de Ansiedade", status: "active", lastVisit: "2026-07-10", nextAppt: "2026-07-22", professional: "Dr. Ana Costa", sessions: 12 },
  { id: "2", initials: "JS", name: "João Santos", age: 45, email: "joao@email.com", phone: "(11) 99999-2222", condition: "Depressão", status: "active", lastVisit: "2026-07-08", nextAppt: "2026-07-20", professional: "Dr. Pedro Lima", sessions: 8 },
  { id: "3", initials: "LF", name: "Lucia Ferreira", age: 28, email: "lucia@email.com", phone: "(11) 99999-3333", condition: "TEPT", status: "pending", lastVisit: "2026-07-05", professional: "Dr. Ana Costa", sessions: 3 },
  { id: "4", initials: "CM", name: "Carlos Mendes", age: 52, email: "carlos@email.com", phone: "(11) 99999-4444", condition: "Transtorno Bipolar", status: "active", lastVisit: "2026-07-12", nextAppt: "2026-07-24", professional: "Dr. Pedro Lima", sessions: 20 },
  { id: "5", initials: "AO", name: "Ana Oliveira", age: 39, email: "ana@email.com", phone: "(11) 99999-5555", condition: "TOC", status: "inactive", lastVisit: "2026-06-15", professional: "Dr. Ana Costa", sessions: 15 },
  { id: "6", initials: "RL", name: "Roberto Lima", age: 61, email: "roberto@email.com", phone: "(11) 99999-6666", condition: "Insônia", status: "active", lastVisit: "2026-07-11", nextAppt: "2026-07-18", professional: "Dr. Pedro Lima", sessions: 6 },
  { id: "7", initials: "FC", name: "Fernanda Costa", age: 31, email: "fernanda@email.com", phone: "(11) 99999-7777", condition: "Transtorno do Pânico", status: "active", lastVisit: "2026-07-09", nextAppt: "2026-07-16", professional: "Dr. Ana Costa", sessions: 10 },
];

const statusColors: Record<string, string> = {
  active: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
  inactive: "bg-gray-100 text-gray-600",
};

const statusLabels: Record<string, string> = {
  active: "Ativo",
  pending: "Pendente",
  inactive: "Inativo",
};

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = patientsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-500 mt-1">{patientsData.length} pacientes cadastrados</p>
        </div>
        <button className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          Cadastrar Paciente
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Pesquisar pacientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Todos os Status</option>
          <option value="active">Ativo</option>
          <option value="pending">Pendente</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contato</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Condição</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Próxima Consulta</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Sessões</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                        {patient.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.age} anos</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <p className="text-sm text-gray-600">{patient.email}</p>
                    <p className="text-xs text-gray-400">{patient.phone}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600">{patient.condition}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
                      {statusLabels[patient.status] || patient.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-600">{patient.nextAppt || "—"}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-600">{patient.sessions}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <p className="mt-3 text-sm text-gray-500">Nenhum paciente encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
