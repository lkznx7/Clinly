# Appointment Service

Microserviço de gerenciamento de consultas da plataforma Clinly.

## Responsabilidades

- CRUD completo de consultas (appointments)
- Verificação de conflitos de horário por profissional
- Paginação e filtros (data, profissional, status)
- Denormalização de nomes de paciente e profissional para consultas rápidas

## Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/appointments` | Listar consultas (paginado) |
| POST | `/appointments` | Criar consulta |
| GET | `/appointments/{id}` | Buscar por ID |
| PUT | `/appointments/{id}` | Atualizar consulta |
| DELETE | `/appointments/{id}` | Excluir consulta |

## Regras de Negócio

- `startTime` deve ser anterior a `endTime`
- Não pode haver conflito de horário para o mesmo profissional na mesma data
- Data não pode estar no passado no momento da criação
- Campos `patientName` e `professionalName` são denormalizados para evitar joins em listagens

## Tecnologias

- Java 21 + Spring Boot 3.x
- Spring Data JPA + Hibernate
- PostgreSQL
- Spring Security + JWT
- Jakarta Validation
- SpringDoc OpenAPI

## Documentação OpenAPI

Disponível em `openapi.yaml` nesta pasta.
