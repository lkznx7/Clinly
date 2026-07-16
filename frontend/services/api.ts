import type {
  Patient,
  Professional,
  Appointment,
  DashboardStats,
  WeeklyStats,
  RevenueData,
  SessionType,
  ClinicSettings,
  Notification,
  PaginatedResponse,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const patientsApi = {
  list: (params?: { search?: string; status?: string; professional?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);
    if (params?.professional) query.set("professional", params.professional);
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    return fetchApi<PaginatedResponse<Patient>>(`/patients?${query.toString()}`);
  },
  get: (id: string) => fetchApi<Patient>(`/patients/${id}`),
  create: (data: Partial<Patient>) =>
    fetchApi<Patient>("/patients", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Patient>) =>
    fetchApi<Patient>(`/patients/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    fetchApi<{ message: string }>(`/patients/${id}`, { method: "DELETE" }),
};

export const professionalsApi = {
  list: (params?: { search?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);
    return fetchApi<{ professionals: Professional[]; stats: { total: number; active: number; totalPatients: number; avgRating: number } }>(
      `/professionals?${query.toString()}`
    );
  },
  get: (id: string) => fetchApi<Professional>(`/professionals/${id}`),
  create: (data: Partial<Professional>) =>
    fetchApi<Professional>("/professionals", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Professional>) =>
    fetchApi<Professional>(`/professionals/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};

export const appointmentsApi = {
  list: (params?: { view?: string; date?: string; professional?: string }) => {
    const query = new URLSearchParams();
    if (params?.view) query.set("view", params.view);
    if (params?.date) query.set("date", params.date);
    if (params?.professional) query.set("professional", params.professional);
    return fetchApi<{ appointments: Appointment[]; stats: { total: number; completed: number; scheduled: number; cancelled: number } }>(
      `/appointments?${query.toString()}`
    );
  },
  get: (id: string) => fetchApi<Appointment>(`/appointments/${id}`),
  create: (data: Partial<Appointment>) =>
    fetchApi<Appointment>("/appointments", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Appointment>) =>
    fetchApi<Appointment>(`/appointments/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  cancel: (id: string, reason?: string) =>
    fetchApi<Appointment>(`/appointments/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ reason }),
    }),
  today: () => fetchApi<{ appointments: Appointment[]; count: number; remaining: number }>("/appointments/today"),
  weeklyStats: (week?: string) => {
    const query = week ? `?week=${week}` : "";
    return fetchApi<WeeklyStats>(`/appointments/weekly-stats${query}`);
  },
};

export const reportsApi = {
  dashboard: () => fetchApi<DashboardStats>("/reports/dashboard"),
  revenue: (period?: string) => {
    const query = period ? `?period=${period}` : "";
    return fetchApi<RevenueData>(`/reports/revenue${query}`);
  },
  sessionTypes: (period?: string) => {
    const query = period ? `?period=${period}` : "";
    return fetchApi<SessionType[]>(`/reports/session-types${query}`);
  },
};

export const notificationsApi = {
  list: (params?: { unreadOnly?: boolean; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.unreadOnly !== undefined) query.set("unreadOnly", String(params.unreadOnly));
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    return fetchApi<{ notifications: Notification[]; unreadCount: number }>(
      `/notifications?${query.toString()}`
    );
  },
  markRead: (id: string) =>
    fetchApi<{ notification: { read: boolean } }>(`/notifications/${id}/read`, { method: "PUT" }),
  markAllRead: () =>
    fetchApi<{ message: string }>("/notifications/read-all", { method: "PUT" }),
};

export const settingsApi = {
  get: () => fetchApi<ClinicSettings>("/clinic/settings"),
  update: (data: Partial<ClinicSettings>) =>
    fetchApi<ClinicSettings>("/clinic/settings", { method: "PUT", body: JSON.stringify(data) }),
};
