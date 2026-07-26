# Backend Model Guide — Gateway Service

## Visão Geral

O Gateway Service **não possui entidades JPA ou banco de dados**. Ele é puramente uma camada de infraestrutura que roteia requisições entre o frontend e os microserviços internos.

## Estrutura de Diretórios

```
src/main/java/com/clinly/gateway/
├── config/          # Configurações (CORS, Security, Routes)
├── filter/          # Filtros customizados (JWT validation)
└── GatewayApplication.java
```

## Componentes Principais

### JwtAuthGlobalFilter

Filtro que intercepta todas as requisições, valida o token JWT e adiciona headers com os dados do usuário autenticado para os serviços downstream.

```java
@Component
public class JwtAuthGlobalFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        if (path.startsWith("/api/auth/")) {
            return chain.filter(exchange);
        }
        String token = extractToken(exchange.getRequest());
        Claims claims = jwtValidator.validate(token);
        exchange = addUserHeaders(exchange, claims);
        return chain.filter(exchange);
    }
}
```

### RouteLocator

Define as rotas do gateway usando a DSL do Spring Cloud Gateway.

```java
@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("dashboard-service", r -> r
            .path("/api/dashboard/**")
            .filters(f -> f.stripPrefix(1))
            .uri("lb://dashboard-service"))
        .route("relatorios-service", r -> r
            .path("/api/reports/**")
            .filters(f -> f.stripPrefix(1))
            .uri("lb://relatorios-service"))
        .route("rabbit-service", r -> r
            .path("/api/notifications/**")
            .filters(f -> f.stripPrefix(1))
            .uri("lb://rabbit-service"))
        .route("profissionais-service", r -> r
            .path("/api/professionals/**")
            .filters(f -> f.stripPrefix(1))
            .uri("lb://profissionais-service"))
        .build();
}
```

### CorsConfig

Configuração de CORS para permitir requisições do frontend.

```java
@Bean
public CorsWebFilter corsWebFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(frontendUrl));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
    config.setAllowCredentials(true);
    return new CorsWebFilter(source -> config);
}
```
