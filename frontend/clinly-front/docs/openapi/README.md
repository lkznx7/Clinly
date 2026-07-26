# Clinly API — Documentação OpenAPI 3.1

Esta pasta contém a especificação completa da API do Clinly no padrão OpenAPI 3.1.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `openapi.yaml` | Especificação OpenAPI 3.1 completa (endpoints, schemas, exemplos, erros) |
| `backend-model-guide.md` | Guia de entidades JPA (campos, tipos Java, relacionamentos, índices, validações) |

## Pastas

| Pasta | Descrição |
|-------|-----------|
| `schemas/` | Schemas individuais por domínio (auth, patient, appointment, staff, dashboard, etc.) |
| `examples/` | Exemplos de request/response JSON para cada endpoint |

## Como usar

1. Abra `openapi.yaml` no Swagger Editor, Stoplight, ou Redoc para visualizar a documentação interativa
2. Consulte `backend-model-guide.md` para implementar as entidades JPA
3. Cada schema em `schemas/` detalha campos, tipos, validações e constraints

## Origem dos dados

Toda a documentação foi gerada a partir da análise completa do frontend:

- Páginas e rotas
- Formulários e validações
- Hooks e services
- Tipos TypeScript
- Componentes e suas props
- Tabelas, filtros e buscas

Nenhum endpoint foi inventado. Tudo documentado reflete exatamente o que o frontend espera consumir.

## Distribuição para o Backend

A documentação também foi distribuída para cada microserviço em:

```
backend/microservices/
├── openapi-complete.yaml     → API consolidada
├── architecture.md           → Visão geral dos microserviços
├── service-map.md            → Mapeamento endpoint → serviço
├── backend-model-guide.md    → Guia completo de entidades
├── auth/auth/docs/           → Documentação do auth-service
├── pacientes/docs/           → Documentação do patient-service
├── consultas/docs/           → Documentação do appointment-service
├── equipe/docs/              → Documentação do staff-service
├── profissionais/docs/       → Documentação do professional-service
├── dashboard/Dashboard/docs/ → Documentação do dashboard-service
├── relatorios/docs/          → Documentação do report-service
├── rabbit/docs/              → Documentação do notification-service
└── gateway/gateway/docs/     → Documentação do gateway
```

## Endpoints

| Método | Endpoint | Serviço | Descrição |
|--------|----------|---------|-----------|
| POST | `/auth/register` | auth | Registro de usuário |
| POST | `/auth/login` | auth | Login |
| GET | `/dashboard/summary` | dashboard | KPIs do dashboard |
| GET | `/dashboard/charts` | dashboard | Dados dos gráficos |
| GET | `/dashboard/activities` | dashboard | Atividades recentes |
| GET | `/patients` | patients | Listar pacientes (paginado) |
| POST | `/patients` | patients | Criar paciente |
| GET | `/patients/{id}` | patients | Buscar paciente |
| PUT | `/patients/{id}` | patients | Atualizar paciente |
| DELETE | `/patients/{id}` | patients | Excluir paciente |
| GET | `/appointments` | appointments | Listar agendamentos (paginado) |
| POST | `/appointments` | appointments | Criar agendamento |
| GET | `/appointments/{id}` | appointments | Buscar agendamento |
| PUT | `/appointments/{id}` | appointments | Atualizar agendamento |
| DELETE | `/appointments/{id}` | appointments | Excluir agendamento |
| GET | `/staff` | staff | Listar equipe (paginado) |
| POST | `/staff` | staff | Criar membro |
| GET | `/staff/{id}` | staff | Buscar membro |
| PUT | `/staff/{id}` | staff | Atualizar membro |
| DELETE | `/staff/{id}` | staff | Excluir membro |
| GET | `/professionals` | professionals | Listar profissionais (dropdown) |
| GET | `/reports/summary` | reports | Resumo de relatórios |
| GET | `/reports/charts` | reports | Dados dos gráficos |
| GET | `/notifications` | notifications | Listar notificações |
