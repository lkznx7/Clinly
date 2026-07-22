# Dashboard

## GET /dashboard/summary

Retorna os KPIs principais do dashboard.

### Autenticação
Requer JWT.

### Response 200

```json
{
  "appointmentsToday": 18,
  "activePatients": 520,
  "newPatientsThisMonth": 14,
  "revenueThisMonth": 12500.90
}
```

### Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| appointmentsToday | integer | Número de consultas agendadas para hoje |
| activePatients | integer | Total de pacientes com status ACTIVE |
| newPatientsThisMonth | integer | Novos pacientes cadastrados no mês atual |
| revenueThisMonth | number | Receita total do mês atual (decimal) |

### Response 401
Token inválido ou ausente.

### Response 500
Erro interno do servidor.

---

## GET /dashboard/charts

Retorna dados para os gráficos do dashboard.

### Autenticação
Requer JWT.

### Response 200

```json
{
  "revenueByMonth": [
    { "month": "Jan", "revenue": 15000.00 },
    { "month": "Fev", "revenue": 18500.00 },
    { "month": "Mar", "revenue": 22000.00 }
  ],
  "appointmentsByType": [
    { "type": "Consulta", "count": 120 },
    { "type": "Retorno", "count": 45 },
    { "type": "Exame", "count": 30 }
  ],
  "appointmentsByStatus": [
    { "status": "COMPLETED", "count": 180 },
    { "status": "CANCELLED", "count": 12 },
    { "status": "NO_SHOW", "count": 5 }
  ]
}
```

### DTOs

#### RevenueByMonth

| Campo | Tipo | Descrição |
|-------|------|-----------|
| month | string | Nome abreviado do mês |
| revenue | number | Receita do mês |

#### AppointmentsByType

| Campo | Tipo | Descrição |
|-------|------|-----------|
| type | string | Tipo da consulta |
| count | integer | Quantidade |

#### AppointmentsByStatus

| Campo | Tipo | Descrição |
|-------|------|-----------|
| status | string | Status da consulta (enum) |
| count | integer | Quantidade |

---

## GET /dashboard/activities

Retorna as atividades recentes do sistema.

### Autenticação
Requer JWT.

### Response 200

```json
[
  {
    "id": "uuid",
    "type": "PATIENT_CREATED",
    "description": "Novo paciente cadastrado: João da Silva",
    "timestamp": "2026-07-21T14:30:00Z"
  }
]
```

### DTOs

#### RecentActivity

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | UUID da atividade |
| type | string | Tipo da atividade |
| description | string | Descrição legível |
| timestamp | string | ISO 8601 datetime |

### Valores possíveis para `type`

- `PATIENT_CREATED`
- `PATIENT_UPDATED`
- `APPOINTMENT_CREATED`
- `APPOINTMENT_COMPLETED`
- `APPOINTMENT_CANCELLED`
- `STAFF_ADDED`
