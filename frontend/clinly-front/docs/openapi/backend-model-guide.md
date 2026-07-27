# Backend Model Guide — Clinly

## Visão Geral

Este documento descreve todas as entidades JPA que o backend deve implementar, com campos, tipos Java, relacionamentos, índices, validações e sugestões de implementação.

---

## 1. User (Usuário do Sistema)

### Entidade
`User` — Representa um usuário do sistema (login/autenticação).

### Tabela
`users`

### Campos

| Campo | Tipo Java | Anotações | Obrigatório | Descrição |
|-------|-----------|-----------|-------------|-----------|
| id | UUID | @Id @GeneratedValue | Sim | Identificador único |
| name | String | @NotBlank @Size(min=2, max=120) | Sim | Nome completo |
| email | String | @NotBlank @Email @Size(max=255) @Column(unique=true) | Sim | Email (único) |
| password | String | @NotBlank @Size(min=8, max=100) | Sim | Senha (hash BCrypt) |
| role | UserRole | @NotNull @Enumerated(EnumType.STRING) | Sim | USER ou ADMIN |
| createdAt | Instant | @CreatedDate | Sim | Data de criação |
| updatedAt | Instant | @LastModifiedDate | Sim | Data de atualização |

### Relacionamentos
- Nenhum (entidade independente)

### Índices
- `idx_user_email` (email) — unique

### Validações Bean Validation
```java
@NotBlank @Size(min = 2, max = 120) String name
@NotBlank @Email @Size(max = 255) String email
@NotBlank @Size(min = 8, max = 100) String password
@NotNull UserRole role
```

---

## 2. Patient (Paciente)

### Tabela
`patients`

### Campos

| Campo | Tipo Java | Anotações | Obrigatório | Descrição |
|-------|-----------|-----------|-------------|-----------|
| id | UUID | @Id @GeneratedValue | Sim | Identificador único |
| name | String | @NotBlank @Size(min=3, max=120) | Sim | Nome completo |
| email | String | @NotBlank @Email @Size(max=255) @Column(unique=true) | Sim | Email (único) |
| phone | String | @NotBlank @Size(min=8, max=20) | Sim | Telefone |
| cpf | String | @NotBlank @Size(min=11, max=14) @Column(unique=true) | Sim | CPF (único) |
| birthDate | LocalDate | @NotNull | Sim | Data de nascimento |
| gender | Gender | @NotNull @Enumerated(EnumType.STRING) | Sim | Gênero |
| address | String | @Size(max=500) | Não | Endereço |
| status | PatientStatus | @NotNull @Enumerated(EnumType.STRING) | Sim | Status (default: ACTIVE) |
| createdAt | Instant | @CreatedDate | Sim | Data de criação |
| updatedAt | Instant | @LastModifiedDate | Sim | Data de atualização |

### Relacionamentos
- `@OneToMany(mappedBy = "patient") List<Appointment> appointments` — Consultas do paciente

### Índices
- `idx_patient_email` (email) — unique
- `idx_patient_cpf` (cpf) — unique
- `idx_patient_name` (name) — para busca
- `idx_patient_status` (status) — para filtro

### Validações Bean Validation
```java
@NotBlank @Size(min = 3, max = 120) String name
@NotBlank @Email @Size(max = 255) String email
@NotBlank @Size(min = 8, max = 20) String phone
@NotBlank @Size(min = 11, max = 14) String cpf
@NotNull LocalDate birthDate
@NotNull Gender gender
@Size(max = 500) String address
@NotNull @DefaultValue("ACTIVE") PatientStatus status
```

---

## 3. Staff (Membro da Equipe)

### Tabela
`staff`

### Campos

| Campo | Tipo Java | Anotações | Obrigatório | Descrição |
|-------|-----------|-----------|-------------|-----------|
| id | UUID | @Id @GeneratedValue | Sim | Identificador único |
| name | String | @NotBlank @Size(min=3, max=120) | Sim | Nome completo |
| email | String | @NotBlank @Email @Size(max=255) @Column(unique=true) | Sim | Email (único) |
| phone | String | @NotBlank @Size(min=8, max=20) | Sim | Telefone |
| role | StaffRole | @NotNull @Enumerated(EnumType.STRING) | Sim | Cargo |
| specialty | String | @Size(max=100) | Não | Especialidade |
| crm | String | @Size(max=20) @Column(unique=true) | Não | CRM (único, obrigatório se DOCTOR) |
| status | StaffStatus | @NotNull @Enumerated(EnumType.STRING) | Sim | Status (default: ACTIVE) |
| avatarUrl | String | @Size(max=500) | Não | URL do avatar |
| createdAt | Instant | @CreatedDate | Sim | Data de criação |
| updatedAt | Instant | @LastModifiedDate | Sim | Data de atualização |

