package com.clinly.dashboard.service;

import com.clinly.appointments.repository.AppointmentRepository;
import com.clinly.dashboard.dto.DashboardChartDataDTO;
import com.clinly.dashboard.dto.DashboardSummaryDTO;
import com.clinly.dashboard.dto.RecentActivityDTO;
import com.clinly.patients.repository.PatientRepository;
import com.clinly.shared.enums.AppointmentStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DashboardService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;

    public DashboardService(AppointmentRepository appointmentRepository,
                            PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }

    public DashboardSummaryDTO getSummary() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        LocalDateTime startOfMonth = YearMonth.now().atDay(1).atStartOfDay();

        long appointmentsToday = appointmentRepository.countByStartAtBetween(startOfDay, endOfDay);
        long activePatients = patientRepository.count();
        long newPatientsThisMonth = patientRepository.countByCreatedAtAfter(startOfMonth);

        return new DashboardSummaryDTO(
                (int) appointmentsToday,
                activePatients,
                newPatientsThisMonth,
                0.0
        );
    }

    public DashboardChartDataDTO getCharts() {
        List<DashboardChartDataDTO.RevenueByMonth> revenueByMonth = new ArrayList<>();
        List<DashboardChartDataDTO.AppointmentsByType> appointmentsByType = new ArrayList<>();
        List<DashboardChartDataDTO.AppointmentsByStatus> appointmentsByStatus = new ArrayList<>();

        for (int i = 5; i >= 0; i--) {
            YearMonth ym = YearMonth.now().minusMonths(i);
            String monthLabel = ym.format(DateTimeFormatter.ofPattern("MMM"));
            revenueByMonth.add(new DashboardChartDataDTO.RevenueByMonth(monthLabel, 0));
        }

        for (AppointmentStatus status : AppointmentStatus.values()) {
            long count = appointmentRepository.countByStatus(status);
            appointmentsByStatus.add(new DashboardChartDataDTO.AppointmentsByStatus(status.name(), (int) count));
        }

        return new DashboardChartDataDTO(revenueByMonth, appointmentsByType, appointmentsByStatus);
    }

    public List<RecentActivityDTO> getActivities() {
        List<RecentActivityDTO> activities = new ArrayList<>();

        appointmentRepository.findTop5ByOrderByCreatedAtDesc().forEach(appointment -> {
            String patientName = "";
            if (appointment.getPatient() != null) {
                patientName = (appointment.getPatient().getFirstName() != null ? appointment.getPatient().getFirstName() : "")
                        + (appointment.getPatient().getLastName() != null ? " " + appointment.getPatient().getLastName() : "");
            }
            activities.add(new RecentActivityDTO(
                    appointment.getId().toString(),
                    "APPOINTMENT_CREATED",
                    "Consulta agendada com " + patientName.trim(),
                    appointment.getCreatedAt()
            ));
        });

        return activities;
    }
}
