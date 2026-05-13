package com.example.demo.DTO.Response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CodeRemiseInfoDTO {
	private String code;
    private BigDecimal pourcentage;
    private LocalDate dateExpiration;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public BigDecimal getPourcentage() {
		return pourcentage;
	}
	public void setPourcentage(BigDecimal pourcentage) {
		this.pourcentage = pourcentage;
	}
	public LocalDate getDateExpiration() {
		return dateExpiration;
	}
	public void setDateExpiration(LocalDate dateExpiration) {
		this.dateExpiration = dateExpiration;
	}
    
}
