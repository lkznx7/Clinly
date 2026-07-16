# Clinly — Backend API Requirements

> Derived from frontend analysis of all 23 screens, forms, tables, and user flows.

---

## 1. Authentication

### Login
**POST /auth/login**

Purpose: Authenticate user with email/password.

Request:
```
{ email: string, password: string }
```

Response:
```
{ accessToken, refreshToken, user: { id, name, email, role } }
```

Authentication: Public

---

### Register
**POST /auth/register**

Purpose: Create a new user account.

Request:
```
{ firstName, lastName, email, password, clinicName? }
```

Response:
```
{ userId, emailVerificationRequired: boolean }
```

Authentication: Public

---

### Social Login (OAuth)
**POST /auth/oauth/:provider**

Purpose: Authenticate via Keycloak/Google/GitHub.

Request:
```
{ provider: "keycloak" | "google" | "github", code: string, redirectUri: string }
```

Response:
```
{ accessToken, refreshToken, user: { id, name, email, role } }
```

Authentication: Public

---

### Forgot Password
**POST /auth/forgot-password**

Purpose: Send password reset email.

Request:
```
{ email: string }
```

Response:
```
{ message: "Reset link sent" }
```

Authentication: Public

---

### Reset Password
**POST /auth/reset-password**

Purpose: Reset password with token.

Request:
```
{ token: string, newPassword: string }
```

Response:
```
{ message: "Password updated" }
```

Authentication: Public (with valid token)

---

### Verify Email
**POST /auth/verify-email**

Purpose: Verify email with 6-digit OTP.

Request:
```
{ email: string, code: string }
```

Response:
```
{ verified: boolean }
```

Authentication: Public

---

### Resend Verification
**POST /auth/resend-verification**

Purpose: Resend email verification code.

Request:
```
{ email: string }
```

Response:
```
{ message: "Code resent", expiresIn: 60 }
```

Authentication: Public

---

## 2. Users (Current User)

### Get Profile
**GET /users/me**

Purpose: Get current user's profile.

Response:
```
{ id, firstName, lastName, email, phone, title, license, bio, avatar, language, dateFormat }
```

Authentication: Bearer token

---

### Update Profile
**PUT /users/me**

Purpose: Update current user's profile.

Request:
```
{ firstName?, lastName?, email?, phone?, title?, license?, bio?, language?, dateFormat? }
```

Response:
```
{ user }
```

Authentication: Bearer token

---

### Upload Avatar
**POST /users/me/avatar**

Purpose: Upload profile photo.

Request: `multipart/form-data` with `file`

Response:
```
{ avatarUrl: string }
```

Authentication: Bearer token

---

### Change Password
**POST /users/me/change-password**

Purpose: Change current user's password.

Request:
```
{ currentPassword, newPassword }
```

Response:
```
{ message: "Password updated" }
```

Authentication: Bearer token

---

### Enable 2FA
**POST /users/me/2fa/enable**

Purpose: Enable two-factor authentication.

Request:
```
{ method: "authenticator" | "sms", secret?: string, code?: string }
```

Response:
```
{ qrCode?: string, backupCodes?: string[] }
```

Authentication: Bearer token

---

### Disable 2FA
**POST /users/me/2fa/disable**

Purpose: Disable two-factor authentication.

Request:
```
{ code: string }
```

Response:
```
{ message: "2FA disabled" }
```

Authentication: Bearer token

---

### Get Active Sessions
**GET /users/me/sessions**

Purpose: List active login sessions.

Response:
```
{ sessions: [{ id, device, location, lastActive, current }] }
```

Authentication: Bearer token

---

### Revoke Session
**DELETE /users/me/sessions/:id**

Purpose: Revoke a specific session.

Response:
```
{ message: "Session revoked" }
```

Authentication: Bearer token

---

### Revoke All Other Sessions
**DELETE /users/me/sessions**

Purpose: Revoke all sessions except current.

Response:
```
{ message: "All sessions revoked" }
```

Authentication: Bearer token

---

## 3. Clinic Settings

### Get Clinic Settings
**GET /clinic/settings**

Purpose: Get clinic configuration.

Response:
```
{ name, email, phone, website, address, timezone, currency, language, logo, workingHours: [{ day, start, end, active }] }
```

Authentication: Bearer token (admin)

---

