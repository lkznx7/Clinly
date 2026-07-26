# Service Map — Clinly

## Mapeamento de Endpoints para Microserviços

| Endpoint | Método | Microserviço | Descrição |
|----------|--------|-------------|-----------|
| `/auth/register` | POST | auth-service | Registro de usuário |
| `/auth/login` | POST | auth-service | Login |
| `/dashboard/summary` | GET | dashboard-service | KPIs do dashboard |
| `/dashboard/charts` | GET | dashboard-service | Dados dos gráficos |
| `/dashboard/activities` | GET | dashboard-service | Atividades recentes |
| `/patients` | GET | patient-service | Listar pacientes |
| `/patients` | POST | patient-service | Criar paciente |
| `/patients/{id}` | GET | patient-service | Buscar paciente |
| `/patients/{id}` | PUT | patient-service | Atualizar paciente |
| `/patients/{id}` | DELETE | patient-service | Excluir paciente |
| `/appointments` | GET | appointment-service | Listar agendamentos |
| `/appointments` | POST | appointment-service | Criar agendamento |
| `/appointments/{id}` | GET | appointment-service | Buscar agendamento |
| `/appointments/{id}` | PUT | appointment-service | Atualizar agendamento |
| `/appointments/{id}` | DELETE | appointment-service | Excluir agendamento |
| `/staff` | GET | staff-service | Listar equipe |
| `/staff` | POST | staff-service | Criar membro |
| `/staff/{id}` | GET | staff-service | Buscar membro |
| `/staff/{id}` | PUT | staff-service | Atualizar membro |
| `/staff/{id}` | DELETE | staff-service | Excluir membro |
| `/professionals` | GET | professional-service | Listar profissionais |
| `/dashboard/summary` | GET | dashboard-service | KPIs do dashboard |
| `/dashboard/charts` | GET | dashboard-service | Dados dos gráficos |
| `/dashboard/activities` | GET | dashboard-service | Atividades recentes |
| `/reports/summary` | GET | report-service | Resumo de relatórios |
| `/reports/charts` | GET | report-service | Dados dos gráficos |
| `/notifications` | GET | notification-service | Listar notificações |

## Comunicação entre Serviços

### Síncrona (via Gateway)
- O frontend se comunica exclusivamente com o Gateway
- O Gateway roteia para o microserviço adequado
- Autenticação JWT validada no Gateway (token validation filter)

### Assíncrona (via RabbitMQ)
- Eventos de domínio publicados no RabbitMQ
- Serviços interessados consomem os eventos
- Exemplos:
  - `patient.created` → atualizar dashboard, notificar
  - `appointment.created` → atualizar dashboard, notificar
  - `appointment.updated` → atualizar dashboard
  - `appointment.cancelled` → atualizar dashboard, notificar

## Tecnologias

| Componente | Tecnologia |
|------------|-----------|
| Linguagem | Java 21 |
| Framework | Spring Boot 3.x |
| Gateway | Spring Cloud Gateway |
| Banco | PostgreSQL (cada serviço tem seu banco) |
| Mensageria | RabbitMQ |
| Autenticação | JWT (jjwt) |
| Documentação | OpenAPI 3.1 (SpringDoc) |
| Migrações | Flyway |
| Testes | JUnit 5 + Mockito + Testcontainers |
