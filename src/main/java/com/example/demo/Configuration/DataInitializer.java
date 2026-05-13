package com.example.demo.Configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.Repository.UtilisateurRepository;
import com.example.demo.Service.UtilisateurService;
@Component
public class DataInitializer implements CommandLineRunner{
	private UtilisateurService utilisateurService;
    private UtilisateurRepository utilisateurRepo;
	public DataInitializer(UtilisateurService utilisateurService, UtilisateurRepository utilisateurRepo) {
		super();
		this.utilisateurService = utilisateurService;
		this.utilisateurRepo = utilisateurRepo;
	}
	@Override
    public void run(String... args) {
        if (utilisateurRepo.findByEmail("admin@example.com").isEmpty()) {
            utilisateurService.creerAdmin(
                "admin@example.com",
                "Admin@1234",
                "Admin",
                "Super"
            );
            System.out.println("✅ Admin créé avec succès !");
        }
    }

}
