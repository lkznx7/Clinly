# Clinly — Documentacao Completa do Projeto

> Sistema de Gestao Inteligente de Clinicas
> Backend: Spring Boot 4.1.0 (Java 21) | Frontend: Next.js 16 (React 19) | Infra: PostgreSQL 16 + RabbitMQ 3

---

## 1. Stack Tecnologica

### Backend (Monolith)
- Java 21, Spring Boot 4.1.0
- Spring Data JPA + Hibernate (PostgreSQL 16)
- Spring Security 7 (JWT, stateless sessions)
- Spring AMQP (RabbitMQ 3)
- SpringDoc OpenAPI (Swagger)
- Maven (sem Lombok, sem MapStruct, injecao por construtor)
- Jackson (JavaTimeModule para LocalDate/LocalDateTime)

### Frontend
- Next.js 16, React 19, TypeScript 5
- Tailwind CSS 4, shadcn/ui (Radix UI)
- Framer Motion (animacoes), Recharts via @tremor/react
- Axios (HTTP), react-hook-form + zod (validacao)
- date-fns, lucide-react, sonner (toasts)

### Infra
- Docker Compose: PostgreSQL 16 + RabbitMQ 3
- Backend: porta 8080, Frontend: porta 3000
- Proxy: `/api/*` -> `http://localhost:8080/*`

---

## 2. Banco de Dados (Schema Completo)

### Tabelas

#### clinics
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| trade_name | VARCHAR(150) | NOT NULL |
| legal_name | VARCHAR(200) | |
| cnpj | VARCHAR(18) | NOT NULL, UNIQUE |
| email | VARCHAR(150) | |
| phone | VARCHAR(20) | |
| zip_code | VARCHAR(10) | |
| state | VARCHAR(100) | |
| city | VARCHAR(100) | |
| neighborhood | VARCHAR(100) | |
| street | VARCHAR(200) | |
| number | VARCHAR(20) | |
| complement | VARCHAR(100) | |
| active | BOOLEAN | NOT NULL, default true |
| created_at | TIMESTAMP | auto |
| updated_at | TIMESTAMP | auto |

#### users
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| clinic_id | UUID | FK -> clinics.id (nullable) |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | |
| cpf | VARCHAR(14) | UNIQUE |
| email | VARCHAR(150) | NOT NULL, UNIQUE |
| phone | VARCHAR(20) | |
| birth_date | DATE | |
| gender | VARCHAR(20) | ENUM: MALE, FEMALE, OTHER, NOT_INFORMED |
| password_hash | TEXT | NOT NULL |
| active | BOOLEAN | NOT NULL, default true |
| last_login | TIMESTAMP | |
| created_at | TIMESTAMP | auto |
| updated_at | TIMESTAMP | auto |

#### roles
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR(50) | NOT NULL, UNIQUE |
| description | TEXT | |

#### permissions
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| description | TEXT | |

#### user_roles (join table)
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| user_id | UUID | FK -> users.id |
| role_id | UUID | FK -> roles.id |

#### role_permissions (join table)
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| role_id | UUID | FK -> roles.id |
| permission_id | UUID | FK -> permissions.id |

#### professional_profiles
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK -> users.id, NOT NULL, UNIQUE |
| registration_number | VARCHAR(50) | |
| specialty | VARCHAR(150) | |
| biography | TEXT | |
| appointment_duration | INT | default 50 |

#### patients
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| clinic_id | UUID | FK -> clinics.id, NOT NULL |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | |
| cpf | VARCHAR(14) | |
| email | VARCHAR(150) | |
| phone | VARCHAR(20) | |
| birth_date | DATE | |
| gender | VARCHAR(20) | ENUM |
| weight | DECIMAL(5,2) | |
| height | DECIMAL(4,2) | |
| observations | TEXT | |
| created_at | TIMESTAMP | auto |
| updated_at | TIMESTAMP | auto |

