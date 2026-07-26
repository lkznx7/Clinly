# Patient Service — Clinly

Microserviço responsável pelo gerenciamento de pacientes do sistema Clinly.

## Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| `GET` | `/patients` | Lista pacientes (paginado) com filtros `page`, `size`, `search`, `status`, `sort` |
| `POST` | `/patients` | Cria um novo paciente |
| `GET` | `/patients/{id}` | Busca paciente por UUID |
| `PUT` | `/patients/{id}` | Atualiza paciente existente |
| `DELETE` | `/patients/{id}` | Exclui paciente |

## Autenticação

Todos os endpoints exigem token JWT no header `Authorization: Bearer <token>`.

## Schema Principal

A entidade `Patient` contém: id (UUID), name, email (único), phone, cpf (único), birthDate, gender (MALE/FEMALE/OTHER), address, status (ACTIVE/INACTIVE/ARCHIVED), lastAppointment, nextAppointment, createdAt, updatedAt.

## Documentação

- [OpenAPI 3.1](./openapi.yaml) — Especificação completa dos endpoints
- [Backend Model Guide](./backend-model-guide.md) — Guia da entidade JPA
- [Schemas](./schemas/) — Definições de enums
- [Examples](./examples/) — Exemplos de requisições e respostas JSON
