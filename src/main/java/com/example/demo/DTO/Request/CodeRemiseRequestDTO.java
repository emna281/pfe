package com.example.demo.DTO.Request;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

public class CodeRemiseRequestDTO {
	@NotNull
    private Long apprenantId;

    @NotNull
    @DecimalMin("1") @DecimalMax("100")
    private BigDecimal pourcentage;

    @NotNull
    @Future
    private LocalDate dateExpiration;

  
    public Long getApprenantId() { return apprenantId; }
    public void setApprenantId(Long apprenantId) { this.apprenantId = apprenantId; }
    public BigDecimal getPourcentage() { return pourcentage; }
    public void setPourcentage(BigDecimal pourcentage) { this.pourcentage = pourcentage; }
    public LocalDate getDateExpiration() { return dateExpiration; }
    public void setDateExpiration(LocalDate dateExpiration) { this.dateExpiration = dateExpiration; }

}
