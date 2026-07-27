# Pacientes

## GET /patients

Lista pacientes com paginação, busca e filtros.

### Autenticação
Requer JWT.

### Query Params

| Param | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| page | integer | Não | Página atual (default: 0) |
| size | integer | Não | Itens por página (default: 20) |
| search | string | Não | Busca por nome, email ou CPF |
| status | string | Não | Filtrar por status: `ACTIVE`, `INACTIVE`, `ARCHIVED` |
| sort | string | Não | Ordenação (ex: `name,asc`, `createdAt,desc`) |

### Response 200

```json
{
  "content": [
    {
      "id": "uuid",
      "name": "João da Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999",
      "cpf": "123.456.789-00",
      "birthDate": "1990-05-15",
      "gender": "MALE",
      "address": "Rua das Flores, 123 - São Paulo, SP",
      "status": "ACTIVE",
      "lastAppointment": "2026-07-15",
      "nextAppointment": "2026-07-28",
      "createdAt": "2026-01-10T10:00:00Z",
      "updatedAt": "2026-07-15T14:30:00Z"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 520,
  "totalPages": 52,
  "last": false
}
```

### DTOs

#### PatientResponse

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | UUID do paciente |
| name | string | Nome completo |
| email | string | Email |
| phone | string | Telefone |
| cpf | string | CPF |
| birthDate | string | Data de nascimento (YYYY-MM-DD) |
| gender | string | Gênero: `MALE`, `FEMALE`, `OTHER` |
| address | string | Endereço completo |
| status | string | Enum PatientStatus |
| lastAppointment | string | Data da última consulta (YYYY-MM-DD) ou null |
| nextAppointment | string | Data da próxima consulta (YYYY-MM-DD) ou null |
| createdAt | string | ISO 8601 datetime |
| updatedAt | string | ISO 8601 datetime |

---

## POST /patients

Cria um novo paciente.

### Autenticação
Requer JWT.

### Request

```json
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "cpf": "123.456.789-00",
  "birthDate": "1990-05-15",
  "gender": "MALE",
  "address": "Rua das Flores, 123 - São Paulo, SP"
}
```

### Campos

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| name | string | Sim | Não vazio |
| email | string | Sim | Email válido, único |
| phone | string | Sim | Não vazio |
| cpf | string | Sim | CPF válido, único |
| birthDate | string | Sim | Data válida (YYYY-MM-DD) |
| gender | string | Sim | Enum: `MALE`, `FEMALE`, `OTHER` |
| address | string | Não | Texto livre |

### Response 201

 Retorna o paciente criado no formato `PatientResponse`.

### Response 400
Dados inválidos.

### Response 409
Email ou CPF já cadastrado.

---

## GET /patients/{id}

Busca um paciente por ID.

### Autenticação
Requer JWT.

### Response 200
Retorna `PatientResponse`.

### Response 404
Paciente não encontrado.

---

## PUT /patients/{id}

Atualiza um paciente existente.

### Autenticação
Requer JWT.

### Request
Mesmo formato do POST.

### Response 200
Retorna o paciente atualizado no formato `PatientResponse`.

### Response 400
Dados inválidos.

### Response 404
Paciente não encontrado.

---

## DELETE /patients/{id}

Exclui um paciente.

### Autenticação
Requer JWT.

### Response 204
Sem conteúdo.

### Response 404
Paciente não encontrado.
