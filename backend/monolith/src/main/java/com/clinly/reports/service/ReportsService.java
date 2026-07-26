package com.clinly.reports.service;

import com.clinly.appointments.repository.AppointmentRepository;
import com.clinly.patients.repository.PatientRepository;
import com.clinly.reports.dto.ReportChartDataDTO;
import com.clinly.reports.dto.ReportSummaryDTO;
import com.clinly.shared.enums.AppointmentStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportsService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    public ReportsService(AppointmentRepository appointmentRepository,
                          PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }

    public ReportSummaryDTO getSummary(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate != null ? startDate.atStartOfDay() : LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = endDate != null ? endDate.atTime(23, 59, 59) : LocalDate.now().atTime(23, 59, 59);

        long totalAppointments = appointmentRepository.countByStartAtBetween(start, end);
        long cancelled = appointmentRepository.countByStatus(AppointmentStatus.CANCELLED);
        long noShow = appointmentRepository.countByStatus(AppointmentStatus.NO_SHOW);
        long totalPatients = patientRepository.count();

        double cancellationRate = totalAppointments > 0 ? (double) cancelled / totalAppointments * 100 : 0;
        double noShowRate = totalAppointments > 0 ? (double) noShow / totalAppointments * 100 : 0;

        return new ReportSummaryDTO(
                0.0,
                totalAppointments,
                totalPatients,
                Math.round(cancellationRate * 100.0) / 100.0,
                Math.round(noShowRate * 100.0) / 100.0
        );
    }

    public ReportChartDataDTO getCharts(LocalDate startDate, LocalDate endDate) {
        List<ReportChartDataDTO.RevenueByMonth> revenueByMonth = new ArrayList<>();
        List<ReportChartDataDTO.AppointmentsByMonth> appointmentsByMonth = new ArrayList<>();
        List<ReportChartDataDTO.AppointmentsBySpecialty> appointmentsBySpecialty = new ArrayList<>();
        List<ReportChartDataDTO.CancellationByMonth> cancellationByMonth = new ArrayList<>();

        for (int i = 11; i >= 0; i--) {
            YearMonth ym = YearMonth.now().minusMonths(i);
            String monthLabel = ym.format(DateTimeFormatter.ofPattern("MMM"));
            LocalDateTime monthStart = ym.atDay(1).atStartOfDay();
            LocalDateTime monthEnd = ym.atEndOfMonth().atTime(23, 59, 59);

            long count = appointmentRepository.countByStartAtBetween(monthStart, monthEnd);
            appointmentsByMonth.add(new ReportChartDataDTO.AppointmentsByMonth(monthLabel, (int) count));
            revenueByMonth.add(new ReportChartDataDTO.RevenueByMonth(monthLabel, 0));
            cancellationByMonth.add(new ReportChartDataDTO.CancellationByMonth(monthLabel, 0));
        }

        return new ReportChartDataDTO(revenueByMonth, appointmentsByMonth, appointmentsBySpecialty, cancellationByMonth);
    }
}
