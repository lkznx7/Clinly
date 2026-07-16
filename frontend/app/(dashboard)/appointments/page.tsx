"use client";

import { useState } from "react";

const appointmentsData = [
  { id: "1", patientName: "Maria Silva", patientInitials: "MS", professionalName: "Dr. Ana Costa", type: "Retorno", date: "2026-07-15", time: "09:00", duration: 50, status: "completed", color: "bg-green-500" },
  { id: "2", patientName: "João Santos", patientInitials: "JS", professionalName: "Dr. Ana Costa", type: "Primeira Consulta", date: "2026-07-15", time: "10:00", duration: 60, status: "completed", color: "bg-blue-500" },
  { id: "3", patientName: "Lucia Ferreira", patientInitials: "LF", professionalName: "Dr. Pedro Lima", type: "Rotina", date: "2026-07-15", time: "11:30", duration: 50, status: "in-progress", color: "bg-yellow-500" },
  { id: "4", patientName: "Carlos Mendes", patientInitials: "CM", professionalName: "Dr. Ana Costa", type: "Retorno", date: "2026-07-15", time: "14:00", duration: 50, status: "scheduled", color: "bg-purple-500" },
  { id: "5", patientName: "Ana Oliveira", patientInitials: "AO", professionalName: "Dr. Pedro Lima", type: "Urgência", date: "2026-07-15", time: "15:30", duration: 60, status: "scheduled", color: "bg-red-500" },
  { id: "6", patientName: "Roberto Lima", patientInitials: "RL", professionalName: "Dr. Pedro Lima", type: "Rotina", date: "2026-07-16", time: "09:00", duration: 50, status: "scheduled", color: "bg-indigo-500" },
  { id: "7", patientName: "Fernanda Costa", patientInitials: "FC", professionalName: "Dr. Ana Costa", type: "Retorno", date: "2026-07-16", time: "10:30", duration: 50, status: "scheduled", color: "bg-green-500" },
  { id: "8", patientName: "Maria Silva", patientInitials: "MS", professionalName: "Dr. Pedro Lima", type: "Rotina", date: "2026-07-17", time: "14:00", duration: 50, status: "cancelled", color: "bg-gray-400" },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-50 text-green-700",
  "in-progress": "bg-blue-50 text-blue-700",
  scheduled: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-50 text-red-700",
  "no-show": "bg-orange-50 text-orange-700",
};

const statusLabels: Record<string, string> = {
  completed: "Concluída",
  "in-progress": "Em Andamento",
  scheduled: "Agendada",
  cancelled: "Cancelada",
  "no-show": "Não Compareceu",
};

const viewLabels: Record<string, string> = {
  day: "Dia",
  week: "Semana",
  month: "Mês",
};

export default function AppointmentsPage() {
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [search, setSearch] = useState("");

  const filtered = appointmentsData.filter(
    (a) =>
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.professionalName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultas</h1>
          <p className="text-gray-500 mt-1">Gerencie sua agenda</p>
        </div>
        <button className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          Nova Consulta
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
            placeholder="Pesquisar consultas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex bg-white border border-gray-200 rounded-lg p-0.5">
          {(["day", "week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === v ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {viewLabels[v]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{appointmentsData.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Concluídas</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{appointmentsData.filter((a) => a.status === "completed").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Agendadas</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{appointmentsData.filter((a) => a.status === "scheduled").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Canceladas</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{appointmentsData.filter((a) => a.status === "cancelled").length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Profissional</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Tipo</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Duração</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${apt.color}`} />
                      <span className="text-sm font-medium text-gray-900">{apt.time}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                        {apt.patientInitials}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{apt.patientName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-sm text-gray-600">{apt.professionalName}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600">{apt.type}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600">{apt.duration} min</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                      {statusLabels[apt.status] || apt.status}
                    </span>
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
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <p className="mt-3 text-sm text-gray-500">Nenhuma consulta encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
