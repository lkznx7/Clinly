# Enumerações

## PatientStatus

Status do paciente no sistema.

| Valor | Descrição |
|-------|-----------|
| `ACTIVE` | Paciente ativo |
| `INACTIVE` | Paciente inativo |
| `ARCHIVED` | Paciente arquivado |

## StaffStatus

Status do membro da equipe.

| Valor | Descrição |
|-------|-----------|
| `ACTIVE` | Membro ativo |
| `INACTIVE` | Membro inativo |
| `ON_LEAVE` | Membro ausente/licenciado |

## AppointmentStatus

Status da consulta/agendamento.

| Valor | Descrição |
|-------|-----------|
| `SCHEDULED` | Consulta agendada |
| `CONFIRMED` | Consulta confirmada pelo paciente |
| `IN_PROGRESS` | Consulta em andamento |
| `COMPLETED` | Consulta concluída |
| `CANCELLED` | Consulta cancelada |
| `NO_SHOW` | Paciente não compareceu |

## StaffRole

Cargo do membro da equipe.

| Valor | Descrição |
|-------|-----------|
| `DOCTOR` | Médico(a) |
| `NURSE` | Enfermeiro(a) |
| `RECEPTIONIST` | Recepcionista |
| `ADMIN` | Administrador(a) |

## AppointmentType

Tipo da consulta.

| Valor | Descrição |
|-------|-----------|
| `CONSULTATION` | Consulta padrão |
| `FOLLOW_UP` | Retorno |
| `EXAM` | Exame |
| `PROCEDURE` | Procedimento |
| `TELEMEDICINE` | Telemedicina |

## Gender

Gênero do paciente.

| Valor | Descrição |
|-------|-----------|
| `MALE` | Masculino |
| `FEMALE` | Feminino |
| `OTHER` | Outro |
