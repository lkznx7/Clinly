"use client";

import { useState } from "react";

const professionalsData = [
  { id: "1", initials: "AC", name: "Dr. Ana Costa", specialty: "Psicologia Clínica", patients: 42, appointments: 18, rating: 4.9, status: "active", email: "ana.costa@clinly.com", phone: "(11) 98888-1111", since: "2022-03-15", specializations: ["TCC", "Ansiedade", "Depressão"] },
  { id: "2", initials: "PL", name: "Dr. Pedro Lima", specialty: "Psiquiatria", patients: 38, appointments: 15, rating: 4.8, status: "active", email: "pedro.lima@clinly.com", phone: "(11) 98888-2222", since: "2021-08-01", specializations: ["Bipolar", "TDAH", "Psicofarmacologia"] },
  { id: "3", initials: "RB", name: "Dra. Renata Barros", specialty: "Psicologia Infantil", patients: 30, appointments: 12, rating: 4.7, status: "active", email: "renata.barros@clinly.com", phone: "(11) 98888-3333", since: "2023-01-10", specializations: ["Terapia Infantil", "Psicoterapia", "TDAH"] },
  { id: "4", initials: "MS", name: "Dr. Marcos Souza", specialty: "Neuropsicologia", patients: 25, appointments: 10, rating: 4.6, status: "inactive", email: "marcos.souza@clinly.com", phone: "(11) 98888-4444", since: "2022-11-20", specializations: ["Avaliação Neuropsicológica", "TCCE", "Demência"] },
];

const statusLabels: Record<string, string> = {
  active: "Ativo",
  inactive: "Inativo",
};

export default function ProfessionalsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = professionalsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    total: professionalsData.length,
    active: professionalsData.filter((p) => p.status === "active").length,
    totalPatients: professionalsData.reduce((sum, p) => sum + p.patients, 0),
    avgRating: (professionalsData.reduce((sum, p) => sum + p.rating, 0) / professionalsData.length).toFixed(1),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profissionais</h1>
          <p className="text-gray-500 mt-1">Gerencie sua equipe</p>
        </div>
        <button className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          Cadastrar Profissional
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Ativos</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{totalStats.active}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Pacientes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalStats.totalPatients}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Avaliação Média</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{totalStats.avgRating}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Pesquisar profissionais..."
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
          <option value="inactive">Inativo</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pro) => (
          <div key={pro.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium">
                {pro.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{pro.name}</h3>
                <p className="text-xs text-gray-500">{pro.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">{pro.rating}</span>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  pro.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {statusLabels[pro.status] || pro.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{pro.patients}</p>
                <p className="text-xs text-gray-500">Pacientes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{pro.appointments}</p>
                <p className="text-xs text-gray-500">Consultas/Sem</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{pro.since.split("-")[0]}</p>
                <p className="text-xs text-gray-500">Desde</p>
              </div>
            </div>

            {pro.specializations && (
              <div className="mt-3 flex flex-wrap gap-1">
                {pro.specializations.map((spec) => (
                  <span key={spec} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6V2H8" />
            <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
          </svg>
          <p className="mt-3 text-sm text-gray-500">Nenhum profissional encontrado</p>
        </div>
      )}
    </div>
  );
}
