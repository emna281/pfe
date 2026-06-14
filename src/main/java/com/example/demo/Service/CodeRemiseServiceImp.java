package com.example.demo.Service;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.Request.CodeRemiseRequestDTO;
import com.example.demo.DTO.Response.CodeRemiseResponseDTO;
import com.example.demo.Entity.Apprenant;
import com.example.demo.Entity.CodeRemise;
import com.example.demo.Entity.Facture;
import com.example.demo.Mapper.CodeRemiseMapper;
import com.example.demo.Repository.ApprenantRepository;
import com.example.demo.Repository.CodeRemiseRepository;
import com.example.demo.Repository.FactureRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class CodeRemiseServiceImp implements CodeRemiseService {
	private final CodeRemiseRepository codeRemiseRepository;
    private final ApprenantRepository apprenantRepository;
    private final FactureRepository factureRepository;
    private final CodeRemiseMapper codeRemiseMapper;
    private final EmailService emailService;
    
	public CodeRemiseServiceImp(CodeRemiseRepository codeRemiseRepository, ApprenantRepository apprenantRepository,
			FactureRepository factureRepository, CodeRemiseMapper codeRemiseMapper,EmailService emailService) {
		super();
		this.codeRemiseRepository = codeRemiseRepository;
		this.apprenantRepository = apprenantRepository;
		this.factureRepository = factureRepository;
		this.codeRemiseMapper = codeRemiseMapper;
		this.emailService=emailService;
	}
    
	@Override
	public CodeRemiseResponseDTO creerCode(CodeRemiseRequestDTO request) {

        Apprenant apprenant = apprenantRepository.findById(request.getApprenantId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Apprenant non trouvé"));

        boolean dejaUnCode = codeRemiseRepository
            .existsByApprenantIdAndActifTrueAndUtiliseFalse(apprenant.getId());

        if (dejaUnCode) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Cet apprenant possède déjà un code remise actif non utilisé");
        }

        CodeRemise codeRemise = new CodeRemise();
        codeRemise.setCode(genererCode());
        codeRemise.setPourcentage(request.getPourcentage());
        codeRemise.setDateExpiration(request.getDateExpiration());
        codeRemise.setApprenant(apprenant);

        CodeRemise saved = codeRemiseRepository.save(codeRemise);
        
        emailService.envoyerCodeRemise(
                apprenant.getEmail(),
                apprenant.getPrenom(),
                saved.getCode(),
                saved.getPourcentage(),
                saved.getDateExpiration()
            );

        return codeRemiseMapper.toResponse(saved);
    }
	@Override
	public CodeRemiseResponseDTO appliquerCode(Long factureId, String code) {

        Facture facture = factureRepository.findById(factureId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Facture non trouvée"));

        if (facture.getRemise() != null && 
            facture.getRemise().compareTo(BigDecimal.ZERO) > 0) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "Une remise est déjà appliquée sur cette facture");
        }

        CodeRemise codeRemise = codeRemiseRepository.findByCode(code)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Code remise invalide"));

        if (!codeRemise.isActif()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Ce code remise est désactivé");
        }
        if (codeRemise.isUtilise()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Ce code remise a déjà été utilisé");
        }
        if (codeRemise.getDateExpiration().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Ce code remise est expiré");
        }

        Long apprenantFacture = facture.getInscription().getApprenant().getId();
        Long apprenantCode = codeRemise.getApprenant().getId();

        if (!apprenantFacture.equals(apprenantCode)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Ce code ne vous appartient pas");
        }

        BigDecimal montantBase = facture.getInscription().getSession().getPrix();
        BigDecimal remise = codeRemise.getPourcentage();
        BigDecimal montantHT = montantBase.subtract(
            montantBase.multiply(remise).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP)
        );
        BigDecimal tva = montantHT.multiply(new BigDecimal("0.20")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal montantTTC = montantHT.add(tva).setScale(2, RoundingMode.HALF_UP);

        facture.setRemise(remise);
        facture.setMontantHT(montantHT.setScale(2, RoundingMode.HALF_UP));
        facture.setMontantTVA(tva);
        facture.setMontantTTC(montantTTC);
        factureRepository.save(facture);

        codeRemise.setUtilise(true);
        codeRemise.setActif(false);
        codeRemiseRepository.save(codeRemise);

        return codeRemiseMapper.toResponse(codeRemise);
    }

	@Override
    public List<CodeRemiseResponseDTO> getAllCodes() {
        return codeRemiseMapper.toListDTO(codeRemiseRepository.findAll());
    }

    @Override
    public List<CodeRemiseResponseDTO> getCodesByApprenant(Long apprenantId) {
        return codeRemiseMapper.toListDTO(codeRemiseRepository.findByApprenantId(apprenantId));
           
    }

    @Override
    public void desactiverCode(Long id) {
        CodeRemise code = codeRemiseRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Code remise non trouvé"));
        code.setActif(false);
        codeRemiseRepository.save(code);
    }

    
    private String genererCode() {
        String uid = UUID.randomUUID().toString()
            .replace("-", "").substring(0, 6).toUpperCase();
        return "REMISE-" + LocalDate.now().getYear() + "-" + uid;
    }
    @Override
    public CodeRemiseResponseDTO validerCode(String code, Long apprenantId) {

        CodeRemise codeRemise = codeRemiseRepository.findByCode(code)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Code remise invalide"));

        if (!codeRemise.isActif())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Code désactivé");

        if (codeRemise.isUtilise())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Code déjà utilisé");

        if (codeRemise.getDateExpiration().isBefore(LocalDate.now()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Code expiré");

        if (!codeRemise.getApprenant().getId().equals(apprenantId))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Code non autorisé");

        return codeRemiseMapper.toResponse(codeRemise);
    }

}
