# Report Service (Relatórios)

## Visão Geral

Serviço de relatórios e analytics do Clinly. Permite consultar KPIs agregados e dados para gráficos em um intervalo de datas. É um serviço **read-only** que realiza consultas com agregações diretamente no banco de dados.

## Tecnologias

- Java 17
- Spring Boot 3
- Spring Data JPA (Specifications / @Query)
- PostgreSQL

## Endpoints

| Método | Path                     | Descrição                          |
|--------|--------------------------|------------------------------------|
| GET    | /reports/summary         | KPIs agregados (receita, taxas)    |
| GET    | /reports/charts          | Dados mensais para gráficos        |

Todos exigem JWT e os parâmetros `startDate` e `endDate` (formato YYYY-MM-DD).
