package com.clinly.reports.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ReportSummaryDTO(
        double totalRevenue,
        long totalAppointments,
        long totalPatients,
        double cancellationRate,
        double noShowRate
) {}
