import axios from "axios";
import type {
  Patient,
  PatientFormData,
  PatientQueryParams,
  PaginatedResponse,
  Staff,
  StaffFormData,
  StaffQueryParams,
  Appointment,
  AppointmentFormData,
  AppointmentQueryParams,
  DashboardSummary,
  DashboardChartData,
  RecentActivity,
  ReportSummary,
  ReportChartData,
  ReportQueryParams,
  Notification,
} from "./types";
import {
  mockDashboardSummary,
  mockDashboardCharts,
  mockActivities,
  mockAppointments,
  mockStaff,
  mockPatients,
  mockReportSummary,
  mockReportCharts,
  mockNotifications,
} from "./mock-data";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("@App:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (
      (status === 401 || status === 403) &&
      typeof window !== "undefined" &&
      !error.config?.url?.startsWith("/auth/")
    ) {
      localStorage.removeItem("@App:token");
      localStorage.removeItem("@App:email");
      localStorage.removeItem("@App:name");
      localStorage.removeItem("@App:role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export type PostRegister = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type PostRegisterResponse = {
  token: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
};

export type PostLogin = {
  email: string;
  password: string;
};

export type PostLoginResponse = {
  token: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
};

export async function postRegister(data: PostRegister): Promise<PostRegisterResponse> {
  const response = await api.post<PostRegisterResponse>("/auth/register", data);
  return response.data;
}

export async function postLogin(data: PostLogin): Promise<PostLoginResponse> {
  const response = await api.post<PostLoginResponse>("/auth/login", data);
  return response.data;
}

// Dashboard
export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const response = await api.get<DashboardSummary>("/dashboard/summary");
    return response.data;
  } catch {
    return mockDashboardSummary;
  }
}

export async function getDashboardCharts(): Promise<DashboardChartData> {
  try {
    const response = await api.get<DashboardChartData>("/dashboard/charts");
    return response.data;
  } catch {
    return mockDashboardCharts;
  }
}

export async function getDashboardActivities(): Promise<RecentActivity[]> {
  try {
    const response = await api.get<RecentActivity[]>("/dashboard/activities");
    return response.data;
  } catch {
    return mockActivities;
  }
}

// Patients
export async function getPatients(params: PatientQueryParams): Promise<PaginatedResponse<Patient>> {
  try {
    const response = await api.get<PaginatedResponse<Patient>>("/patients", { params });
    return response.data;
  } catch {
    const page = params.page ?? 0;
    const size = params.size ?? 10;
    const start = page * size;
    let filtered = [...mockPatients];
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
    }
    if (params.status) {
      filtered = filtered.filter((p) => p.status === params.status);
    }
    return {
      content: filtered.slice(start, start + size),
      page,
      size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      last: start + size >= filtered.length,
    };
  }
}

export async function getPatient(id: string): Promise<Patient> {
  try {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  } catch {
    return mockPatients.find((p) => p.id === id) ?? mockPatients[0];
  }
}

export async function createPatient(data: PatientFormData): Promise<Patient> {
  const response = await api.post<Patient>("/patients", data);
  return response.data;
}

export async function updatePatient(id: string, data: PatientFormData): Promise<Patient> {
  const response = await api.put<Patient>(`/patients/${id}`, data);
  return response.data;
}

export async function deletePatient(id: string): Promise<void> {
  await api.delete(`/patients/${id}`);
}

// Appointments
export async function getAppointments(params: AppointmentQueryParams): Promise<PaginatedResponse<Appointment>> {
  try {
    const response = await api.get<PaginatedResponse<Appointment>>("/appointments", { params });
    return response.data;
  } catch {
    const page = params.page ?? 0;
    const size = params.size ?? 10;
    const start = page * size;
    let filtered = [...mockAppointments];
    if (params.professionalId) {
      filtered = filtered.filter((a) => a.professionalId === params.professionalId);
    }
    if (params.status) {
      filtered = filtered.filter((a) => a.status === params.status);
    }
    if (params.startDate) {
      filtered = filtered.filter((a) => a.date >= params.startDate!);
    }
    if (params.endDate) {
      filtered = filtered.filter((a) => a.date <= params.endDate!);
    }
    return {
      content: filtered.slice(start, start + size),
      page,
      size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      last: start + size >= filtered.length,
    };
  }
}

export async function createAppointment(data: AppointmentFormData): Promise<Appointment> {
  const response = await api.post<Appointment>("/appointments", data);
  return response.data;
}

export async function updateAppointment(id: string, data: AppointmentFormData): Promise<Appointment> {
  const response = await api.put<Appointment>(`/appointments/${id}`, data);
  return response.data;
}

export async function deleteAppointment(id: string): Promise<void> {
  await api.delete(`/appointments/${id}`);
}

// Professionals
export async function getProfessionals(): Promise<Staff[]> {
  try {
    const response = await api.get<Staff[]>("/professionals");
    return response.data;
  } catch {
    return mockStaff.filter((s) => s.role === "DOCTOR" && s.status === "ACTIVE");
  }
}

// Staff
export async function getStaff(params: StaffQueryParams): Promise<PaginatedResponse<Staff>> {
  try {
    const response = await api.get<PaginatedResponse<Staff>>("/staff", { params });
    return response.data;
  } catch {
    const page = params.page ?? 0;
    const size = params.size ?? 10;
    const start = page * size;
    let filtered = [...mockStaff];
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
    }
    if (params.role) {
      filtered = filtered.filter((s) => s.role === params.role);
    }
    if (params.status) {
      filtered = filtered.filter((s) => s.status === params.status);
    }
    return {
      content: filtered.slice(start, start + size),
      page,
      size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      last: start + size >= filtered.length,
    };
  }
}

export async function getStaffMember(id: string): Promise<Staff> {
  const response = await api.get<Staff>(`/staff/${id}`);
  return response.data;
}

export async function createStaffMember(data: StaffFormData): Promise<Staff> {
  const response = await api.post<Staff>("/staff", data);
  return response.data;
}

export async function updateStaffMember(id: string, data: StaffFormData): Promise<Staff> {
  const response = await api.put<Staff>(`/staff/${id}`, data);
  return response.data;
}

export async function deleteStaffMember(id: string): Promise<void> {
  await api.delete(`/staff/${id}`);
}

// Reports
export async function getReportSummary(params: ReportQueryParams): Promise<ReportSummary> {
  try {
    const response = await api.get<ReportSummary>("/reports/summary", { params });
    return response.data;
  } catch {
    return mockReportSummary;
  }
}

export async function getReportCharts(params: ReportQueryParams): Promise<ReportChartData> {
  try {
    const response = await api.get<ReportChartData>("/reports/charts", { params });
    return response.data;
  } catch {
    return mockReportCharts;
  }
}

// Notifications
export async function getNotifications(): Promise<Notification[]> {
  try {
    const response = await api.get<Notification[]>("/notifications");
    return response.data;
  } catch {
    return mockNotifications;
  }
}