### Relacionamentos
- `@OneToMany(mappedBy = "professional") List<Appointment> appointments` — Consultas do profissional

### Índices
- `idx_staff_email` (email) — unique
- `idx_staff_crm` (crm) — unique (nullable)
- `idx_staff_role` (role) — para filtro
- `idx_staff_status` (status) — para filtro

### Validações Bean Validation
```java
@NotBlank @Size(min = 3, max = 120) String name
@NotBlank @Email @Size(max = 255) String email
@NotBlank @Size(min = 8, max = 20) String phone
@NotNull StaffRole role
@Size(max = 100) String specialty
@Size(max = 20) String crm
@NotNull @DefaultValue("ACTIVE") StaffStatus status
@Size(max = 500) String avatarUrl
```

---

## 4. Appointment (Agendamento/Consulta)

### Tabela
`appointments`

### Campos

| Campo | Tipo Java | Anotações | Obrigatório | Descrição |
|-------|-----------|-----------|-------------|-----------|
| id | UUID | @Id @GeneratedValue | Sim | Identificador único |
| patientId | UUID | @NotNull | Sim | ID do paciente (FK) |
| patientName | String | @NotBlank @Size(max=120) | Sim | Nome do paciente (denormalizado) |
| professionalId | UUID | @NotNull | Sim | ID do profissional (FK) |
| professionalName | String | @NotBlank @Size(max=120) | Sim | Nome do profissional (denormalizado) |
| date | LocalDate | @NotNull | Sim | Data da consulta |
| startTime | LocalTime | @NotNull | Sim | Horário de início |
| endTime | LocalTime | @NotNull | Sim | Horário de término |
| type | AppointmentType | @NotNull @Enumerated(EnumType.STRING) | Sim | Tipo da consulta |
| status | AppointmentStatus | @NotNull @Enumerated(EnumType.STRING) | Sim | Status (default: SCHEDULED) |
| notes | String | @Size(max=1000) | Não | Observações |
| createdAt | Instant | @CreatedDate | Sim | Data de criação |
| updatedAt | Instant | @LastModifiedDate | Sim | Data de atualização |

### Relacionamentos
- `@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "patient_id") Patient patient` — Paciente
- `@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "professional_id") Staff professional` — Profissional

### Índices
- `idx_appointment_date` (date) — para consultas por data
- `idx_appointment_patient` (patient_id) — para consultas por paciente
- `idx_appointment_professional` (professional_id) — para consultas por profissional
- `idx_appointment_status` (status) — para filtro
- `idx_appointment_date_professional` (date, professional_id) — composto para verificar conflitos de horário

### Validações Bean Validation
```java
@NotNull UUID patientId
@NotNull UUID professionalId
@NotNull LocalDate date
@NotNull LocalTime startTime
@NotNull LocalTime endTime
@NotNull AppointmentType type
@Size(max = 1000) String notes
@NotNull @DefaultValue("SCHEDULED") AppointmentStatus status
```

### Regras de Negócio
- `startTime` deve ser anterior a `endTime`
- Não pode haver conflito de horário para o mesmo profissional na mesma data
- `date` não pode ser no passado (para criação)

---

## 5. Notification (Notificação)

### Tabela
`notifications`

### Campos

| Campo | Tipo Java | Anotações | Obrigatório | Descrição |
|-------|-----------|-----------|-------------|-----------|
| id | UUID | @Id @GeneratedValue | Sim | Identificador único |
| userId | UUID | @NotNull | Sim | ID do usuário destinatário (FK) |
| title | String | @NotBlank @Size(max=200) | Sim | Título curto |
| message | String | @NotBlank @Size(max=1000) | Sim | Mensagem detalhada |
| read | boolean | @NotNull | Sim | Se foi lida (default: false) |
| createdAt | Instant | @CreatedDate | Sim | Data de criação |

### Índices
- `idx_notification_user` (user_id) — para consultar notificações do usuário
- `idx_notification_read` (user_id, read) — para filtrar não lidas

### Validações Bean Validation
```java
@NotNull UUID userId
@NotBlank @Size(max = 200) String title
@NotBlank @Size(max = 1000) String message
@NotNull boolean read
```

---

## 6. User (Usuário do Sistema) — Detalhamento para Auth Service

### Tabela
`users`

### Campos Adicionais (além dos já listados)

| Campo | Tipo Java | Anotações | Obrigatório | Descrição |
|-------|-----------|-----------|-------------|-----------|
| id | UUID | @Id @GeneratedValue | Sim | Identificador único |
| name | String | @NotBlank @Size(min=2, max=120) | Sim | Nome completo |
| email | String | @NotBlank @Email @Size(max=255) @Column(unique=true) | Sim | Email (único) |
| password | String | @NotBlank @Size(min=8, max=100) | Sim | Hash BCrypt da senha |
| role | UserRole | @NotNull @Enumerated(EnumType.STRING) | Sim | USER ou ADMIN |
| createdAt | Instant | @CreatedDate | Sim | Data de criação |
| updatedAt | Instant | @LastModifiedDate | Sim | Data de atualização |

