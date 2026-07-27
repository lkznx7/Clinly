# Autenticação

## POST /auth/register

Registra um novo usuário.

### Request

```json
{
  "name": "João Silva",
  "email": "usuario@email.com",
  "password": "senha123",
  "role": "USER"
}
```

### Campos

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| name | string | Sim | Mínimo 2 caracteres |
| email | string | Sim | Formato de email válido |
| password | string | Sim | Mínimo 6 caracteres |
| role | string | Sim | Enum: `USER`, `ADMIN` |

### Response 201

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "usuario@email.com",
  "name": "João Silva",
  "role": "USER"
}
```

### Response 400

```json
{
  "message": "Email já está em uso",
  "status": 400,
  "timestamp": "2026-07-21T15:00:00Z"
}
```

### Response 409

```json
{
  "message": "Email já cadastrado",
  "status": 409,
  "timestamp": "2026-07-21T15:00:00Z"
}
```

### Autenticação
Não requer.

---

## POST /auth/login

Autentica um usuário existente.

### Request

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### Campos

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| email | string | Sim | Formato de email válido |
| password | string | Sim | Não vazio |

### Response 200

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "email": "usuario@email.com",
  "role": "USER"
}
```

### Response 401

```json
{
  "message": "Email ou senha inválidos",
  "status": 401,
  "timestamp": "2026-07-21T15:00:00Z"
}
```

### Autenticação
Não requer.
