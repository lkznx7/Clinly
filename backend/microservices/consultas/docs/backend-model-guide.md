# Appointment — Guia da Entidade

## Tabela: `appointments`

| Campo | Tipo Java | Anotações | Obrigatório |
|-------|-----------|-----------|-------------|
| id | UUID | `@Id @GeneratedValue` | Sim |
| patientId | UUID (FK) | `@NotNull` | Sim |
| patientName | String | `@NotBlank @Size(max=120)` | Sim (denormalizado) |
| professionalId | UUID (FK) | `@NotNull` | Sim |
| professionalName | String | `@NotBlank @Size(max=120)` | Sim (denormalizado) |
| date | LocalDate | `@NotNull` | Sim |
| startTime | LocalTime | `@NotNull` | Sim |
| endTime | LocalTime | `@NotNull` | Sim |
| type | AppointmentType | `@NotNull @Enumerated(EnumType.STRING)` | Sim |
| status | AppointmentStatus | `@NotNull @Enumerated(EnumType.STRING)` | Sim (default SCHEDULED) |
| notes | String | `@Size(max=1000)` | Não |
| createdAt | Instant | `@CreatedDate` | Sim |
| updatedAt | Instant | `@LastModifiedDate` | Sim |

## Relacionamentos

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "patient_id")
Patient patient;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "professional_id")
Staff professional;
```

## Índices

| Nome | Colunas | Propósito |
|------|---------|-----------|
| `idx_appointment_date` | `date` | Filtro por data |
| `idx_appointment_patient` | `patient_id` | Consultas de um paciente |
| `idx_appointment_professional` | `professional_id` | Consultas de um profissional |
| `idx_appointment_status` | `status` | Filtro por status |
| `idx_appointment_date_professional` | `date, professional_id` | Verificação de conflito de horário |

## Regras de Negócio

1. **startTime < endTime** — O horário de início deve ser anterior ao de fim.
2. **Sem conflito de horário** — Não pode existir outra consulta para o mesmo profissional na mesma data com intervalos de tempo sobrepostos.
3. **Data não pode ser passada** — No momento da criação, a data deve ser hoje ou futura.

## Denormalização

Os campos `patientName` e `professionalName` são preenchidos no momento da criação através das entidades relacionadas. Isso evita joins em listagens paginadas, melhorando a performance de consultas frequentes.

## Exemplo de Criação

```json
{
  "patientId": "550e8400-e29b-41d4-a716-446655440010",
  "professionalId": "550e8400-e29b-41d4-a716-446655440020",
  "date": "2026-07-25",
  "startTime": "09:00",
  "endTime": "09:30",
  "type": "CONSULTATION",
  "notes": "Retorno para controle"
}
```
