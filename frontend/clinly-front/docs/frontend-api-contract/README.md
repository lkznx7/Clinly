# Frontend API Contract - Clinly

Este diretório contém a documentação completa de todas as APIs que o Frontend Clinly espera receber do backend.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| [auth.md](./auth.md) | Autenticação (Login, Register) |
| [dashboard.md](./dashboard.md) | Dashboard (KPIs, Charts, Activities) |
| [patients.md](./patients.md) | Pacientes (CRUD + Paginação) |
| [appointments.md](./appointments.md) | Consultas/Agendamentos (CRUD) |
| [staff.md](./staff.md) | Equipe (CRUD) |
| [reports.md](./reports.md) | Relatórios (KPIs, Charts) |
| [notifications.md](./notifications.md) | Notificações |
| [enums.md](./enums.md) | Enumerações |
| [pagination.md](./pagination.md) | Formato de Paginação |
| [errors.md](./errors.md) | Formato de Erros |

## Autenticação

Todos os endpoints (exceto `/auth/login` e `/auth/register`) requerem header JWT:

```
Authorization: Bearer <token>
```

O token é retornado pelos endpoints de autenticação e armazenado no `localStorage` do frontend na chave `@App:token`.

## Base URL

```
http://localhost:8080
```

Configurável via variável de ambiente `NEXT_PUBLIC_API_URL`.

## Referência de Endpoints

O frontend consome **21 endpoints** no total:

### Autenticação (não requer JWT)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/register` | Registro de novo usuário |
| POST | `/auth/login` | Login |

### Dashboard
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/dashboard/summary` | KPIs do dashboard |
| GET | `/dashboard/charts` | Dados dos gráficos |
| GET | `/dashboard/activities` | Atividades recentes |

### Pacientes
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/patients` | Listar (paginado) |
| GET | `/patients/{id}` | Buscar por ID |
| POST | `/patients` | Criar |
| PUT | `/patients/{id}` | Atualizar |
| DELETE | `/patients/{id}` | Excluir |

### Consultas / Agendamentos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/appointments` | Listar (paginado) |
| POST | `/appointments` | Criar |
| PUT | `/appointments/{id}` | Atualizar |
| DELETE | `/appointments/{id}` | Excluir |

### Equipe / Staff
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/staff` | Listar (paginado) |
| GET | `/staff/{id}` | Buscar por ID |
| POST | `/staff` | Criar |
| PUT | `/staff/{id}` | Atualizar |
| DELETE | `/staff/{id}` | Excluir |

### Profissionais (dropdown)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/professionals` | Listar profissionais (não paginado) |

### Relatórios
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/reports/summary` | KPIs de relatórios |
| GET | `/reports/charts` | Dados dos gráficos |

### Notificações
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/notifications` | Listar notificações (somente leitura) |

## Formato de Resposta Padrão

Respostas de erro seguem o formato:

```json
{
  "message": "Descrição do erro",
  "status": 400,
  "timestamp": "2026-07-21T15:00:00Z"
}
```
