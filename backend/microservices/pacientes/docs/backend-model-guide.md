# Patient Entity — Guia do Modelo

## Tabela

`patients`

## Campos

| Campo | Tipo Java | Anotações JPA / Validation | Obrigatório |
|-------|-----------|----------------------------|-------------|
| id | `UUID` | `@Id` `@GeneratedValue` | Sim |
| name | `String` | `@NotBlank` `@Size(min=3, max=120)` | Sim |
| email | `String` | `@NotBlank` `@Email` `@Size(max=255)` `@Column(unique=true)` | Sim |
| phone | `String` | `@NotBlank` `@Size(min=8, max=20)` | Sim |
| cpf | `String` | `@NotBlank` `@Size(min=11, max=14)` `@Column(unique=true)` | Sim |
| birthDate | `LocalDate` | `@NotNull` | Sim |
| gender | `Gender` (enum) | `@NotNull` `@Enumerated(EnumType.STRING)` | Sim |
| address | `String` | `@Size(max=500)` | Não |
| status | `PatientStatus` (enum) | `@NotNull` `@Enumerated(EnumType.STRING)` | Sim (default ACTIVE) |
| createdAt | `Instant` | `@CreatedDate` | Sim |
| updatedAt | `Instant` | `@LastModifiedDate` | Sim |

## Índices

| Nome | Campo(s) | Tipo |
|------|----------|------|
| `idx_patient_email` | email | unique |
| `idx_patient_cpf` | cpf | unique |
| `idx_patient_name` | name | b-tree |
| `idx_patient_status` | status | b-tree |

## Relacionamentos

- `@OneToMany(mappedBy = "patient") List<Appointment> appointments` — Consultas do paciente

## Campos Calculados (não armazenados)

- `lastAppointment` — Data da consulta mais recente (MAX date em appointments)
- `nextAppointment` — Data da próxima consulta futura (MIN date em appointments)

## Enums

### PatientStatus

| Valor | Descrição |
|-------|-----------|
| `ACTIVE` | Paciente ativo |
| `INACTIVE` | Paciente inativo |
| `ARCHIVED` | Paciente arquivado |

### Gender

| Valor | Descrição |
|-------|-----------|
| `MALE` | Masculino |
| `FEMALE` | Feminino |
| `OTHER` | Outro |

## Bean Validation

```java
@NotBlank @Size(min = 3, max = 120) String name
@NotBlank @Email @Size(max = 255) String email
@NotBlank @Size(min = 8, max = 20) String phone
@NotBlank @Size(min = 11, max = 14) String cpf
@NotNull LocalDate birthDate
@NotNull Gender gender
@Size(max = 500) String address
@NotNull PatientStatus status  // default ACTIVE
```

## Regras de Negócio

- Email e CPF devem ser únicos no sistema (unique constraints)
- Soft delete via status `ARCHIVED` em vez de exclusão física
- Ao excluir um paciente, considerar cancelar appointments futuros
