package com.clinly.reports.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ReportChartDataDTO(
        List<RevenueByMonth> revenueByMonth,
        List<AppointmentsByMonth> appointmentsByMonth,
        List<AppointmentsBySpecialty> appointmentsBySpecialty,
        List<CancellationByMonth> cancellationByMonth
) {
    public record RevenueByMonth(String month, double revenue) {}
    public record AppointmentsByMonth(String month, int count) {}
    public record AppointmentsBySpecialty(String specialty, int count) {}
    public record CancellationByMonth(String month, int count) {}
}
