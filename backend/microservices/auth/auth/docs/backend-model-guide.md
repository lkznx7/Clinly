# User Entity Guide

## Table: `users`

| Campo | Tipo Java | Anotações | Obrigatório |
|-------|-----------|-----------|-------------|
| id | UUID | `@Id` `@GeneratedValue` | Sim |
| name | String | `@NotBlank` `@Size(min=2, max=120)` | Sim |
| email | String | `@NotBlank` `@Email` `@Size(max=255)` `@Column(unique=true)` | Sim |
| password | String | `@NotBlank` `@Size(min=8, max=100)` | Sim |
| role | UserRole (enum: `USER`, `ADMIN`) | `@NotNull` `@Enumerated(EnumType.STRING)` | Sim |
| createdAt | Instant | `@CreatedDate` | Sim |
| updatedAt | Instant | `@LastModifiedDate` | Sim |

## Índices

| Nome | Coluna(s) | Tipo |
|------|-----------|------|
| `idx_user_email` | email | Único |

## Validações

```java
@NotBlank @Size(min = 2, max = 120) String name
@NotBlank @Email @Size(max = 255) String email
@NotBlank @Size(min = 8, max = 100) String password
@NotNull UserRole role
```

## DDL (PostgreSQL)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_email ON users (email);
```

## Eventos Publicados

O auth-service **não** publica eventos no RabbitMQ. O cadastro de usuário é um domínio interno do auth-service.
