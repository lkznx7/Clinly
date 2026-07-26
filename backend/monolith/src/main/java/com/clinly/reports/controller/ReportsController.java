package com.clinly.reports.controller;

import com.clinly.reports.dto.ReportChartDataDTO;
import com.clinly.reports.dto.ReportSummaryDTO;
import com.clinly.reports.service.ReportsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/reports")
@Tag(name = "Relatórios", description = "Endpoints de relatórios")
public class ReportsController {

    private final ReportsService reportsService;

    public ReportsController(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @GetMapping("/summary")
    @Operation(summary = "KPIs consolidados")
    public ResponseEntity<ReportSummaryDTO> getSummary(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(reportsService.getSummary(startDate, endDate));
    }

    @GetMapping("/charts")
    @Operation(summary = "Dados dos gráficos de relatórios")
    public ResponseEntity<ReportChartDataDTO> getCharts(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(reportsService.getCharts(startDate, endDate));
    }
}