#### appointments
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| clinic_id | UUID | FK -> clinics.id, NOT NULL |
| professional_id | UUID | FK -> users.id, NOT NULL |
| patient_id | UUID | FK -> patients.id, NOT NULL |
| start_at | TIMESTAMP | NOT NULL |
| end_at | TIMESTAMP | NOT NULL |
| price | DECIMAL(10,2) | |
| status | VARCHAR(20) | ENUM, default SCHEDULED |
| notes | TEXT | |
| created_at | TIMESTAMP | auto |
| updated_at | TIMESTAMP | auto |

#### notifications
| Coluna | Tipo | Constraints |
|--------|------|-------------|
| id | UUID | PK |
| user_id | UUID | FK -> users.id, NOT NULL |
| title | VARCHAR(200) | NOT NULL |
| message | TEXT | NOT NULL |
| read | BOOLEAN | NOT NULL, default false (coluna "read") |
| created_at | TIMESTAMP | auto |

### Relacionamentos
```
Clinic 1--* User
Clinic 1--* Patient
Clinic 1--* Appointment
User 1--* Appointment (professional)
Patient 1--* Appointment
User 1--* Notification
User 1--1 ProfessionalProfile
User *--* Role *--* Permission
```

### Enums
- `GenderType`: MALE, FEMALE, OTHER, NOT_INFORMED
- `AppointmentStatus`: SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW
- `AppointmentType`: CONSULTATION, FOLLOW_UP, EXAM, PROCEDURE, TELEMEDICINE
- `PatientStatus`: ACTIVE, INACTIVE, ARCHIVED
- `StaffRole`: DOCTOR, NURSE, RECEPTIONIST, ADMIN
- `StaffStatus`: ACTIVE, INACTIVE, ON_LEAVE

---

## 3. API REST - Todos os Endpoints

### Auth (publico)

| Metodo | Endpoint | Body | Response | Descricao |
|--------|----------|------|----------|-----------|
| POST | `/auth/register` | `{name, email, password}` | `{token, email, name, role}` | Registra usuario + publica evento RabbitMQ |
| POST | `/auth/login` | `{email, password}` | `{token, email, name, role}` | Login, retorna JWT |

### Clinics (requer JWT)

| Metodo | Endpoint | Body | Query | Response |
|--------|----------|------|-------|----------|
| POST | `/clinics` | `CreateClinicDTO` | - | `ClinicResponseDTO` (201) |
| GET | `/clinics` | - | - | `List<ClinicResponseDTO>` |
| GET | `/clinics/{id}` | - | - | `ClinicResponseDTO` |
| PUT | `/clinics/{id}` | `UpdateClinicDTO` | - | `ClinicResponseDTO` |
| PATCH | `/clinics/{id}/toggle-active` | - | - | `ClinicResponseDTO` |
| DELETE | `/clinics/{id}` | - | - | 204 No Content |

### Patients (requer JWT)

| Metodo | Endpoint | Body | Query | Response |
|--------|----------|------|-------|----------|
| POST | `/patients` | `CreatePatientDTO` | - | `PatientResponseDTO` (201) |
| GET | `/patients` | - | `search?, status?, page, size, sort` | `PaginatedResponse<PatientResponseDTO>` |
| GET | `/patients/{id}` | - | - | `PatientResponseDTO` |
| PUT | `/patients/{id}` | `UpdatePatientDTO` | - | `PatientResponseDTO` |
| DELETE | `/patients/{id}` | - | - | 204 No Content |

### Appointments (requer JWT)

| Metodo | Endpoint | Body | Query | Response |
|--------|----------|------|-------|----------|
| POST | `/appointments` | `CreateAppointmentDTO` | - | `AppointmentResponseDTO` (201) |
| GET | `/appointments` | - | `professionalId?, status?, startDate?, endDate?, page, size, sort` | `PaginatedResponse<AppointmentResponseDTO>` |
| GET | `/appointments/{id}` | - | - | `AppointmentResponseDTO` |
| PUT | `/appointments/{id}` | `UpdateAppointmentDTO` | - | `AppointmentResponseDTO` |
| DELETE | `/appointments/{id}` | - | - | 204 No Content |

### Staff (requer JWT)

