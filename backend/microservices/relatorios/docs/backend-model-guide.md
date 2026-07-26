# Backend Model Guide — Report Service

## Visão Geral

O Report Service é **read-only / analytics**. Ele não possui entidades de domínio próprias. Em vez disso, consulta tabelas dos serviços transacionais (appointments, patients, payments) usando **Spring Data JPA Specifications** e **@Query** com agregações e filtros por intervalo de datas.

## Estrutura de Diretórios

```
src/main/java/com/clinly/relatorios/
├── controller/     # REST controllers
├── dto/            # Data Transfer Objects
├── repository/     # Spring Data JPA repositories
└── service/        # Regras de negócio
```

## Padrão de Consulta com Agregações

O serviço usa `@Query` com funções de agregação do PostgreSQL e Specifications para filtrar por período.

### Exemplo: ReportSummary

```java
@Repository
public interface AppointmentReportRepository extends JpaRepository<Appointment, UUID> {

    @Query("""
        SELECT new com.clinly.relatorios.dto.ReportSummaryDTO(
            COALESCE(SUM(a.value), 0),
            COUNT(a.id),
            COUNT(DISTINCT a.patientId),
            CAST(COUNT(CASE WHEN a.status = 'CANCELLED' THEN 1 END) AS double) / NULLIF(COUNT(a.id), 0),
            CAST(COUNT(CASE WHEN a.status = 'NO_SHOW' THEN 1 END) AS double) / NULLIF(COUNT(a.id), 0)
        )
        FROM Appointment a
        WHERE a.date BETWEEN :startDate AND :endDate
    """)
    ReportSummaryDTO findReportSummary(@Param("startDate") LocalDate startDate,
                                       @Param("endDate") LocalDate endDate);
}
```

### Exemplo: ReportChartData com Specifications

```java
@Repository
public interface AppointmentChartRepository extends JpaRepository<Appointment, UUID>,
                                                    JpaSpecificationExecutor<Appointment> {

    @Query("""
        SELECT new com.clinly.relatorios.dto.RevenueByMonthDTO(
            FUNCTION('TO_CHAR', a.date, 'YYYY-MM'),
            SUM(a.value)
        )
        FROM Appointment a
        WHERE a.date BETWEEN :startDate AND :endDate
        GROUP BY FUNCTION('TO_CHAR', a.date, 'YYYY-MM')
        ORDER BY FUNCTION('TO_CHAR', a.date, 'YYYY-MM')
    """)
    List<RevenueByMonthDTO> findRevenueByMonth(@Param("startDate") LocalDate startDate,
                                               @Param("endDate") LocalDate endDate);
}
```

### Specifications para Filtros Dinâmicos

```java
public class ReportSpecifications {

    public static Specification<Appointment> dateBetween(LocalDate start, LocalDate end) {
        return (root, query, cb) -> cb.between(root.get("date"), start, end);
    }

    public static Specification<Appointment> statusIn(List<AppointmentStatus> statuses) {
        return (root, query, cb) -> root.get("status").in(statuses);
    }
}
```