### Update Clinic Settings
**PUT /clinic/settings**

Purpose: Update clinic configuration.

Request:
```
{ name?, email?, phone?, website?, address?, timezone?, currency?, language? }
```

Response:
```
{ settings }
```

Authentication: Bearer token (admin)

---

### Upload Clinic Logo
**POST /clinic/logo**

Purpose: Upload clinic logo.

Request: `multipart/form-data` with `file`

Response:
```
{ logoUrl: string }
```

Authentication: Bearer token (admin)

---

### Update Working Hours
**PUT /clinic/working-hours**

Purpose: Set weekly working hours.

Request:
```
{ hours: [{ day, start, end, active }] }
```

Response:
```
{ hours }
```

Authentication: Bearer token (admin)

---

### Delete Clinic
**DELETE /clinic**

Purpose: Permanently delete clinic and all data.

Request:
```
{ password: string }
```

Response:
```
{ message: "Clinic deleted" }
```

Authentication: Bearer token (admin)

---

## 4. Patients

### List Patients
**GET /patients**

Purpose: List patients with filters, search, and pagination.

Query params:
```
?search=string&status=active|pending|inactive&professional=id&page=1&limit=20
```

Response:
```
{ patients: [{ id, initials, name, age, email, phone, condition, status, lastVisit, nextAppt, professional, sessions }], total, page, totalPages }
```

Authentication: Bearer token

---

### Get Patient Details
**GET /patients/:id**

Purpose: Get full patient record.

Response:
```
{
  id, initials, name, age, email, phone, address, condition, status,
  lastVisit, nextAppt, professional, sessions,
  personalInfo: { dob, gender, emergencyContact, emergencyPhone },
  clinicalSummary: { primaryDiagnosis, icd10Code, treatmentType, treatmentStart, frequency, insurance },
  treatmentProgress: [{ label, value, color }]
}
```

Authentication: Bearer token

---

### Create Patient
**POST /patients**

Purpose: Add a new patient.

Request:
```
{ firstName, lastName, dob, gender, email, phone, address, zip,
  emergencyContact, emergencyPhone, condition, professionalId, notes }
```

Response:
```
{ patient: { id, ... } }
```

Authentication: Bearer token

---

### Update Patient
**PUT /patients/:id**

Purpose: Update patient information.

Request: Partial fields from create.

Response:
```
{ patient }
```

Authentication: Bearer token

---

### Delete Patient
**DELETE /patients/:id**

Purpose: Soft-delete a patient.

Response:
```
{ message: "Patient deleted" }
```

Authentication: Bearer token (admin)

---

### Get Patient Appointments
**GET /patients/:id/appointments**

Purpose: List all appointments for a patient.

Query params:
```
?page=1&limit=20
```

Response:
```
{ appointments: [{ id, date, time, type, duration, professional, status }], total }
```

Authentication: Bearer token

---

### Get Patient Clinical Notes
**GET /patients/:id/notes**

Purpose: List clinical notes for a patient.

Response:
```
{ notes: [{ id, author, authorInitials, date, content }] }
```

Authentication: Bearer token

---

### Create Clinical Note
**POST /patients/:id/notes**

Purpose: Add a clinical note.

Request:
```
{ content: string }
```

Response:
```
{ note: { id, author, date, content } }
```

Authentication: Bearer token

---

### Update Clinical Note
**PUT /patients/:id/notes/:noteId**

Purpose: Edit a clinical note.

Request:
```
{ content: string }
```

Response:
```
{ note }
```

Authentication: Bearer token (author only)

---

### Get Patient Medical History
**GET /patients/:id/history**

Purpose: Get diagnoses, medications, allergies, previous treatments.

Response:
```
{ diagnoses: string[], medications: string[], allergies: string[], previousTreatments: string[] }
```

Authentication: Bearer token

---

### Export Patients
**GET /patients/export**

Purpose: Export patient list (CSV/PDF).

Query params:
```
?format=csv|pdf&status=&professional=
```

Response: File download

Authentication: Bearer token

---

## 5. Professionals

### List Professionals
**GET /professionals**

Purpose: List all team members.

Query params:
```
?search=string&status=active|inactive
```

Response:
```
{
  professionals: [{ id, initials, name, specialty, patients, appointments, rating, status, email, phone, since }],
  stats: { total, active, totalPatients, avgRating }
}
```

