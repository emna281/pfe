package com.example.demo.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface EmailService {
	void envoyerIdentifiants(String email, String nom, String mdpTemporaire, String nomSession);
    void envoyerRefus(String email, String nom, String nomSession);
    void envoyerConfirmationChangementMdp(String email, String nom);
    void envoyerAlerte(String email, String prenom,String numeroFacture, BigDecimal montantRestant,LocalDate dateEcheance);
    void envoyerRelance(String email, String prenom, String numeroFacture, BigDecimal montantRestant, LocalDate dateEcheance);
    void envoyerCodeRemise(String email, String prenom, String code,BigDecimal pourcentage, LocalDate dateExpiration);
}
