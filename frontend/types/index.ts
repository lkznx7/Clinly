export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  license?: string;
  bio?: string;
  avatar?: string;
  role: "admin" | "therapist" | "receptionist";
  language?: string;
  dateFormat?: string;
}

export interface Patient {
  id: string;
  initials: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address?: string;
  condition: string;
  status: "active" | "pending" | "inactive";
  lastVisit: string;
  nextAppt?: string;
  professional: string;
  professionalId: string;
  sessions: number;
  dob?: string;
  gender?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notes?: string;
  clinicalSummary?: ClinicalSummary;
  treatmentProgress?: TreatmentProgress[];
}

export interface ClinicalSummary {
  primaryDiagnosis: string;
  icd10Code: string;
  treatmentType: string;
  treatmentStart: string;
  frequency: string;
  insurance: string;
}

export interface TreatmentProgress {
  label: string;
  value: number;
  color: string;
}

export interface Professional {
  id: string;
  initials: string;
  name: string;
  specialty: string;
  patients: number;
  appointments: number;
  rating: number;
  status: "active" | "inactive";
  email: string;
  phone: string;
  since: string;
  bio?: string;
  specializations?: string[];
  workingHours?: WorkingHours[];
  performance?: WeeklyPerformance;
}

export interface WorkingHours {
  day: string;
  start: string;
  end: string;
}

export interface WeeklyPerformance {
  weeklyData: { day: string; value: number }[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  professionalId: string;
  professionalName: string;
  type: "initial" | "follow-up" | "emergency" | "routine";
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  color?: string;
  notes?: string;
  reminders?: AppointmentReminder[];
}

export interface AppointmentReminder {
  method: "email" | "sms";
  status: "sent" | "pending" | "failed";
  time: string;
}

export interface Notification {
  id: string;
  type: "appointment" | "patient" | "system" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface DashboardStats {
  totalPatients: { value: number; delta: number; deltaType: "up" | "down" };
  todaySessions: { value: number; remaining: number; total: number };
  monthlyRevenue: { value: number; delta: number; deltaType: "up" | "down" };
  avgSatisfaction: { value: number; delta: number; deltaType: "up" | "down" };
}

export interface WeeklyStats {
  days: { day: string; completed: number; scheduled: number; cancelled: number }[];
  total: number;
}

export interface RevenueData {
  data: { month: string; revenue: number; appointments: number }[];
  total: number;
  avg: number;
  bestMonth: string;
  growthRate: number;
}

export interface SessionType {
  name: string;
  value: number;
  color: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ClinicSettings {
  name: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  timezone: string;
  currency: string;
  language: string;
  logo?: string;
  workingHours: WorkingHours[];
}
