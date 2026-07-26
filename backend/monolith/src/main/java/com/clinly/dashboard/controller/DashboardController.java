package com.clinly.dashboard.controller;

import com.clinly.dashboard.dto.DashboardChartDataDTO;
import com.clinly.dashboard.dto.DashboardSummaryDTO;
import com.clinly.dashboard.dto.RecentActivityDTO;
import com.clinly.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@Tag(name = "Dashboard", description = "Endpoints do dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    @Operation(summary = "KPIs do dashboard")
    public ResponseEntity<DashboardSummaryDTO> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @GetMapping("/charts")
    @Operation(summary = "Dados dos gráficos")
    public ResponseEntity<DashboardChartDataDTO> getCharts() {
        return ResponseEntity.ok(dashboardService.getCharts());
    }

    @GetMapping("/activities")
    @Operation(summary = "Atividades recentes")
    public ResponseEntity<List<RecentActivityDTO>> getActivities() {
        return ResponseEntity.ok(dashboardService.getActivities());
    }
}
