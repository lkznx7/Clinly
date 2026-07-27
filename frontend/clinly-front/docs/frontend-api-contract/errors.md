# Formato de Erros

## Formato Padrão

```json
{
  "message": "Descrição legível do erro",
  "status": 400,
  "timestamp": "2026-07-21T15:00:00Z"
}
```

## Códigos HTTP

| Código | Descrição | Uso no Frontend |
|--------|-----------|-----------------|
| 200 | OK | Operação bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 204 | No Content | Exclusão bem-sucedida (sem body) |
| 400 | Bad Request | Dados inválidos - exibe toast de erro |
| 401 | Unauthorized | Token inválido/ausente - redireciona para /login |
| 403 | Forbidden | Sem permissão - exibe toast de erro |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Conflito (ex: email duplicado) - exibe toast de erro |
| 422 | Unprocessable Entity | Validação de negócio - exibe mensagens nos formulários |
| 500 | Internal Server Error | Erro interno - exibe ErrorState com botão de retry |

## Frontend - Tratamento de Erros

### Erros de Validação (400/422)

O frontend exibe toast com a mensagem de erro:
```typescript
toast.error("Erro ao salvar paciente. Tente novamente.");
```

### Erros de Autenticação (401)

O frontend trata automaticamente via interceptor de resposta axios. Exclui tokens do localStorage e redireciona para `/login`:
```typescript
localStorage.removeItem("@App:token");
localStorage.removeItem("@App:email");
localStorage.removeItem("@App:role");
window.location.href = "/login";
```

> **Nota:** Requisições para `/auth/*` são isentas do interceptor para não interromper o fluxo de login/registro.

### Erros de Rede / Servidor (500+)

O frontend exibe um componente `ErrorState` com botão "Tentar novamente" que refaz a requisição.
