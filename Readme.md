# 🏥 Clinly

> Um sistema de gestão para clínicas desenvolvido com foco em arquitetura moderna, segurança e sistemas distribuídos.

> **Este projeto não tem como objetivo principal ser um ERP completo**, mas sim servir como laboratório para estudar tecnologias e padrões utilizados em aplicações de grande porte.

---

# Objetivo

O Clinly foi criado para aprofundar conhecimentos em:

- Arquitetura Orientada a Eventos (EDA)
- RabbitMQ
- Concorrência
- Segurança
- Autenticação e Autorização
- Criptografia moderna
- Microsserviços (futuramente)

O projeto prioriza qualidade de arquitetura em vez da quantidade de funcionalidades.

---

# Tecnologias

## Backend

- Java 21
- Spring Boot 4
- Spring Modulith
- Spring Security
- PostgreSQL
- Flyway
- Redis
- Docker
- Maven

---

## Frontend (futuro)

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui

---

# Objetivos de Aprendizado

## Segurança

### Argon2

Utilização do algoritmo **Argon2id** para hash de senhas, estudando:

- Password Hashing
- Salt
- Verificação de senhas
- Migração de algoritmos
- Configuração de custo (Memory, Iterations e Parallelism)

---

### OAuth2

Estudo completo do protocolo OAuth2:

- Authorization Code Flow
- Client Credentials
- Refresh Token
- Access Token
- Scopes
- Resource Server
- Authorization Server

---

### Keycloak

Integração completa utilizando Keycloak para aprender:

- Identity Provider (IdP)
- Single Sign-On (SSO)
- OpenID Connect (OIDC)
- OAuth2
- JWT
- Realm
- Clients
- Roles
- Groups
- Users
- Federated Identity

---

# Event Driven Architecture (EDA)

Todo o sistema será desenvolvido utilizando eventos sempre que possível.

Exemplos:

- Paciente criado
- Consulta agendada
- Consulta cancelada
- Consulta finalizada

Cada ação poderá gerar eventos consumidos por outros módulos.

---

# RabbitMQ

O projeto servirá para estudar:

- Exchanges
- Queues
- Routing Keys
- Fanout
- Topic Exchange
- Direct Exchange
- Dead Letter Queue (DLQ)
- Retry
- Publisher
- Consumer
- Acknowledgement
- Prefetch
- Ordering
- Idempotência
- Outbox Pattern

---

# Concorrência

O projeto também será utilizado para aprender:

- Programação concorrente
- Virtual Threads (Java)
- Locks
- Optimistic Lock
- Pessimistic Lock
- Race Conditions
- Processamento paralelo
- Transações
- Controle de concorrência

---

# Arquitetura

O projeto utilizará arquitetura modular baseada em Spring Modulith.

```
clinly

├── auth
├── patient
├── doctor
├── appointment
├── notification
└── audit
```

Cada módulo será responsável apenas pelo seu domínio.

A comunicação entre módulos poderá ocorrer através de eventos internos e, posteriormente, utilizando RabbitMQ.

---

# Módulos

## Auth

Responsável por:

- Login
- Autenticação
- Autorização
- JWT
- OAuth2
- Integração com Keycloak

---

## Patient

Gerenciamento de pacientes.

---

## Doctor

Gerenciamento de médicos.

---

## Appointment

Responsável pelo agendamento de consultas.

Este será o principal produtor de eventos do sistema.

---

## Notification

Consumidor de eventos responsável por notificações.

---

## Audit

Consumidor responsável pelo registro de auditoria.

---

# Eventos

Exemplos de eventos que poderão existir:

- PatientCreated
- PatientUpdated
- DoctorCreated
- AppointmentCreated
- AppointmentConfirmed
- AppointmentCancelled
- AppointmentFinished

---

# Objetivos Técnicos

Durante o desenvolvimento serão estudados e implementados conceitos como:

- Clean Code
- SOLID
- Clean Architecture
- Modular Monolith
- Event Driven Architecture
- Domain Events
- Transactional Outbox
- Idempotência
- Retry Pattern
- CQRS (quando fizer sentido)
- Observabilidade
- Logging estruturado
- Tratamento global de exceções
- Testes automatizados

---

# Aviso

Este projeto é um laboratório de estudos.

Novas funcionalidades poderão ser adicionadas conforme novos conceitos forem sendo aprendidos.

O foco principal é evoluir conhecimentos em arquitetura de software, segurança e sistemas distribuídos, utilizando um domínio simples para facilitar a experimentação.