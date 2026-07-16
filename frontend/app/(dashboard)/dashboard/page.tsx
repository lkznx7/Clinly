"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  const stats = [
    { name: "Total de Pacientes", value: "248", change: "+12%", up: true },
    { name: "Sessões Hoje", value: "8", subtext: "3 restantes" },
    { name: "Receita Mensal", value: "R$ 12.450", change: "+8%", up: true },
    { name: "Satisfação Média", value: "4.8", change: "+0.2", up: true },
  ];

  const todayAppointments = [
    { time: "09:00", patient: "Maria Silva", type: "Retorno", status: "completed", professional: "Dr. Ana Costa" },
    { time: "10:00", patient: "João Santos", type: "Primeira Consulta", status: "completed", professional: "Dr. Ana Costa" },
    { time: "11:30", patient: "Lucia Ferreira", type: "Rotina", status: "in-progress", professional: "Dr. Pedro Lima" },
    { time: "14:00", patient: "Carlos Mendes", type: "Retorno", status: "scheduled", professional: "Dr. Ana Costa" },
    { time: "15:30", patient: "Ana Oliveira", type: "Urgência", status: "scheduled", professional: "Dr. Pedro Lima" },
  ];

  const statusLabels: Record<string, string> = {
    completed: "Concluída",
    "in-progress": "Em Andamento",
    scheduled: "Agendada",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, {session?.user?.name?.split(" ")[0] || "Doutor(a)"}
        </h1>
        <p className="text-gray-500 mt-1">Veja o que está acontecendo na sua clínica hoje.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{stat.name}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.change && (
                <span className={`text-xs font-medium ${stat.up ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
              )}
            </div>
            {stat.subtext && (
              <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Agenda de Hoje</h2>
              <span className="text-sm text-gray-500">{todayAppointments.length} consultas</span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {todayAppointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="w-14 text-sm font-medium text-gray-500">{apt.time}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{apt.patient}</p>
                  <p className="text-xs text-gray-500">{apt.type} — {apt.professional}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    apt.status === "completed"
                      ? "bg-green-50 text-green-700"
                      : apt.status === "in-progress"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {statusLabels[apt.status] || apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Visão Semanal</h2>
          </div>
          <div className="p-5 space-y-4">
            {[
              { day: "Seg", value: 6 },
              { day: "Ter", value: 8 },
              { day: "Qua", value: 5 },
              { day: "Qui", value: 9 },
              { day: "Sex", value: 7 },
            ].map((item) => {
              const max = 10;
              return (
                <div key={item.day} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-500 w-8">{item.day}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                      style={{ width: `${(item.value / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-6 text-right">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
