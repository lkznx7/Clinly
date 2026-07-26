package com.clinly.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record DashboardSummaryDTO(
        int appointmentsToday,
        long activePatients,
        long newPatientsThisMonth,
        double revenueThisMonth
) {}