Authentication: Bearer token

---

### Get Professional Profile
**GET /professionals/:id**

Purpose: Get full professional profile.

Response:
```
{
  id, initials, name, specialty, patients, appointments, rating, status,
  email, phone, since, bio, specializations: string[],
  workingHours: [{ day, start, end }],
  performance: { weeklyData: [...] }
}
```

Authentication: Bearer token

---

### Create Professional
**POST /professionals**

Purpose: Add a new team member.

Request:
```
{ firstName, lastName, email, phone, specialty, specializations, bio }
```

Response:
```
{ professional: { id, ... } }
```

Authentication: Bearer token (admin)

---

### Update Professional
**PUT /professionals/:id**

Purpose: Update professional profile.

Request: Partial fields from create.

Response:
```
{ professional }
```

Authentication: Bearer token (self or admin)

---

### Get Professional Patients
**GET /professionals/:id/patients**

Purpose: List patients assigned to this professional.

Response:
```
{ patients: [{ id, initials, name, email, condition, sessions, lastVisit, status }] }
```

Authentication: Bearer token

---

### Get Professional Schedule
**GET /professionals/:id/schedule**

Purpose: Get weekly availability and booked slots.

Query params:
```
?week=2024-01-22
```

Response:
```
{ availability: [{ day, slots: [{ hour, booked }] }] }
```

Authentication: Bearer token

---

## 6. Appointments

### List Appointments (Calendar)
**GET /appointments**

Purpose: Get appointments for calendar rendering.

Query params:
```
?view=month|week|day&date=2024-01-22&professional=id
```

Response:
```
{
  appointments: [{ id, patientId, patientName, patientInitials, professionalId, professionalName, type, date, time, duration, status, color }],
  stats: { total, completed, scheduled, cancelled }
}
```

Authentication: Bearer token

---

### Get Appointment Details
**GET /appointments/:id**

Purpose: Get full appointment details.

Response:
```
{
  id, patient: { id, name }, professional: { id, name },
  type, date, time, duration, status,
  notes, reminders: [{ method, status, time }]
}
```

Authentication: Bearer token

---

### Create Appointment
**POST /appointments**

Purpose: Schedule a new appointment.

Request:
```
{
  patientId, professionalId, type, date, time, duration,
  recurrence: "none"|"weekly"|"biweekly"|"monthly",
  notes?, reminders: { email24h: bool, sms2h: bool, therapistSummary: bool }
}
```

Response:
```
{ appointment: { id, ... } }
```

Authentication: Bearer token

---

### Update Appointment
**PUT /appointments/:id**

Purpose: Reschedule or modify an appointment.

Request:
```
{ date?, time?, duration?, type?, notes? }
```

Response:
```
{ appointment }
```

Authentication: Bearer token

---

### Cancel Appointment
**DELETE /appointments/:id**

Purpose: Cancel an appointment.

Request:
```
{ reason?: string }
```

Response:
```
{ appointment: { status: "cancelled" } }
```

Authentication: Bearer token

---

### Get Today's Schedule
**GET /appointments/today**

Purpose: Get today's appointments for dashboard.

Response:
```
{ appointments: [...], count, remaining }
```

Authentication: Bearer token

---

### Get Weekly Stats
**GET /appointments/weekly-stats**

Purpose: Get weekly appointment summary (completed/scheduled/cancelled by day).

Query params:
```
?week=2024-01-15
```

Response:
```
{ days: [{ day, completed, scheduled, cancelled }], total }
```

Authentication: Bearer token

---

## 7. Notifications

### List Notifications
**GET /notifications**

Purpose: Get user's notifications.

Query params:
```
?unreadOnly=false&page=1&limit=20
```

Response:
```
{ notifications: [{ id, type, title, message, time, read }], unreadCount }
```

Authentication: Bearer token

---

### Mark Notification Read
**PUT /notifications/:id/read**

Purpose: Mark single notification as read.

Response:
```
{ notification: { read: true } }
```

Authentication: Bearer token

---

### Mark All Read
**PUT /notifications/read-all**

Purpose: Mark all notifications as read.

Response:
```
{ message: "All marked as read" }
```

Authentication: Bearer token

---

### Get Notification Preferences
**GET /notifications/preferences**

Purpose: Get user's notification settings.

Response:
```
{ preferences: [{ category, email, sms, push }] }
```

