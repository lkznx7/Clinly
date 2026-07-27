export type PatientStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
export type StaffStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE";
export type AppointmentStatus = "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
export type StaffRole = "DOCTOR" | "NURSE" | "RECEPTIONIST" | "ADMIN";
export type AppointmentType = "CONSULTATION" | "FOLLOW_UP" | "EXAM" | "PROCEDURE" | "TELEMEDICINE";

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: string;
  address: string;
  status: PatientStatus;
  lastAppointment: string | null;
  nextAppointment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: string;
  address: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  specialty: string | null;
  crm: string | null;
  status: StaffStatus;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  specialty: string;
  crm: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  professionalId: string;
  professionalName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentFormData {
  patientId: string;
  professionalId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  notes: string;
}

export interface DashboardSummary {
  appointmentsToday: number;
  activePatients: number;
  newPatientsThisMonth: number;
  revenueThisMonth: number;
}

export interface RevenueByMonth {
  month: string;
  revenue: number;
}

export interface AppointmentsByType {
  type: string;
  count: number;
}

export interface AppointmentsByStatus {
  status: string;
  count: number;
}

export interface DashboardChartData {
  revenueByMonth: RevenueByMonth[];
  appointmentsByType: AppointmentsByType[];
  appointmentsByStatus: AppointmentsByStatus[];
}

export interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface ReportSummary {
  totalRevenue: number;
  totalAppointments: number;
  totalPatients: number;
  cancellationRate: number;
  noShowRate: number;
}

export interface ReportChartData {
  revenueByMonth: RevenueByMonth[];
  appointmentsByMonth: { month: string; count: number }[];
  appointmentsBySpecialty: { specialty: string; count: number }[];
  cancellationByMonth: { month: string; count: number }[];
}

export interface PatientQueryParams {
  page?: number;
  size?: number;
  search?: string;
  status?: PatientStatus;
  sort?: string;
}

export interface StaffQueryParams {
  page?: number;
  size?: number;
  search?: string;
  role?: StaffRole;
  status?: StaffStatus;
  sort?: string;
}

export interface AppointmentQueryParams {
  page?: number;
  size?: number;
  professionalId?: string;
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
  sort?: string;
}

export interface ReportQueryParams {
  startDate?: string;
  endDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