| Metodo | Endpoint | Body | Query | Response |
|--------|----------|------|-------|----------|
| POST | `/staff` | `CreateStaffDTO` | - | `StaffResponseDTO` (201) |
| GET | `/staff` | - | `search?, role?, status?, page, size, sort` | `PaginatedResponse<StaffResponseDTO>` |
| GET | `/staff/{id}` | - | - | `StaffResponseDTO` |
| PUT | `/staff/{id}` | `UpdateStaffDTO` | - | `StaffResponseDTO` |
| DELETE | `/staff/{id}` | - | - | 204 No Content |

### Professionals (requer JWT)

| Metodo | Endpoint | Response |
|--------|----------|----------|
| GET | `/professionals` | `List<StaffResponseDTO>` (nao paginado, para dropdowns) |

### Dashboard (requer JWT)

| Metodo | Endpoint | Response |
|--------|----------|----------|
| GET | `/dashboard/summary` | `DashboardSummaryDTO` |
| GET | `/dashboard/charts` | `DashboardChartDataDTO` |
| GET | `/dashboard/activities` | `List<RecentActivityDTO>` |

### Reports (requer JWT)

| Metodo | Endpoint | Query | Response |
|--------|----------|-------|----------|
| GET | `/reports/summary` | `startDate?, endDate?` | `ReportSummaryDTO` |
| GET | `/reports/charts` | `startDate?, endDate?` | `ReportChartDataDTO` |

### Notifications (requer JWT)

| Metodo | Endpoint | Response |
|--------|----------|----------|
| GET | `/notifications` | `List<NotificationResponseDTO>` (usuario via JWT) |

### Swagger
- `/swagger-ui/**`, `/v3/api-docs/**` (publico, sem auth)

---

## 4. DTOs Detalhados

### Auth

```java
// RegisterRequest
{ @NotBlank name: String, @NotBlank @Email email: String, @NotBlank @Size(min=6) password: String }

// LoginRequest
{ @NotBlank @Email email: String, @NotBlank @Size(min=6) password: String }

// AuthResponse
{ token: String, email: String, name: String, role: String }

// UserRegistredEvent (RabbitMQ)
{ userId: UUID, name: String, email: String, role: String, registeredAt: LocalDateTime }
```

### Clinics

```java
// CreateClinicDTO
{ @NotBlank tradeName: String, legalName: String, @NotBlank cnpj: String,
  @Email email: String, phone: String, zipCode: String, state: String,
  city: String, neighborhood: String, street: String, number: String, complement: String }

// UpdateClinicDTO = CreateClinicDTO + active: Boolean

// ClinicResponseDTO
{ id: UUID, tradeName: String, legalName: String, cnpj: String, email: String,
  phone: String, zipCode: String, state: String, city: String, neighborhood: String,
  street: String, number: String, complement: String, active: Boolean,
  createdAt: LocalDateTime, updatedAt: LocalDateTime }
```

### Patients

```java
// CreatePatientDTO
{ @NotBlank firstName: String, lastName: String, cpf: String, email: String,
  phone: String, birthDate: LocalDate, gender: GenderType, clinicId: UUID }

// UpdatePatientDTO
{ firstName: String, lastName: String, cpf: String, email: String,
  phone: String, birthDate: LocalDate, gender: GenderType,
  weight: BigDecimal, height: BigDecimal, observations: String }

// PatientResponseDTO (formato do frontend)
{ id: UUID, name: String, email: String, phone: String, cpf: String,
  birthDate: LocalDate, gender: String, address: String, status: String,
  lastAppointment: LocalDateTime, nextAppointment: LocalDateTime,
  createdAt: LocalDateTime, updatedAt: LocalDateTime }
```

### Appointments

```java
// CreateAppointmentDTO
{ @NotNull clinicId: UUID, @NotNull professionalId: UUID, @NotNull patientId: UUID,
  @NotNull startAt: LocalDateTime, @NotNull endAt: LocalDateTime,
  price: BigDecimal, notes: String }

// UpdateAppointmentDTO
{ startAt: LocalDateTime, endAt: LocalDateTime, price: BigDecimal,
  status: AppointmentStatus, notes: String }

// AppointmentResponseDTO (formato do frontend)
{ id: UUID, patientId: UUID, patientName: String, professionalId: UUID,
  professionalName: String, date: LocalDate, startTime: LocalTime,
  endTime: LocalTime, type: String, status: String, notes: String,
  createdAt: LocalDateTime, updatedAt: LocalDateTime }
// NOTA: startAt (LocalDateTime) e dividido em date + startTime pelo Mapper
```

