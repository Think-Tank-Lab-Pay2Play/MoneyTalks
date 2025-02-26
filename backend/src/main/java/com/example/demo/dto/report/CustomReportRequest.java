package com.example.demo.dto.report;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomReportRequest(


        @NotBlank
        @Schema(description = "The description of the report")
        @Size(min = 1, max = 500)
        String description
) {
    public CustomReportRequest(String description) {
        this.description = description;
    }
}
