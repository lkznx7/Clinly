# Staff Entity Guide

## Table

`staff`

## Columns

| Campo | Tipo Java | Anotações | Obrigatório |
|-------|-----------|-----------|-------------|
| id | UUID | `@Id` `@GeneratedValue` | Sim |
| name | String | `@NotBlank` `@Size(min=3, max=120)` | Sim |
| email | String | `@NotBlank` `@Email` `@Size(max=255)` `@Column(unique=true)` | Sim |
| phone | String | `@NotBlank` `@Size(min=8, max=20)` | Sim |
| role | StaffRole (enum) | `@NotNull` `@Enumerated(EnumType.STRING)` | Sim |
| specialty | String | `@Size(max=100)` | Não |
| crm | String | `@Size(max=20)` `@Column(unique=true)` | Não (obrigatório se DOCTOR) |
| status | StaffStatus (enum) | `@NotNull` `@Enumerated(EnumType.STRING)` | Sim (default ACTIVE) |
| avatarUrl | String | `@Size(max=500)` | Não |
| createdAt | Instant | `@CreatedDate` | Sim |
| updatedAt | Instant | `@LastModifiedDate` | Sim |

## Índices

| Nome | Coluna | Tipo |
|------|--------|------|
| idx_staff_email | email | unique |
| idx_staff_crm | crm | unique (nullable) |
| idx_staff_role | role | |
| idx_staff_status | status | |

## Regras de Negócio

- CRM deve ser informado quando `role = DOCTOR`
- Email e CRM são únicos no banco
- Status padrão é `ACTIVE` ao criar
