# Staff Service (Equipe)

Microservice responsible for managing clinic staff members. Provides CRUD operations for doctors, nurses, receptionists, and administrators.

## Responsibilities

- Staff member registration and management
- Role-based access control integration
- CRM validation for doctors
- Staff search and filtering

## Tech Stack

- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL
- Springdoc OpenAPI

## Running

```bash
# start with docker
docker compose up -d

# or via Maven
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080/api/staff`.