### Staff

```java
// CreateStaffDTO
{ @NotBlank firstName: String, lastName: String, @NotBlank @Email email: String,
  phone: String, role: StaffRole, specialty: String, crm: String, clinicId: UUID }
// Password padrao: "123456"

// UpdateStaffDTO
{ firstName: String, lastName: String, @Email email: String, phone: String,
  role: StaffRole, specialty: String, crm: String }

// StaffResponseDTO
{ id: UUID, name: String, email: String, phone: String, role: String,
  specialty: String, crm: String, status: String, avatarUrl: String,
  createdAt: LocalDateTime, updatedAt: LocalDateTime }
```

### Dashboard

```java
// DashboardSummaryDTO
{ appointmentsToday: int, activePatients: long, newPatientsThisMonth: long,
  revenueThisMonth: double }

// DashboardChartDataDTO
{ revenueByMonth: List<{month: String, revenue: double}>,
  appointmentsByType: List<{type: String, count: int}>,
  appointmentsByStatus: List<{status: String, count: int}> }

// RecentActivityDTO
{ id: String, type: String, description: String, timestamp: LocalDateTime }
```

### Reports

```java
// ReportSummaryDTO
{ totalRevenue: double, totalAppointments: long, totalPatients: long,
  cancellationRate: double, noShowRate: double }

// ReportChartDataDTO
{ revenueByMonth: List<{month, revenue}>,
  appointmentsByMonth: List<{month, count}>,
  appointmentsBySpecialty: List<{specialty, count}>,
  cancellationByMonth: List<{month, count}> }
```

### Notifications

```java
// NotificationResponseDTO
{ id: UUID, title: String, message: String, read: boolean, createdAt: LocalDateTime }
```

### PaginatedResponse<T>
```java
{ content: List<T>, page: int, size: int, totalElements: long, totalPages: int, last: boolean }
```

---

## 5. Seguranca (JWT)

- **Secret**: `5d6abef9b91606704212f1700b3260dbd083d7af7d5374690e0d5a98214dbec3`
- **Expiracao**: 900000ms (15 minutos)
- **Headers**: `Authorization: Bearer <token>`
- **Endpoints publicos**: `/auth/**`, `/swagger-ui/**`, `/v3/api-docs/**`
- **Password encoding**: BCrypt
- **CORS**: `localhost:3000`, `clinly.lkdev.com.br`

---

## 6. RabbitMQ

### Configuracao
- Exchange: `auth_exchange` (DirectExchange)
- Queue: `users.queue` (durable)
- Routing Key: `user.created`
- Binding: `users.queue` -> `auth_exchange` with key `user.created`

### Fluxo
```
AuthController.register()
  -> userAuthRepository.save(user)
  -> AuthProducers.sendMessage(UserRegistredEvent)
    -> rabbitTemplate.convertAndSend("auth_exchange", "user.created", event)
  -> users.queue
    -> UserCretedConsumer.consumerUserCreated(event)  // TODO: implementar
```

---

## 7. Frontend - Rotas e Conexao

### Proxy
```
/api/:path* -> NEXT_PUBLIC_BACKEND_URL/:path* (default: http://localhost:8080)
```

### Rotas Conectadas ao Backend
| Rota | Endpoints Chamados |
|------|-------------------|
| `/login` | POST /auth/login |
| `/register` | POST /auth/register |
| `/dashboard` | GET /dashboard/summary, /charts, /activities, /appointments |
| `/pacientes` | GET/POST/PUT/DELETE /patients |
| `/calendario` | GET/POST/PUT/DELETE /appointments, GET /professionals |
| `/equipe` | GET/POST/PUT/DELETE /staff |
| `/relatorios` | GET /reports/summary, /charts |
| Notification Center | GET /notifications |