### Índices
- `idx_user_email` (email) — unique

### Validações Bean Validation
```java
@NotBlank @Size(min = 2, max = 120) String name
@NotBlank @Email @Size(max = 255) String email
@NotBlank @Size(min = 8, max = 100) String password
@NotNull UserRole role
```

---

## 7. Notification (Notificação)

### Tabela
`notifications`

### Campos

| Campo | Tipo Java | Anotações | Obrigatório | Descrição |
|-------|-----------|-----------|-------------|-----------|
| id | UUID | @Id @GeneratedValue | Sim | Identificador único |
| userId | UUID | @NotNull | Sim | ID do usuário destinatário |
| title | String | @NotBlank @Size(max=200) | Sim | Título curto |
| message | String | @NotBlank @Size(max=1000) | Sim | Mensagem detalhada |
| read | boolean | @NotNull | Sim | Se foi lida (default: false) |
| createdAt | Instant | @CreatedDate | Sim | Data de criação |

### Índices
- `idx_notification_user_id` (user_id) — para consultar notificações do usuário
- `idx_notification_user_read` (user_id, read) — para filtrar não lidas

### Validações Bean Validation
```java
@NotNull UUID userId
@NotBlank @Size(max = 200) String title
@NotBlank @Size(max = 1000) String message
@NotNull boolean read
```

---

## 8. Resumo de Relacionamentos entre Entidades

```
User (1) ──── (N) Notification
  |
  | (User pode ser Patient, Doctor, Receptionist, Admin via role)

Patient (1) ──── (N) Appointment
Staff  (1) ──── (N) Appointment  (como professional)
```

---

## 9. Sugestões de Implementação

### Auditoria
- Usar `@CreatedDate`, `@LastModifiedDate` do Spring Data JPA (`@EnableJpaAuditing`)
- Campos `createdAt` e `updatedAt` em todas as entidades

### Soft Delete
- Pacientes e Staff usam status (ACTIVE/INACTIVE/ARCHIVED) em vez de exclusão física
- Appointment pode ser CANCELLED em vez de excluído

### Unique Constraints
- User.email
- Patient.email, Patient.cpf
- Staff.email, Staff.crm

### Busca (search)
- Usar `LIKE %term%` no banco ou `ilike` no PostgreSQL
- Patients: busca em name, email, cpf
- Staff: busca em name, email, crm

### Paginação
- Usar `Pageable` do Spring Data
- Retornar `Page<T>` diretamente
- Parâmetros: `page` (zero-based), `size`, `sort`

### Denormalização
- `Appointment.patientName` e `Appointment.professionalName` são campos denormalizados
- Devem ser atualizados quando o nome do paciente/profissional mudar (via evento ou job)
- Isso evita joins desnecessários nas consultas de listagem

### Auditoria
- `@CreatedDate` e `@LastModifiedDate` do Spring Data JPA
- Habilitar com `@EnableJpaAuditing` na configuração
- Todas as entidades devem ter `createdAt` e `updatedAt`

### Eventos / Mensageria (RabbitMQ)
- Quando um paciente é criado/atualizado → publicar evento para atualizar `patientName` nos appointments
- Quando um staff é criado/atualizado → publicar evento para atualizar `professionalName` nos appointments
- Quando um appointment é criado/atualizado → publicar evento para criar notificação
- Quando um appointment é criado/atualizado → publicar evento para atualizar dashboard

---

## 10. Mapeamento Frontend → Backend (Campos Denormalizados)

| Campo no Frontend | Origem | Observação |
|-------------------|--------|------------|
| Patient.lastAppointment | Appointment (MAX date) | Campo calculado, não armazenado |
| Patient.nextAppointment | Appointment (MIN future date) | Campo calculado, não armazenado |
| Appointment.patientName | Patient.name | Denormalizado, atualizar via evento |
| Appointment.professionalName | Staff.name | Denormalizado, atualizar via evento |

---

## 11. Sugestões de Configuração Spring Boot

### application.yml
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/clinly
    username: clinly
    password: clinly
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        jdbc:
          batch_size: 20
  jackson:
    serialization:
      write-dates-as-timestamps: false
    date-format: yyyy-MM-dd'T'HH:mm:ss'Z'
    time-zone: UTC
```

Now let me create the per-service documentation. I'll start with the root-level consolidated docs and then each service.

<｜DSML｜tool_calls>
<｜DSML｜invoke name="write">
<｜DSML｜parameter name="filePath" string="true">C:\Users\lucas\OneDrive - SENAC DF\clinly\backend\microservices\backend-model-guide.md