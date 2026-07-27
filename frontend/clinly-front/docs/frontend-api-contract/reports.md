# Relatórios

## GET /reports/summary

Retorna KPIs consolidados para o período selecionado.

### Autenticação
Requer JWT.

### Query Params

| Param | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| startDate | string | Não | Data início (YYYY-MM-DD) |
| endDate | string | Não | Data fim (YYYY-MM-DD) |

### Response 200

```json
{
  "totalRevenue": 125000.90,
  "totalAppointments": 450,
  "totalPatients": 320,
  "cancellationRate": 0.05,
  "noShowRate": 0.03
}
```

### DTOs

#### ReportSummary

| Campo | Tipo | Descrição |
|-------|------|-----------|
| totalRevenue | number | Receita total no período |
| totalAppointments | integer | Total de consultas no período |
| totalPatients | integer | Total de pacientes atendidos no período |
| cancellationRate | number | Taxa de cancelamento (0.0 a 1.0) |
| noShowRate | number | Taxa de no-show (0.0 a 1.0) |

---

## GET /reports/charts

Retorna dados para os gráficos de relatórios.

### Autenticação
Requer JWT.

### Query Params

| Param | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| startDate | string | Não | Data início (YYYY-MM-DD) |
| endDate | string | Não | Data fim (YYYY-MM-DD) |

### Response 200

```json
{
  "revenueByMonth": [
    { "month": "Jan", "revenue": 15000.00 },
    { "month": "Fev", "revenue": 18500.00 }
  ],
  "appointmentsByMonth": [
    { "month": "Jan", "count": 45 },
    { "month": "Fev", "count": 52 }
  ],
  "appointmentsBySpecialty": [
    { "specialty": "Cardiologia", "count": 80 },
    { "specialty": "Ortopedia", "count": 60 }
  ],
  "cancellationByMonth": [
    { "month": "Jan", "count": 3 },
    { "month": "Fev", "count": 2 }
  ]
}
```

### DTOs

#### RevenueByMonth

| Campo | Tipo | Descrição |
|-------|------|-----------|
| month | string | Nome abreviado do mês |
| revenue | number | Receita do mês |

#### AppointmentsByMonth

| Campo | Tipo | Descrição |
|-------|------|-----------|
| month | string | Nome abreviado do mês |
| count | integer | Quantidade de consultas |

#### AppointmentsBySpecialty

| Campo | Tipo | Descrição |
|-------|------|-----------|
| specialty | string | Nome da especialidade |
| count | integer | Quantidade de consultas |

#### CancellationByMonth

| Campo | Tipo | Descrição |
|-------|------|-----------|
| month | string | Nome abreviado do mês |
| count | integer | Quantidade de cancelamentos |
