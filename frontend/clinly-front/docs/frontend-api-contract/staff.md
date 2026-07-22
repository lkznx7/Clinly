# Equipe / Staff

## GET /staff

Lista membros da equipe com paginação e filtros.

### Autenticação
Requer JWT.

### Query Params

| Param | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| page | integer | Não | Página atual (default: 0) |
| size | integer | Não | Itens por página (default: 20) |
| search | string | Não | Busca por nome, email ou CRM |
| role | string | Não | Filtrar por cargo: `DOCTOR`, `NURSE`, `RECEPTIONIST`, `ADMIN` |
| status | string | Não | Filtrar por status: `ACTIVE`, `INACTIVE`, `ON_LEAVE` |
| sort | string | Não | Ordenação (ex: `name,asc`) |

### Response 200

```json
{
  "content": [
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
  ],
  "page": 0,
  "size": 10,
  "totalElements": 25,
  "totalPages": 3,
  "last": false
}
```

### DTOs

#### StaffResponse

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | UUID do membro |
| name | string | Nome completo |
| email | string | Email |
| phone | string | Telefone |
| role | string | Enum StaffRole |
| specialty | string | Especialidade ou null (principalmente para médicos) |
| crm | string | CRM ou null (principalmente para médicos) |
| status | string | Enum StaffStatus |
| avatarUrl | string | URL do avatar ou null |
| createdAt | string | ISO 8601 datetime |
| updatedAt | string | ISO 8601 datetime |

---

## GET /staff/{id}

Busca um membro da equipe por ID.

### Autenticação
Requer JWT.

### Path Params

| Param | Tipo | Descrição |
|-------|------|-----------|
| id | string | UUID do membro |

### Response 200
Retorna `StaffResponse`.

### Response 404
Membro não encontrado.

---

## POST /staff

Adiciona um novo membro à equipe.

### Autenticação
Requer JWT.

### Request

```json
{
  "name": "Dr. Maria Santos",
  "email": "maria@clinly.com",
  "phone": "(11) 98888-8888",
  "role": "DOCTOR",
  "specialty": "Cardiologia",
  "crm": "12345/SP"
}
```

### Campos

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| name | string | Sim | Não vazio |
| email | string | Sim | Email válido, único |
| phone | string | Sim | Não vazio |
| role | string | Sim | Enum StaffRole |
| specialty | string | Não | Texto livre. O frontend sempre envia string (pode ser `""`), nunca omite o campo |
| crm | string | Condicional | Obrigatório se role = `DOCTOR`, único. O frontend sempre envia string (pode ser `""`) |

### Response 201
Retorna o membro criado no formato `StaffResponse`.

### Response 400
Dados inválidos.

### Response 409
Email ou CRM já cadastrado.

---

## PUT /staff/{id}

Atualiza um membro da equipe.

### Autenticação
Requer JWT.

### Request
Mesmo formato do POST.

### Response 200
Retorna o membro atualizado no formato `StaffResponse`.

### Response 400
Dados inválidos.

### Response 404
Membro não encontrado.

---

## DELETE /staff/{id}

Remove um membro da equipe.

### Autenticação
Requer JWT.

### Response 204
Sem conteúdo.

### Response 404
Membro não encontrado.
