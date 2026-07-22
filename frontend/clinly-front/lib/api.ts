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

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
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
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !error.config?.url?.startsWith("/auth/")
    ) {
      localStorage.removeItem("@App:token");
      localStorage.removeItem("@App:email");
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

// TODO: GET /dashboard - Dashboard summary and charts data
export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get<DashboardSummary>("/dashboard/summary");
  return response.data;
}

export async function getDashboardCharts(): Promise<DashboardChartData> {
  const response = await api.get<DashboardChartData>("/dashboard/charts");
  return response.data;
}

export async function getDashboardActivities(): Promise<RecentActivity[]> {
  const response = await api.get<RecentActivity[]>("/dashboard/activities");
  return response.data;
}

// TODO: /patients endpoints
export async function getPatients(params: PatientQueryParams): Promise<PaginatedResponse<Patient>> {
  const response = await api.get<PaginatedResponse<Patient>>("/patients", { params });
  return response.data;
}

export async function getPatient(id: string): Promise<Patient> {
  const response = await api.get<Patient>(`/patients/${id}`);
  return response.data;
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

// TODO: /appointments endpoints
export async function getAppointments(params: AppointmentQueryParams): Promise<PaginatedResponse<Appointment>> {
  const response = await api.get<PaginatedResponse<Appointment>>("/appointments", { params });
  return response.data;
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

// TODO: /professionals endpoints (for calendar dropdown)
export async function getProfessionals(): Promise<Staff[]> {
  const response = await api.get<Staff[]>("/professionals");
  return response.data;
}

// TODO: /staff endpoints
export async function getStaff(params: StaffQueryParams): Promise<PaginatedResponse<Staff>> {
  const response = await api.get<PaginatedResponse<Staff>>("/staff", { params });
  return response.data;
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

// TODO: /reports endpoints
export async function getReportSummary(params: ReportQueryParams): Promise<ReportSummary> {
  const response = await api.get<ReportSummary>("/reports/summary", { params });
  return response.data;
}

export async function getReportCharts(params: ReportQueryParams): Promise<ReportChartData> {
  const response = await api.get<ReportChartData>("/reports/charts", { params });
  return response.data;
}

// TODO: /notifications endpoints
export async function getNotifications(): Promise<Notification[]> {
  const response = await api.get<Notification[]>("/notifications");
  return response.data;
}