### Rotas com Mock (sem backend)
Todas as rotas `/admin/*`, `/secretario/*`, `/medico/*`, `/paciente/*` usam dados hardcoded.

### Auth Context
- `localStorage`: `@App:token`, `@App:email`, `@App:name`, `@App:role`
- `isAuthenticated`, `userRole`, `login()`, `register()`, `logout()`
- Interceptor: 401/403 -> limpa localStorage -> redirect `/login`

### Sort Fields Corretos (JPA)
| Entidade | Campo JPA correto | Nao usar |
|----------|-------------------|----------|
| Patient | `firstName` | ~~name~~ |
| Appointment | `startAt` | ~~startTime~~, ~~date~~ |
| Staff/User | `firstName` | ~~name~~ |

---

## 8. Docker Compose

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: clinly-postgres
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: clinly
      POSTGRES_USER: clinly
      POSTGRES_PASSWORD: clinly
    volumes: [postgres_data:/var/lib/postgresql/data]

  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: clinly-rabbitmq
    ports: ["5672:5672", "15672:15672"]
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

volumes:
  postgres_data:
```

---

## 9. Configuracoes

### application.properties
```properties
spring.application.name=clinly-backend
server.port=8080

# JWT
jwt.secret=5d6abef9b91606704212f1700b3260dbd083d7af7d5374690e0d5a98214dbec3
jwt.expiration=900000

# PostgreSQL
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:clinly}
spring.datasource.username=${DB_USER:clinly}
spring.datasource.password=${DB_PASSWORD:clinly}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# RabbitMQ
spring.rabbitmq.host=${RABBITMQ_HOST:localhost}
spring.rabbitmq.port=${RABBITMQ_PORT:5672}
spring.rabbitmq.username=${RABBITMQ_USER:guest}
spring.rabbitmq.password=${RABBITMQ_PASS:guest}
```

---

## 10. Arquitetura de Pacotes

```
com.clinly/
├── ClinlyApplication.java
├── config/
│   ├── cors/CorsConfig.java
│   ├── jackson/JacksonConfig.java
│   ├── rabbitmq/RabbitConfig.java
│   ├── security/SecurityConfig.java
│   └── swagger/OpenApiConfig.java
├── auth/
│   ├── controller/AuthController.java
│   ├── dto/{RegisterRequest, LoginRequest, AuthResponse, UserRegistredEvent}
│   ├── producer/AuthProducers.java
│   ├── repository/UserAuthRepository.java
│   ├── security/JwtAuthFilter.java
│   └── service/{JwtService, UserDetailsImplementsImpl}
├── clinics/
│   ├── controller/ClinicController.java
│   ├── dto/{CreateClinicDTO, UpdateClinicDTO, ClinicResponseDTO}
│   ├── entity/Clinic.java
│   ├── mapper/ClinicMapper.java
│   ├── repository/ClinicRepository.java
│   ├── service/ClinicService.java
│   └── exception/ClinicException.java
├── patients/
│   ├── controller/PatientController.java
│   ├── dto/{CreatePatientDTO, UpdatePatientDTO, PatientResponseDTO}
│   ├── entity/Patient.java
│   ├── mapper/PatientMapper.java
│   ├── repository/PatientRepository.java
│   ├── service/PatientService.java
│   └── exception/PatientException.java
├── appointments/
│   ├── controller/AppointmentController.java
│   ├── dto/{CreateAppointmentDTO, UpdateAppointmentDTO, AppointmentResponseDTO}
│   ├── entity/Appointment.java
│   ├── mapper/AppointmentMapper.java
│   ├── repository/AppointmentRepository.java
│   ├── service/AppointmentService.java
│   └── exception/AppointmentException.java
├── staff/
│   ├── controller/StaffController.java
│   ├── dto/{CreateStaffDTO, UpdateStaffDTO, StaffResponseDTO}
│   ├── mapper/StaffMapper.java
│   └── service/StaffService.java
├── professionals/
│   └── controller/ProfessionalsController.java
├── dashboard/
│   ├── controller/DashboardController.java
│   ├── dto/{DashboardSummaryDTO, DashboardChartDataDTO, RecentActivityDTO}
│   └── service/DashboardService.java
├── reports/
│   ├── controller/ReportsController.java
│   ├── dto/{ReportSummaryDTO, ReportChartDataDTO}
│   └── service/ReportsService.java
├── notifications/
│   ├── controller/NotificationController.java
│   ├── dto/{CreateNotificationDTO, NotificationResponseDTO}
│   ├── entity/Notification.java
│   ├── mapper/NotificationMapper.java
│   ├── repository/NotificationRepository.java
│   ├── service/NotificationService.java
│   └── exception/NotificationException.java
├── users/
│   ├── consumer/UserCretedConsumer.java
│   ├── entity/{User, Role, Permission, ProfessionalProfile}
│   ├── exception/UserException.java
│   └── repository/{UsersRepository, ProfessionalProfileRepository}
└── shared/
    ├── constant/CommonConstants.java
    ├── dto/PaginatedResponse.java
    ├── enums/{GenderType, AppointmentStatus, AppointmentType, PatientStatus, StaffRole, StaffStatus}
    ├── exception/{BusinessException, ResourceNotFoundException}
    ├── response/ApiResponse.java
    └── util/UuidUtils.java
