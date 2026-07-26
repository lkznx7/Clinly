# Backend Model Guide — Dashboard Service

## Visão Geral

O Dashboard Service é **read-only**. Ele não possui entidades primárias que são criadas via API. Em vez disso, mantém **visões materializadas** (tabelas) que são atualizadas por eventos assíncronos vindos do RabbitMQ.

## Estrutura de Diretórios

```
src/main/java/com/clinly/dashboard/
├── controller/     # REST controllers
├── dto/            # Data Transfer Objects
├── entity/         # Entidades JPA (materialized views)
├── mappers/        # MapStruct mappers
├── repository/     # Spring Data JPA repositories
└── service/        # Regras de negócio
```

## Padrão de Consumo de Eventos (RabbitMQ)

O serviço escuta filas no RabbitMQ e processa eventos para atualizar suas visões materializadas. Abaixo estão os eventos consumidos e suas ações:

| Evento                            | Fila RabbitMQ             | Ação                                        |
|-----------------------------------|---------------------------|---------------------------------------------|
| appointment.created               | dashboard.appointment     | Incrementa appointmentsToday                |
| appointment.completed             | dashboard.appointment     | Atualiza status no materialized view        |
| appointment.cancelled             | dashboard.appointment     | Decrementa/deleta do resumo do dia          |
| patient.created                   | dashboard.patient         | Incrementa newPatientsThisMonth e activePatients |
| patient.updated                   | dashboard.patient         | Atualiza dados do paciente na view          |
| staff.added                       | dashboard.staff           | Atualiza contagem de staff                  |

### Exemplo de Consumidor

```java
@Component
public class DashboardEventConsumer {

    @RabbitListener(queues = "dashboard.appointment")
    public void handleAppointmentEvent(AppointmentEvent event) {
        switch (event.getType()) {
            case "CREATED" -> summaryService.incrementAppointmentsToday();
            case "COMPLETED" -> summaryService.updateCompletedAppointments(event.getAppointmentId());
            case "CANCELLED" -> summaryService.decrementAppointmentsToday();
        }
    }

    @RabbitListener(queues = "dashboard.patient")
    public void handlePatientEvent(PatientEvent event) {
        switch (event.getType()) {
            case "CREATED" -> summaryService.incrementNewPatients();
        }
    }
}
```

## Entidades (Materialized Views)

### DashboardSummaryEntity

| Campo                | Tipo      | Descrição                               |
|----------------------|-----------|-----------------------------------------|
| id                   | UUID      | Identificador único                     |
| appointmentsToday    | Integer   | Consultas agendadas para hoje           |
| activePatients       | Integer   | Total de pacientes ativos               |
| newPatientsThisMonth | Integer   | Novos pacientes no mês corrente         |
| revenueThisMonth     | Double    | Receita acumulada no mês corrente       |
| updatedAt            | Instant   | Última atualização                      |

### RecentActivityEntity

| Campo       | Tipo          | Descrição                              |
|-------------|---------------|----------------------------------------|
| id          | UUID          | Identificador único                    |
| type        | ActivityType  | Tipo da atividade (enum)               |
| description | String        | Descrição textual                      |
| timestamp   | Instant       | Momento em que ocorreu                 |
