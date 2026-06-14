package com.example.demo.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.DTO.Request.CreateUtilisateurRequest;
import com.example.demo.DTO.Response.PagedResponse;
import com.example.demo.DTO.Response.UtilisateurResponse;
import com.example.demo.Entity.Financier;
import com.example.demo.Entity.Formateur;
import com.example.demo.Entity.Formation;
import com.example.demo.Entity.Manager;
import com.example.demo.Entity.Planificateur;
import com.example.demo.Entity.Session;
import com.example.demo.Entity.Utilisateur;
import com.example.demo.Enumeration.RoleUtilisateur;
import com.example.demo.Mapper.UtilisateurMapper;
import com.example.demo.Repository.FinancierRepository;
import com.example.demo.Repository.FormateurRepository;
import com.example.demo.Repository.ManagerRepository;
import com.example.demo.Repository.PlanificateurRepository;
import com.example.demo.Repository.UtilisateurRepository;

import java.io.IOException; 
import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImp implements AdminService {
	
	private final UtilisateurRepository utilisateurRepository;
	private final PasswordEncoder passwordEncoder;
	private final EmailService emailService;
	private final UtilisateurMapper utilisateurMapper;
	private final FormateurRepository formateurRepository;
	private final PlanificateurRepository planificateurRepository;
	private final ManagerRepository managerRepository;
	private final FinancierRepository financierRepository;
	public AdminServiceImp(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder,ManagerRepository managerRepository,FormateurRepository formateurRepository,
			EmailService emailService, UtilisateurMapper utilisateurMapper,FinancierRepository financierRepository,PlanificateurRepository planificateurRepository) {
		super();
		this.utilisateurRepository = utilisateurRepository;
		this.formateurRepository = formateurRepository;
		this.financierRepository = financierRepository;
		this.managerRepository = managerRepository;
		this.planificateurRepository = planificateurRepository;
		this.passwordEncoder = passwordEncoder;
		this.emailService = emailService;
		this.utilisateurMapper = utilisateurMapper;
	}
	@Override
	public UtilisateurResponse creerUtilisateur(CreateUtilisateurRequest request) {
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "Email déjà utilisé"
            );
        }

        String mdpTemporaire = genererMotDePasse();
        System.out.println(">>> MDP TEMPORAIRE pour " + request.getEmail() + " : " + mdpTemporaire);
        String mdpHashe = passwordEncoder.encode(mdpTemporaire);

        Utilisateur utilisateur = switch (request.getRole()) {
            case FORMATEUR -> {
                Formateur f = utilisateurMapper.toFormateur(request);
                f.setDisponibilite(true);
                f.setNoteMoyenne(0.0);
                f.setHeuresEnseigneesTotal(0);
                f.setDateEntree(LocalDate.now());
                if (request.getCompetenceNoms() != null) {
                    f.setCompetencesList(request.getCompetenceNoms());
                }
                yield f;
            }
            case PLANIFICATEUR -> utilisateurMapper.toPlanificateur(request);
            case MANAGER      -> utilisateurMapper.toManager(request);
            case FINANCIER    -> utilisateurMapper.toFinancier(request);
            default -> throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Rôle non autorisé"
            );
        };

        utilisateur.setMotDePasse(mdpHashe);
        utilisateur.setActif(true);
        utilisateur.setDateCreation(LocalDateTime.now());

        utilisateurRepository.save(utilisateur);

        emailService.envoyerIdentifiants(
            request.getEmail(),
            request.getNom(),
            mdpTemporaire,
            request.getRole().toString()
        );

        if (utilisateur instanceof Formateur formateur) {
            return utilisateurMapper.toFormateurResponse(formateur);
        }
        return utilisateurMapper.toResponse(utilisateur);
    }
	@Override
    public List<UtilisateurResponse> getAllUtilisateurs() {
		return utilisateurRepository.findAll().stream()
		        .map(u -> u instanceof Formateur f 
		            ? utilisateurMapper.toFormateurResponse(f) 
		            : utilisateurMapper.toResponse(u))
		        .toList();
    }
	@Override
    public void toggleActif(Long id) {
        Utilisateur u = utilisateurRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Utilisateur non trouvé"
            ));
        u.setActif(!u.getActif());
        utilisateurRepository.save(u);
    }
	@Override
    public void supprimerUtilisateur(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Utilisateur non trouvé"
            );
        }
        utilisateurRepository.deleteById(id);
    }

    private String genererMotDePasse() {
        String chars = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
        StringBuilder mdp = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            mdp.append(chars.charAt(random.nextInt(chars.length())));
        }
        return mdp.toString();
    }
    
    @Override
    public PagedResponse<UtilisateurResponse> getByFilters(
            RoleUtilisateur role, String search, Boolean actif, int page, int limit) {

        Page<Utilisateur> result = utilisateurRepository
            .findByFilters(role, search, actif, PageRequest.of(page, limit));

        List<UtilisateurResponse> data = result.getContent()
        	    .stream()
        	    .map(u -> u instanceof Formateur f
        	        ? utilisateurMapper.toFormateurResponse(f)
        	        : utilisateurMapper.toResponse(u))
        	    .toList();

        return new PagedResponse<>(data, page, limit, result.getTotalElements());
    }
    @Override
    public UtilisateurResponse updateUtilisateur(Long id, CreateUtilisateurRequest request) {

        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        utilisateurMapper.updateEntity(utilisateur, request);
        
        if (utilisateur instanceof Formateur formateur 
                && request.getCompetenceNoms() != null) {
                formateur.setCompetencesList(request.getCompetenceNoms());
            }
        Utilisateur updated = utilisateurRepository.save(utilisateur);

        return utilisateurMapper.toResponse(updated);
    }
    public String sauvegarderCv(Long userId, MultipartFile file) {
        try {
            String fileName = userId + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/cv/" + fileName);
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            Utilisateur u = utilisateurRepository.findById(userId).orElseThrow();
            u.setCvPath(path.toString());
            utilisateurRepository.save(u);

            return path.toString();

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la sauvegarde du CV : " + e.getMessage(), e);
        }
    }
    @Override
    public UtilisateurResponse getUtilisateurById(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        return utilisateurMapper.toResponse(utilisateur); 
    }

}