```

---

## 11. Codigo de Exemplo (Controller)

```java
@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<AppointmentResponseDTO>> findAll(
            @RequestParam(required = false) UUID professionalId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Pageable pageable) {
        return ResponseEntity.ok(appointmentService.findAll(professionalId, status, startDate, endDate, pageable));
    }
}
```

---

## 12. Codigo de Exemplo (Service com JPA Specification)

```java
public PaginatedResponse<AppointmentResponseDTO> findAll(
        UUID professionalId, String status, LocalDate startDate, LocalDate endDate, Pageable pageable) {

    Specification<Appointment> spec = (root, query, cb) -> {
        List<Predicate> predicates = new ArrayList<>();

        if (professionalId != null) {
            predicates.add(cb.equal(root.get("professional").get("id"), professionalId));
        }
        if (status != null) {
            predicates.add(cb.equal(root.get("status"), AppointmentStatus.valueOf(status)));
        }
        if (startDate != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("startAt"), startDate.atStartOfDay()));
        }
        if (endDate != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("startAt"), endDate.atTime(LocalTime.MAX)));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    };

    Page<Appointment> page = appointmentRepository.findAll(spec, pageable);
    return PaginatedResponse.fromPage(page.map(AppointmentMapper::toResponseDTO));
}
```

---

## 13. Codigo de Exemplo (Mapper - Convertendo LocalDateTime para date+time)

```java
public static AppointmentResponseDTO toResponseDTO(Appointment appointment) {
    String patientName = appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName();

    return new AppointmentResponseDTO(
        appointment.getId(),
        appointment.getPatient().getId(),
        patientName.trim(),
        appointment.getProfessional().getId(),
        professionalName.trim(),
        appointment.getStartAt().toLocalDate(),      // -> date
        appointment.getStartAt().toLocalTime(),       // -> startTime
        appointment.getEndAt().toLocalTime(),         // -> endTime
        "CONSULTATION",
        appointment.getStatus().name(),
        appointment.getNotes(),
        appointment.getCreatedAt(),
        appointment.getUpdatedAt()
    );
}
```

---

## 14. Codigo de Exemplo (AuthController com RabbitMQ)

```java
@PostMapping("/register")
public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
    if (userAuthRepository.existsByEmail(request.email())) {
        return ResponseEntity.badRequest().build();
    }

    String[] nameParts = request.name().trim().split("\\s+", 2);
    String firstName = nameParts[0];
    String lastName = nameParts.length > 1 ? nameParts[1] : "";

    User user = new User();
    user.setEmail(request.email());
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setGender(GenderType.NOT_INFORMED);
    user.setActive(true);

    User saved = userAuthRepository.save(user);
    String token = jwtService.generateToken(saved.getEmail());

    authProducers.sendMessage(new UserRegistredEvent(
        saved.getId(), request.name(), saved.getEmail(), "USER", LocalDateTime.now()
    ));

    return ResponseEntity.ok(new AuthResponse(token, saved.getEmail(), request.name(), "USER"));
}
```

---

## 15. Endpoints HTTP Completos (Referencia Rapida)

| # | Method | Path | Auth | Descricao |
|---|--------|------|------|-----------|
| 1 | POST | `/auth/register` | Nao | Registrar usuario |
| 2 | POST | `/auth/login` | Nao | Login |
| 3 | POST | `/clinics` | Sim | Criar clinica |
| 4 | GET | `/clinics` | Sim | Listar clinicas |
| 5 | GET | `/clinics/{id}` | Sim | Buscar clinica |
| 6 | PUT | `/clinics/{id}` | Sim | Editar clinica |
| 7 | PATCH | `/clinics/{id}/toggle-active` | Sim | Ativar/desativar |
| 8 | DELETE | `/clinics/{id}` | Sim | Deletar clinica |
| 9 | POST | `/patients` | Sim | Criar paciente |
| 10 | GET | `/patients` | Sim | Listar pacientes (paginado, busca) |
| 11 | GET | `/patients/{id}` | Sim | Buscar paciente |
| 12 | PUT | `/patients/{id}` | Sim | Editar paciente |
| 13 | DELETE | `/patients/{id}` | Sim | Deletar paciente |
| 14 | POST | `/appointments` | Sim | Agendar consulta |
| 15 | GET | `/appointments` | Sim | Listar consultas (paginado, filtros) |
| 16 | GET | `/appointments/{id}` | Sim | Buscar consulta |
| 17 | PUT | `/appointments/{id}` | Sim | Editar consulta |
| 18 | DELETE | `/appointments/{id}` | Sim | Deletar consulta |
| 19 | GET | `/staff` | Sim | Listar equipe (paginado, busca) |
| 20 | GET | `/staff/{id}` | Sim | Buscar membro da equipe |
| 21 | POST | `/staff` | Sim | Criar membro da equipe |
| 22 | PUT | `/staff/{id}` | Sim | Editar membro da equipe |
| 23 | DELETE | `/staff/{id}` | Sim | Deletar membro da equipe |
| 24 | GET | `/professionals` | Sim | Listar profissionais (dropdown) |
| 25 | GET | `/notifications` | Sim | Notificacoes do usuario |
| 26 | GET | `/dashboard/summary` | Sim | KPIs do dashboard |
| 27 | GET | `/dashboard/charts` | Sim | Graficos do dashboard |
| 28 | GET | `/dashboard/activities` | Sim | Atividades recentes |
| 29 | GET | `/reports/summary` | Sim | KPIs de relatorios |
| 30 | GET | `/reports/charts` | Sim | Graficos de relatorios |

---

## 16. Notas Importantes

1. **Nao usar Lombok** — todos os getters/setters/equals/hashCode/toString sao manuais
2. **equals/hashCode** baseados apenas no UUID `id`
3. **Fetch LAZY** em todos os relationships
4. **Cascade** apenas onde o SQL tem ON DELETE CASCADE (user_roles, role_permissions)
5. **Collections** sempre `List<>`, nunca `Set<>`
6. **Notification.read** usa `@Column(name = "\"read\"")` pois `read` e keyword reservada
7. **Sort por propriedades JPA** — nao por nomes de campo JSON
8. **PaginatedResponse.fromPage()** converte Spring Data `Page<T>` para o formato do frontend
9. **O frontend espera respostas cruas** (sem wrapper `ApiResponse`)
10. **Receita hardcoded** em Dashboard/Reports (retorna 0.0)
11. **Role/Permission** modeladas mas nao usadas no Security (hardcoded `ROLE_USER`)
12. **UserCretedConsumer** e um stub vazio (TODO)
13. **Metodos cancel(), confirm(), markNoShow()** existem no service mas nao tem endpoints
14. **Duplicate repository**: UsersRepository e UserAuthRepository sao identicos
15. **Sem global exception handler** — domain exceptions retornam HTTP 500
