# Dashboard Service

## Visão Geral

Serviço responsável por fornecer dados agregados e resumidos para a tela principal (dashboard) do Clinly. Este serviço é **read-only**: ele nunca cria ou altera entidades diretamente, mas consome eventos do RabbitMQ para manter suas visões materializadas atualizadas.

## Tecnologias

- Java 17
- Spring Boot 3
- Spring Data JPA
- RabbitMQ (consumidor de eventos)
- PostgreSQL (visão materializada)

## Endpoints

| Método | Path                    | Descrição                            |
|--------|-------------------------|--------------------------------------|
| GET    | /dashboard/summary      | Resumo: agendamentos, pacientes, receita |
| GET    | /dashboard/charts       | Dados para gráficos                  |
| GET    | /dashboard/activities   | Feed de atividades recentes          |

Todos os endpoints exigem JWT válido no header `Authorization: Bearer <token>`.

## Arquitetura

O serviço escuta eventos do RabbitMQ (criação de consulta, cadastro de paciente, etc.) e atualiza suas tabelas de materialized view em tempo real. As requisições HTTP consultam essas tabelas pré-agregadas para oferecer respostas rápidas sem sobrecarregar os serviços transacionais.
