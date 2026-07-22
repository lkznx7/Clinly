# Consultas / Agendamentos

## GET /appointments

Lista consultas com paginação e filtros.

### Autenticação
Requer JWT.

### Query Params

| Param | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| page | integer | Não | Página atual (default: 0) |
| size | integer | Não | Itens por página (default: 20) |
| professionalId | string | Não | Filtrar por profissional (UUID) |
| status | string | Não | Filtrar por status |
| startDate | string | Não | Data início (YYYY-MM-DD) |
| endDate | string | Não | Data fim (YYYY-MM-DD) |
| sort | string | Não | Ordenação (ex: `date,asc`) |

### Response 200

```json
{
  "content": [
    {
      "id": "uuid",
      "patientId": "uuid-paciente",
      "patientName": "João da Silva",
      "professionalId": "uuid-profissional",
      "professionalName": "Dr. Maria Santos",
      "date": "2026-07-25",
      "startTime": "09:00",
      "endTime": "09:30",
      "type": "CONSULTATION",
      "status": "SCHEDULED",
      "notes": "Retorno para controle",
      "createdAt": "2026-07-20T10:00:00Z",
      "updatedAt": "2026-07-20T10:00:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 120,
  "totalPages": 6,
  "last": false
}
```

### DTOs

#### AppointmentResponse

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | UUID da consulta |
| patientId | string | UUID do paciente |
| patientName | string | Nome do paciente |
| professionalId | string | UUID do profissional |
| professionalName | string | Nome do profissional |
| date | string | Data (YYYY-MM-DD) |
| startTime | string | Hora início (HH:MM) |
| endTime | string | Hora fim (HH:MM) |
| type | string | Enum AppointmentType |
| status | string | Enum AppointmentStatus |
| notes | string | Observações ou null |
| createdAt | string | ISO 8601 datetime |
| updatedAt | string | ISO 8601 datetime |

---

## POST /appointments

Cria uma nova consulta.

### Autenticação
Requer JWT.

### Request

```json
{
  "patientId": "uuid-paciente",
  "professionalId": "uuid-profissional",
  "date": "2026-07-25",
  "startTime": "09:00",
  "endTime": "09:30",
  "type": "CONSULTATION",
  "notes": "Retorno para controle"
}
```

### Campos

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| patientId | string | Sim | UUID válido, paciente deve existir |
| professionalId | string | Sim | UUID válido, profissional deve existir |
| date | string | Sim | Data futura ou hoje |
| startTime | string | Sim | HH:MM, deve ser antes do endTime |
| endTime | string | Sim | HH:MM |
| type | string | Sim | Enum AppointmentType |
| notes | string | Não | Texto livre. O frontend sempre envia string (pode ser `""`), nunca omite o campo. No response, pode retornar `null`. |

### Response 201
Retorna a consulta criada no formato `AppointmentResponse`.

### Response 400
Dados inválidos ou conflito de horário.

---

## PUT /appointments/{id}

Atualiza uma consulta existente.

### Autenticação
Requer JWT.

### Request
Mesmo formato do POST.

### Response 200
Retorna a consulta atualizada no formato `AppointmentResponse`.

### Response 400
Dados inválidos.

### Response 404
Consulta não encontrada.

---

## DELETE /appointments/{id}

Cancela/exclui uma consulta.

### Autenticação
Requer JWT.

### Response 204
Sem conteúdo.

### Response 404
Consulta não encontrada.

---

## GET /professionals

Lista todos os profissionais (para dropdowns de seleção).

### Autenticação
Requer JWT.

### Response 200

```json
[
  {
    "id": "uuid",
    "name": "Dr. Maria Santos",
    "email": "maria@clinly.com",
    "phone": "(11) 98888-8888",
    "role": "DOCTOR",
    "specialty": "Cardiologia",
    "crm": "12345/SP",
    "status": "ACTIVE",
    "avatarUrl": null,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z"
  }
]
```

Nota: Este endpoint retorna uma lista simples (array), não paginada, pois é usado para popular dropdowns de seleção.
