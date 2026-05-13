package com.example.demo.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImp implements EmailService{
	private final JavaMailSender mailSender;
	
	@Value("${spring.mail.username}")
    private String expediteur;

    public EmailServiceImp(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    @Override
    public void envoyerIdentifiants(String email, String nom, 
                                     String mdpTemporaire, String nomSession) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("firstcode@gmail.com");
            helper.setTo(email);
            helper.setSubject("🎓 Bienvenue chez FirstCode — Vos identifiants");

            String contenu = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                    <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
                        <h1 style="color: white;">FirstCode</h1>
                    </div>
                    <div style="padding: 30px; background-color: #f9f9f9;">
                        <h2>Bonjour %s,</h2>
                        <p>Votre demande d'inscription à la session 
                        <strong>%s</strong> a été <strong>acceptée</strong> !</p>
                        <p>Voici vos identifiants de connexion :</p>
                        <div style="background-color: #fff; padding: 20px; 
                                    border-left: 4px solid #1a73e8; margin: 20px 0;">
                            <p><strong>Email :</strong> %s</p>
                            <p><strong>Mot de passe temporaire :</strong> 
                            <strong style="color: #1a73e8;">%s</strong></p>
                        </div>
                        <p style="color: red;">⚠️ Vous devez changer votre mot de passe 
                        à la première connexion.</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="http://localhost:3000/login" 
                               style="background-color: #1a73e8; color: white; 
                                      padding: 12px 30px; text-decoration: none; 
                                      border-radius: 5px;">
                                Se connecter
                            </a>
                        </div>
                    </div>
                    <div style="padding: 15px; text-align: center; color: #999;">
                        <p>FirstCode — Centre de Formation Professionnelle</p>
                    </div>
                </div>
            """.formatted(nom, nomSession, email, mdpTemporaire);

            helper.setText(contenu, true); // true = HTML
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Erreur envoi email identifiants : " + e.getMessage());
        }
    }
    @Override
    public void envoyerRefus(String email, String nom, String nomSession) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("firstcode@gmail.com");
            helper.setTo(email);
            helper.setSubject("❌ Demande d'inscription — FirstCode");

            String contenu = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                    <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
                        <h1 style="color: white;">FirstCode</h1>
                    </div>
                    <div style="padding: 30px; background-color: #f9f9f9;">
                        <h2>Bonjour %s,</h2>
                        <p>Nous avons bien reçu votre demande d'inscription 
                        à la session <strong>%s</strong>.</p>
                        <p>Malheureusement, nous ne pouvons pas donner suite 
                        à votre demande pour le moment.</p>
                        <p>Nous vous invitons à consulter nos autres sessions disponibles :</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="http://localhost:3000/formations" 
                               style="background-color: #1a73e8; color: white; 
                                      padding: 12px 30px; text-decoration: none; 
                                      border-radius: 5px;">
                                Voir les formations
                            </a>
                        </div>
                    </div>
                    <div style="padding: 15px; text-align: center; color: #999;">
                        <p>FirstCode — Centre de Formation Professionnelle</p>
                    </div>
                </div>
            """.formatted(nom, nomSession);

            helper.setText(contenu, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Erreur envoi email refus : " + e.getMessage());
        }
    }
    @Override
    public void envoyerConfirmationChangementMdp(String email, String nom) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("firstcode@gmail.com");
            helper.setTo(email);
            helper.setSubject("✅ Mot de passe modifié — FirstCode");

            String contenu = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                    <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
                        <h1 style="color: white;">FirstCode</h1>
                    </div>
                    <div style="padding: 30px; background-color: #f9f9f9;">
                        <h2>Bonjour %s,</h2>
                        <p>Votre mot de passe a été <strong>modifié avec succès</strong>.</p>
                        <p>Vous pouvez maintenant accéder à votre espace personnel.</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="http://localhost:3000/login" 
                               style="background-color: #1a73e8; color: white; 
                                      padding: 12px 30px; text-decoration: none; 
                                      border-radius: 5px;">
                                Se connecter
                            </a>
                        </div>
                    </div>
                </div>
            """.formatted(nom);

            helper.setText(contenu, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Erreur envoi email confirmation : " + e.getMessage());
        }
    }
    @Override
    public void envoyerRelance(String email, String prenom, 
            String numeroFacture, BigDecimal montantRestant, 
            LocalDate dateEcheance) {
    	SimpleMailMessage message = new SimpleMailMessage();
    	message.setFrom(expediteur);
    	message.setTo(email);
    	message.setSubject("Rappel de paiement — Facture " + numeroFacture);
    	message.setText(
    			"Bonjour " + prenom + ",\n\n" +
    					"Nous vous rappelons que la facture " + numeroFacture +
    					" d'un montant de " + montantRestant + " € " +
    					"était due le " + dateEcheance + ".\n\n" +
    					"Merci de procéder au règlement dans les plus brefs délais.\n\n" +
    					"Cordialement,\nLe service financier"
    			);
    	mailSender.send(message);
    }
    @Override
    public void envoyerAlerte(String email, String prenom,
            String numeroFacture, BigDecimal montantRestant,
            LocalDate dateEcheance) {
    	SimpleMailMessage message = new SimpleMailMessage();
    	message.setFrom(expediteur);
    	message.setTo(email);
    	message.setSubject("⚠️ Alerte paiement — Facture " + numeroFacture);
    	message.setText(
    			"Bonjour " + prenom + ",\n\n" +
    					"URGENT : La facture " + numeroFacture +
    					" d'un montant de " + montantRestant + " € " +
    					"est en retard de paiement depuis le " + dateEcheance + ".\n\n" +
    					"Sans règlement sous 48h, votre dossier sera transmis au service de recouvrement.\n\n" +
    					"Cordialement,\nLe service financier"
    			);
    	mailSender.send(message);
    }
    @Override
    public void envoyerCodeRemise(String email, String prenom, String code,
                                   BigDecimal pourcentage, LocalDate dateExpiration) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Votre code remise - Centre de Formation");
        message.setText(
            "Bonjour " + prenom + ",\n\n" +
            "Vous avez reçu un code remise de " + pourcentage + "% :\n\n" +
            "    " + code + "\n\n" +
            "Ce code est valable jusqu'au " + dateExpiration + ".\n" +
            "Utilisez-le lors de votre prochain paiement.\n\n" +
            "Cordialement,\nLe Centre de Formation"
        );
        mailSender.send(message);
    }
}
