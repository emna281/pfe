package com.example.demo.DTO.Response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CodeRemiseResponseDTO {
	private Long id;
    private String code;
    private BigDecimal pourcentage;
    private LocalDate dateExpiration;
    private boolean actif;
    private boolean utilise;
    private Long apprenantId;
    private String apprenantNom;
    private String apprenantPrenom;
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public BigDecimal getPourcentage() { return pourcentage; }
    public void setPourcentage(BigDecimal pourcentage) { this.pourcentage = pourcentage; }
    public LocalDate getDateExpiration() { return dateExpiration; }
    public void setDateExpiration(LocalDate dateExpiration) { this.dateExpiration = dateExpiration; }
    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }
    public boolean isUtilise() { return utilise; }
    public void setUtilise(boolean utilise) { this.utilise = utilise; }
    public Long getApprenantId() { return apprenantId; }
    public void setApprenantId(Long apprenantId) { this.apprenantId = apprenantId; }
    public String getApprenantNom() { return apprenantNom; }
    public void setApprenantNom(String apprenantNom) { this.apprenantNom = apprenantNom; }
    public String getApprenantPrenom() { return apprenantPrenom; }
    public void setApprenantPrenom(String apprenantPrenom) { this.apprenantPrenom = apprenantPrenom; }

}
