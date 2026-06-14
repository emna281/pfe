package com.example.demo.DTO.Request;

import jakarta.validation.constraints.NotNull;

public class InscriptionRequest {
	@NotNull(message = "L'ID de l'apprenant est requis")
    private Long apprenantId;

    @NotNull(message = "L'ID de la session est requis")
    private Long sessionId;

    public Long getApprenantId() { return apprenantId; }
    public void setApprenantId(Long apprenantId) { this.apprenantId = apprenantId; }

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }
}
