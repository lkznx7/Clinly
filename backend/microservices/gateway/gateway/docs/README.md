# Gateway Service

## Visão Geral

Gateway central baseado em **Spring Cloud Gateway** que atua como ponto único de entrada para todos os microserviços do Clinly. Responsável por roteamento, validação JWT, CORS e rate limiting.

## Tecnologias

- Java 17
- Spring Cloud Gateway
- Spring Security (JWT validation)
- Redis (para rate limiting)

## Responsabilidades

### Roteamento

O gateway roteia requisições com base no prefixo do path:

| Prefixo              | Serviço            |
|----------------------|--------------------|
| /api/auth/**         | auth-service       |
| /api/dashboard/**    | dashboard-service  |
| /api/reports/**      | relatorios-service |
| /api/notifications/**| rabbit-service     |
| /api/professionals/**| profissionais      |
| /api/appointments/** | consultas-service  |
| /api/patients/**     | pacientes-service  |
| /api/staff/**        | equipe-service     |

### Validação JWT

- Realizada por um `GlobalFilter` que intercepta todas as requisições
- Exceção: `/api/auth/**` (endpoints públicos de login/register)
- Claims validados: assinatura (HMAC/RSA), expiração, issuer
- Claims extraídos são repassados como headers internos (`X-User-Id`, `X-User-Role`)

### CORS

- Origem permitida: URL do frontend (configurada via `application.yml`)
- Métodos: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Headers: Authorization, Content-Type, Accept

### Rate Limiting (opcional)

- Implementado com Redis + RequestRateLimiter do Spring Cloud Gateway
- Limite: configurável (ex: 100 requisições/minuto por usuário)
- Aplicado por chave (user ID ou IP)

## Configuração (application.yml)

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: dashboard-service
          uri: lb://dashboard-service
          predicates:
            - Path=/api/dashboard/**
          filters:
            - StripPrefix=1
        - id: relatorios-service
          uri: lb://relatorios-service
          predicates:
            - Path=/api/reports/**
          filters:
            - StripPrefix=1
        - id: rabbit-service
          uri: lb://rabbit-service
          predicates:
            - Path=/api/notifications/**
          filters:
            - StripPrefix=1
        - id: profissionais-service
          uri: lb://profissionais-service
          predicates:
            - Path=/api/professionals/**
          filters:
            - StripPrefix=1
```
