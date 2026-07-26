# BACKEND IMPLEMENTATION_GUIDE

Guia completo para implementação do backend Clinly em Java 21 + Spring Boot.

---

## Sumário

1. [Todos os Endpoints](#todos-os-endpoints)
2. [Ordem Recomendada de Implementação](#ordem-recomendada)
3. [Dependências entre Endpoints](#dependências)
4. [Fluxo de Navegação do Frontend](#fluxo-de-navegação)
5. [Modelo das Entidades](#modelo-das-entidades)
6. [Relacionamentos](#relacionamentos)
7. [Estrutura Spring Boot](#estrutura-spring-boot)
8. [Nomes de Classes](#nomes-de-classes)

---

## Todos os Endpoints

### Autenticação
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| POST | `/auth/register` | Não | Registrar usuário |
| POST | `/auth/login` | Não | Login |

### Dashboard
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| GET | `/dashboard/summary` | JWT | KPIs do dashboard |
| GET | `/dashboard/charts` | JWT | Dados dos gráficos |
| GET | `/dashboard/activities` | JWT | Atividades recentes |

### Pacientes
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| GET | `/patients` | JWT | Listar (paginado) |
| POST | `/patients` | JWT | Criar |
| GET | `/patients/{id}` | JWT | Buscar por ID |
| PUT | `/patients/{id}` | JWT | Atualizar |
| DELETE | `/patients/{id}` | JWT | Excluir |

### Consultas
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| GET | `/appointments` | JWT | Listar (paginado) |
| POST | `/appointments` | JWT | Criar |
| PUT | `/appointments/{id}` | JWT | Atualizar |
| DELETE | `/appointments/{id}` | JWT | Cancelar/Excluir |

### Profissionais (para dropdowns)
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| GET | `/professionals` | JWT | Listar todos (não paginado) |

### Equipe
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| GET | `/staff` | JWT | Listar (paginado) |
| GET | `/staff/{id}` | JWT | Buscar por ID |
| POST | `/staff` | JWT | Adicionar membro |
| PUT | `/staff/{id}` | JWT | Atualizar membro |
| DELETE | `/staff/{id}` | JWT | Remover membro |

### Relatórios
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| GET | `/reports/summary` | JWT | KPIs consolidados |
| GET | `/reports/charts` | JWT | Dados dos gráficos |

### Notificações
| Método | URL | Autenticação | Descrição |
|--------|-----|-------------|-----------|
| GET | `/notifications` | JWT | Notificações do usuário |

**Total: 21 endpoints**

---

## Ordem Recomendada de Implementação

### Fase 1: Fundação
1. `POST /auth/register` + `POST /auth/login`
2. Configuração JWT (Spring Security)
3. Entidade `User` + `Staff`

### Fase 2: Entidades Core
4. Entidade `Patient` + CRUD completo
5. Entidade `Staff` + CRUD completo
6. Entidade `Appointment` + CRUD completo

### Fase 3: Dashboard
7. `GET /dashboard/summary`
8. `GET /dashboard/charts`
9. `GET /dashboard/activities`

### Fase 4: Funcionalidades
10. `GET /professionals` (dropdown)
11. `GET /reports/summary`
12. `GET /reports/charts`
13. `GET /notifications`

---

## Dependências

```
Auth (register/login)
  └── User entity
       ├── Patient (sem dependência direta de User)
       ├── Staff (1:1 com User)
       └── Appointment
            ├── depende de Patient
            └── depende de Staff (professional)

Dashboard
  ├── depende de Appointment (para count e charts)
  ├── depende de Patient (para count)
  └── depende de Appointment (para activities)

Reports
  └── depende de Appointment e Patient
```

---

## Fluxo de Navegação do Frontend

```
/login → POST /auth/login → salva token → /dashboard
/register → POST /auth/register → salva token → /dashboard

/dashboard → GET /dashboard/summary + charts + activities
/pacientes → GET /patients?page=&size=&search=&status=&sort=
/calendario → GET /appointments?startDate=&endDate= + GET /professionals
/equipe → GET /staff?page=&size=&search=&role=&status=&sort=
/relatorios → GET /reports/summary?startDate=&endDate= + GET /reports/charts?startDate=&endDate=
```

---

## Modelo das Entidades

### User

```
User
├── id: UUID (PK)
├── email: String (unique, not null)
├── password: String (encrypted)
├── role: ENUM (USER, ADMIN)
├── createdAt: LocalDateTime
└── updatedAt: LocalDateTime
```

### Patient

```
Patient
├── id: UUID (PK)
├── name: String (not null)
├── email: String (unique, not null)
├── phone: String (not null)
├── cpf: String (unique, not null)
├── birthDate: LocalDate
├── gender: ENUM (MALE, FEMALE, OTHER)
├── address: String
├── status: ENUM (ACTIVE, INACTIVE, ARCHIVED) default ACTIVE
├── createdAt: LocalDateTime
└── updatedAt: LocalDateTime
```

### Staff

```
Staff
├── id: UUID (PK)
├── name: String (not null)
├── email: String (unique, not null)
├── phone: String (not null)
├── role: ENUM (DOCTOR, NURSE, RECEPTIONIST, ADMIN)
├── specialty: String (nullable)
├── crm: String (unique, nullable - obrigatório para DOCTOR)
├── status: ENUM (ACTIVE, INACTIVE, ON_LEAVE) default ACTIVE
├── avatarUrl: String (nullable)
├── createdAt: LocalDateTime
└── updatedAt: LocalDateTime
```

### Appointment

```
Appointment
├── id: UUID (PK)
├── patientId: UUID (FK → Patient)
├── professionalId: UUID (FK → Staff)
├── patientName: String (JOIN com Patient.name — response only)
├── professionalName: String (JOIN com Staff.name — response only)
├── date: LocalDate (not null)
├── startTime: LocalTime (not null)
├── endTime: LocalTime (not null)
├── type: ENUM (CONSULTATION, FOLLOW_UP, EXAM, PROCEDURE, TELEMEDICINE)
├── status: ENUM (SCHEDULED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW)
├── notes: String (nullable)
├── createdAt: LocalDateTime
└── updatedAt: LocalDateTime
```

### Activity (pode ser tabela ou audit log)

```
Activity
├── id: UUID (PK)
├── type: ENUM (PATIENT_CREATED, APPOINTMENT_CREATED, etc.)
├── description: String
├── timestamp: LocalDateTime
└── entityId: UUID (nullable - referência ao recurso)
```

### Notification

```
Notification
├── id: UUID (PK)
├── title: String
├── message: String
├── read: boolean default false
├── createdAt: LocalDateTime
└── userId: UUID (FK → User)
```

---

## Relacionamentos

```
User (1) ──── (1) Staff     // Staff pode estar vinculado a um User
Staff (1) ──── (N) Appointment  // Profissional atende consultas
Patient (1) ── (N) Appointment  // Paciente participa de consultas
User (1) ───── (N) Notification // Notificações do usuário
```

---

## Estrutura Spring Boot Sugerida

```
src/main/java/com/clinly/
├── ClinlyApplication.java
├── config/
│   ├── SecurityConfig.java
│   ├── JwtConfig.java
│   ├── CorsConfig.java
│   └── OpenApiConfig.java
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
├── auth/
│   ├── AuthController.java
│   ├── AuthService.java
│   ├── dto/
│   │   ├── RegisterRequest.java
│   │   ├── LoginRequest.java
│   │   └── AuthResponse.java
│   └── validation/
├── patient/
│   ├── PatientController.java
│   ├── PatientService.java
│   ├── PatientRepository.java
│   ├── entity/
│   │   └── Patient.java
│   ├── dto/
│   │   ├── PatientRequest.java
│   │   ├── PatientResponse.java
│   │   └── PatientMapper.java
│   └── exception/
│       └── PatientNotFoundException.java
├── staff/
│   ├── StaffController.java
│   ├── StaffService.java
│   ├── StaffRepository.java
│   ├── entity/
│   │   └── Staff.java
│   ├── dto/
│   │   ├── StaffRequest.java
│   │   ├── StaffResponse.java
│   │   └── StaffMapper.java
│   └── exception/
├── appointment/
│   ├── AppointmentController.java
│   ├── AppointmentService.java
│   ├── AppointmentRepository.java
│   ├── entity/
│   │   └── Appointment.java
│   ├── dto/
│   │   ├── AppointmentRequest.java
│   │   ├── AppointmentResponse.java
│   │   └── AppointmentMapper.java
│   └── exception/
├── dashboard/
│   ├── DashboardController.java
│   ├── DashboardService.java
│   └── dto/
│       ├── DashboardSummaryResponse.java
│       ├── DashboardChartDataResponse.java
│       ├── RevenueByMonth.java
│       ├── AppointmentsByType.java
│       └── AppointmentsByStatus.java
├── reports/
│   ├── ReportsController.java
│   ├── ReportsService.java
│   └── dto/
│       ├── ReportSummaryResponse.java
│       ├── ReportChartDataResponse.java
│       ├── AppointmentsByMonth.java
│       ├── AppointmentsBySpecialty.java
│       └── CancellationByMonth.java
├── notification/
│   ├── NotificationController.java
│   ├── NotificationService.java
│   ├── NotificationRepository.java
│   ├── entity/
│   │   └── Notification.java
│   └── dto/
│       └── NotificationResponse.java
├── activity/
│   ├── ActivityService.java
│   ├── ActivityRepository.java
│   ├── entity/
│   │   └── Activity.java
│   └── dto/
│       └── ActivityResponse.java
├── common/
│   ├── dto/
│   │   └── PaginatedResponse.java
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   └── ResourceNotFoundException.java
│   └── util/
│       └── DateUtils.java
└── enums/
    ├── PatientStatus.java
    ├── StaffStatus.java
    ├── StaffRole.java
    ├── AppointmentStatus.java
    ├── AppointmentType.java
    └── Gender.java
```

---

## Nomes de Classes

### Controllers
| Classe | URL Prefix |
|--------|-----------|
| `AuthController` | `/auth` |
| `PatientController` | `/patients` |
| `StaffController` | `/staff` |
| `AppointmentController` | `/appointments` |
| `DashboardController` | `/dashboard` |
| `ReportsController` | `/reports` |
| `NotificationController` | `/notifications` |

### Services
| Classe | Responsabilidade |
|--------|-----------------|
| `AuthService` | Registro e login |
| `PatientService` | CRUD de pacientes |
| `StaffService` | CRUD de equipe |
| `AppointmentService` | CRUD de consultas |
| `DashboardService` | KPIs e charts do dashboard |
| `ReportsService` | KPIs e charts de relatórios |
| `NotificationService` | Notificações |
| `ActivityService` | Registro de atividades |

### Repositories
| Classe | Entidade |
|--------|----------|
| `UserRepository` | User |
| `PatientRepository` | Patient |
| `StaffRepository` | Staff |
| `AppointmentRepository` | Appointment |
| `NotificationRepository` | Notification |
| `ActivityRepository` | Activity |

### DTOs (Request/Response)
| Prefixo | Exemplo |
|---------|---------|
| `{Entity}Request` | `PatientRequest` |
| `{Entity}Response` | `PatientResponse` |
| `{Entity}Mapper` | `PatientMapper` |

### Exceptions
| Classe | Uso |
|--------|-----|
| `GlobalExceptionHandler` | Handler único de exceções |
| `ResourceNotFoundException` | 404 genérico |
| `PatientNotFoundException` | Paciente não encontrado |
| `StaffNotFoundException` | Membro não encontrado |
| `AppointmentNotFoundException` | Consulta não encontrado |
| `DuplicateResourceException` | 409 - email/CPF duplicado |
| `InvalidDataException` | 400 - dados inválidos |

---

## Tecnologias Recomendadas

| Camada | Tecnologia |
|--------|-----------|
| Framework | Spring Boot 3.x |
| Java | 21 |
| ORM | Spring Data JPA + Hibernate |
| DB | PostgreSQL |
| Auth | Spring Security + JWT (jjwt) |
| Validação | Jakarta Validation (Bean Validation) |
| Mapeamento | MapStruct |
| Documentação | SpringDoc OpenAPI (Swagger) |
| Build | Maven ou Gradle |

---

## Notas Importantes

1. **CORS**: O backend deve aceitar requests de `http://localhost:3000` (porta do Next.js dev).
2. **JWT**: O token deve conter o `sub` (email) e `role` do usuário.
3. **Paginação**: Usar `Pageable` do Spring Data. O frontend espera `Page<T>` com campos `content`, `page`, `size`, `totalElements`, `totalPages`, `last`.
4. **Ordenação**: O frontend envia `sort=name,asc` ou `sort=createdAt,desc`. O Spring Data aceita esse formato nativamente.
5. **Busca**: O parâmetro `search` deve ser implementado com `LIKE` ou `ILIKE` nos campos relevantes (nome, email, CPF, CRM).
6. **Soft Delete**: Considere usar `deletedAt` em vez de exclusão física para pacientes e equipe.
7. **Auditoria**: Implementar `createdAt` e `updatedAt` automaticamente via `@CreatedDate` e `@LastModifiedDate` do JPA.
