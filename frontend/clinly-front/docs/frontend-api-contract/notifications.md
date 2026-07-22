# Notificações

> **Nota:** Este é um endpoint somente leitura. O frontend não possui funcionalidade para marcar como lida, deletar ou marcar todas como lidas.

## GET /notifications

Retorna as notificações do usuário autenticado.

### Autenticação
Requer JWT.

### Response 200

```json
[
  {
    "id": "uuid",
    "title": "Consulta agendada",
    "message": "Você tem uma consulta agendada com João da Silva às 14:00",
    "read": false,
    "createdAt": "2026-07-21T10:00:00Z"
  }
]
```

### DTOs

#### Notification

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | UUID da notificação |
| title | string | Título curto |
| message | string | Descrição detalhada |
| read | boolean | Se já foi lida |
| createdAt | string | ISO 8601 datetime |