Authentication: Bearer token

---

### Update Notification Preferences
**PUT /notifications/preferences**

Purpose: Update notification settings.

Request:
```
{ preferences: [{ category, email, sms, push }] }
```

Response:
```
{ preferences }
```

Authentication: Bearer token

---

## 8. Reports & Analytics

### Get Dashboard Stats
**GET /reports/dashboard**

Purpose: KPIs for dashboard.

Response:
```
{
  totalPatients: { value, delta, deltaType },
  todaySessions: { value, remaining, total },
  monthlyRevenue: { value, delta, deltaType },
  avgSatisfaction: { value, delta, deltaType }
}
```

Authentication: Bearer token

---

### Get Revenue Report
**GET /reports/revenue**

Purpose: Revenue data for charts.

Query params:
```
?period=1mo|3mo|6mo|12mo|YTD
```

Response:
```
{ data: [{ month, revenue, appointments }], total, avg, bestMonth, growthRate }
```

Authentication: Bearer token

---

### Get Session Types
**GET /reports/session-types**

Purpose: Session type distribution.

Query params:
```
?period=1mo|3mo|6mo|12mo|YTD
```

Response:
```
{ types: [{ name, value, color }] }
```

Authentication: Bearer token

---

### Get Patient Growth
**GET /reports/patient-growth**

Purpose: Patient growth over time.

Query params:
```
?period=1mo|3mo|6mo|12mo|YTD
```

Response:
```
{ data: [{ month, new, total }] }
```

Authentication: Bearer token

---

### Get Revenue Summary
**GET /reports/revenue/summary**

Purpose: Revenue summary stats.

Query params:
```
?period=6mo
```

Response:
```
{ total, monthlyAvg, bestMonth: { month, value }, growthRate }
```

Authentication: Bearer token

---

### Export Report
**GET /reports/export**

Purpose: Export report data.

Query params:
```
?type=revenue|sessions|patients&period=6mo&format=csv|pdf
```

Response: File download

Authentication: Bearer token

---

## 9. Global

### Global Search
**GET /search**

Purpose: Search across patients, professionals, appointments.

Query params:
```
?q=string
```

Response:
```
{
  patients: [{ id, name, condition }],
  professionals: [{ id, name, specialty }],
  appointments: [{ id, patient, date, type }]
}
```

Authentication: Bearer token

---

## Summary

| Domain | Endpoints | Notes |
|--------|-----------|-------|
| Authentication | 7 | Login, register, OAuth, password reset, email verify |
| Users | 8 | Profile, avatar, password, 2FA, sessions |
| Clinic | 5 | Settings, logo, hours, delete |
| Patients | 10 | CRUD, notes, history, export |
| Professionals | 6 | CRUD, patients, schedule |
| Appointments | 8 | CRUD, calendar views, stats |
| Notifications | 5 | List, read, preferences |
| Reports | 6 | Dashboard, revenue, growth, export |
| Global | 1 | Search |
| **Total** | **56** | |

---

## Recommendations

### Missing Backend Features
1. **Role-based access control** — Frontend shows admin-only actions (delete patient, delete clinic) but no role system exists
2. **Audit logging** — HIPAA compliance requires tracking who accessed/modified patient data
3. **File storage service** — Avatar uploads, clinic logos, document attachments need a storage layer
4. **Email service** — Verification codes, password resets, appointment reminders need email delivery
5. **SMS service** — 2FA via SMS, appointment reminders
6. **WebSocket/SSE** — Real-time notifications (currently polling)
7. **Search indexing** — Global search across entities needs a search engine

### API Organization Suggestions
- Use **versioned routes** (`/api/v1/...`) for future-proofing
- Implement **cursor-based pagination** instead of offset for large datasets
- Add **field filtering** (`?fields=id,name,email`) to reduce payload size
- Standardize **error responses** `{ error: { code, message, details } }`
- Use **UUIDs** instead of sequential IDs for patient/appointment identifiers
- Add **ETag/If-None-Match** headers for dashboard data caching

### Possible Duplicated Endpoints
- `GET /reports/dashboard` overlaps with individual report endpoints — consider composing client-side
- `GET /appointments` and `GET /patients/:id/appointments` share filtering logic — use the same service
- `GET /professionals/:id/patients` is a filtered view of `GET /patients?professional=id`
