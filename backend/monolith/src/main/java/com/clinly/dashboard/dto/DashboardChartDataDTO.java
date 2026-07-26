package com.clinly.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record DashboardChartDataDTO(
        List<RevenueByMonth> revenueByMonth,
        List<AppointmentsByType> appointmentsByType,
        List<AppointmentsByStatus> appointmentsByStatus
) {
    public record RevenueByMonth(String month, double revenue) {}
    public record AppointmentsByType(String type, int count) {}
    public record AppointmentsByStatus(String status, int count) {}
}
