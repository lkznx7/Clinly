package com.clinly.dashboard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record RecentActivityDTO(
        String id,
        String type,
        String description,
        LocalDateTime timestamp
) {}
