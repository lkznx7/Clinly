# CLINLY - Checklist de Requisitos

> Clinly é um sistema de gestão de clínicas baseado em um Monólito Modular desenvolvido com Java 21 e Spring Boot 4. Este documento possui todas as funcionalidades do MVP organizadas como checklist para acompanhamento do desenvolvimento.

---

## Status Geral

| Indicador | Valor |
|---|---|
| Módulos | 7 |
| Requisitos Funcionais | 15 |
| Funcionalidades Totais | 53 |

---

## Auth

> Módulo finalizado. Não realizar alterações.

- [x] Login
- [x] JWT
- [x] Refresh Token
- [x] OAuth2
- [x] Spring Security

---

## Clinics

- [x] Cadastrar clínica
- [ ] Editar clínica
- [ ] Visualizar dados da clínica
- [ ] Configurar endereço
- [ ] Configurar horário de funcionamento
- [ ] Ativar/Inativar clínica
- [ ] Configurações gerais

---

## Users

- [ ] Cadastrar usuário
- [ ] Editar usuário
- [ ] Excluir usuário
- [ ] Ativar usuário
- [ ] Desativar usuário
- [ ] Buscar usuário
- [ ] Listar usuários
- [ ] Alterar cargo (Role)
- [ ] Alterar permissões
- [ ] Atualizar perfil

---

## Patients

- [ ] Cadastrar paciente
- [ ] Editar paciente
- [ ] Buscar paciente
- [ ] Listar pacientes
- [ ] Inativar paciente
- [ ] Atualizar informações pessoais
- [ ] Registrar observações

---

## Appointments

- [ ] Agendar consulta
- [ ] Editar consulta
- [ ] Remarcar consulta
- [ ] Cancelar consulta
- [ ] Confirmar consulta
- [ ] Registrar falta
- [ ] Visualizar agenda
- [ ] Visualizar consultas futuras
- [ ] Visualizar histórico de consultas
- [ ] Registrar observações da consulta

---

## Notifications

- [ ] Criar notificação
- [ ] Listar notificações
- [ ] Marcar como lida
- [ ] Excluir notificação

---

## Dashboard

- [ ] Consultas do dia
- [ ] Consultas da semana
- [ ] Total de pacientes
- [ ] Total de usuários
- [ ] Total de profissionais
- [ ] Cancelamentos
- [ ] Indicadores gerais

---

# Roles

## ADMIN

- [ ] Gerenciar clínica
- [ ] Gerenciar usuários
- [ ] Gerenciar pacientes
- [ ] Gerenciar agenda
- [ ] Gerenciar consultas
- [ ] Gerenciar configurações
- [ ] Visualizar dashboard
- [ ] Visualizar relatórios
- [ ] Gerenciar permissões

## SECRETÁRIA

- [ ] Cadastrar pacientes
- [ ] Editar pacientes
- [ ] Agendar consultas
- [ ] Remarcar consultas
- [ ] Cancelar consultas
- [ ] Confirmar presença
- [ ] Registrar faltas
- [ ] Visualizar agenda
- [ ] Pesquisar pacientes

## PROFISSIONAL

- [ ] Visualizar agenda
- [ ] Atualizar disponibilidade
- [ ] Visualizar pacientes
- [ ] Registrar observações
- [ ] Confirmar consultas
- [ ] Cancelar consultas (quando permitido)
- [ ] Visualizar dashboard pessoal

## PACIENTE (Futuro)

> Este módulo não faz parte do MVP inicial.

- [ ] Visualizar consultas
- [ ] Cancelar consulta
- [ ] Atualizar dados pessoais
- [ ] Receber notificações

---

# Requisitos Funcionais

- [ ] RF001 - O sistema deve permitir cadastrar uma clínica.
- [ ] RF002 - O sistema deve permitir cadastrar usuários.
- [ ] RF003 - O sistema deve permitir editar usuários.
- [ ] RF004 - O sistema deve permitir ativar e desativar usuários.
- [ ] RF005 - O sistema deve permitir cadastrar pacientes.
- [ ] RF006 - O sistema deve permitir editar pacientes.
- [ ] RF007 - O sistema deve permitir pesquisar pacientes.
- [ ] RF008 - O sistema deve permitir agendar consultas.
- [ ] RF009 - O sistema deve permitir remarcar consultas.
- [ ] RF010 - O sistema deve permitir cancelar consultas.
- [ ] RF011 - O sistema deve permitir visualizar agenda.
- [ ] RF012 - O sistema deve permitir visualizar consultas futuras.
- [ ] RF013 - O sistema deve permitir registrar observações da consulta.
- [ ] RF014 - O sistema deve permitir visualizar notificações.
- [ ] RF015 - O sistema deve apresentar um dashboard com indicadores.

---

# Roadmap

## Fase 1

- [ ] Banco de dados
- [ ] Entidades
- [ ] Repositórios

## Fase 2

- [ ] Clinics
- [ ] Users
- [ ] Patients

## Fase 3

- [ ] Appointments
- [ ] Notifications
- [ ] Dashboard

## Fase 4

- [ ] Testes
- [ ] Documentação
- [ ] Deploy

---

# Progresso

| Fase | Status |
|---|---|
| Auth | Concluído |
| Clinics | Pendente |
| Users | Pendente |
| Patients | Pendente |
| Appointments | Pendente |
| Notifications | Pendente |
| Dashboard | Pendente |
