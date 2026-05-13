package com.example.demo.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.Request.ChargeRequest;
import com.example.demo.DTO.Response.ChargeResponse;
import com.example.demo.Entity.Charge;
import com.example.demo.Entity.Session;
import com.example.demo.Enumeration.StatutCharge;
import com.example.demo.Mapper.ChargeMapper;
import com.example.demo.Repository.ChargeRepository;
import com.example.demo.Repository.SessionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ChargeServiceImp implements ChargeService{
	
	private final ChargeMapper chargeMapper;
	private final SessionRepository sessionRepository;
	private final ChargeRepository chargeRepository;
	
	
	public ChargeServiceImp(ChargeMapper chargeMapper, SessionRepository sessionRepository,
			ChargeRepository chargeRepository) {
		super();
		this.chargeMapper = chargeMapper;
		this.sessionRepository = sessionRepository;
		this.chargeRepository = chargeRepository;
	}


	@Override
	public ChargeResponse create(ChargeRequest request) {

	    Charge charge = chargeMapper.toEntity(request);
	    
	    charge.setNumeroCharge(genererNumeroCharge());

	    if (request.getSessionId() != null) {
	        Session session = sessionRepository.findById(request.getSessionId())
	                .orElseThrow(() -> new RuntimeException("Session not found"));

	        charge.setSession(session);
	    } else {
	        charge.setSession(null); 
	    }
	    charge = chargeRepository.save(charge);
	    return chargeMapper.toResponse(charge);
	}
	private String genererNumeroCharge() {
	    String annee = String.valueOf(LocalDate.now().getYear());
	    String randomPart = String.format("%03d", (int)(Math.random() * 1000));
	    return "CHG-" + annee + "-" + randomPart;
	}

	@Override
	public List<ChargeResponse> getAll() {
        return chargeMapper.toListDTO(chargeRepository.findAll());
    }
	@Override
    public ChargeResponse getById(Long id) {
        Charge charge = chargeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Charge not found"));

        return chargeMapper.toResponse(charge);
    }
	@Override
	public List<ChargeResponse> getBySession(Long sessionId) {
		List<Charge> charges= chargeRepository.findBySessionId(sessionId);
				
		return chargeMapper.toListDTO(charges);
	}
	@Override
	public List<ChargeResponse> getGenerales() {
		List<Charge> charges= chargeRepository.findBySessionIsNull();
				
		return chargeMapper.toListDTO(charges);
	}
	@Override
	public ChargeResponse update(Long id, ChargeRequest request) {

        Charge charge = chargeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Charge not found"));

        charge.setNumeroCharge(request.getNumeroCharge());
        charge.setType(request.getType());
        charge.setDescription(request.getDescription());
        charge.setDateCharge(request.getDateCharge());
        charge.setPeriode(request.getPeriode());
        charge.setMontant(request.getMontant());
      
        charge.setJustificatifPath(request.getJustificatifPath());
        
        if (request.getSessionId() != null) {
            Session session = sessionRepository.findById(request.getSessionId())
                    .orElseThrow(() -> new RuntimeException("Session not found"));

            charge.setSession(session);
        } else {
            charge.setSession(null);
        }

        charge = chargeRepository.save(charge);

        return chargeMapper.toResponse(charge);
    }
	@Override
	public void delete(Long id) {
        chargeRepository.deleteById(id);
    }

    @Override
    public ChargeResponse updateStatut(Long id, StatutCharge statut) {

        Charge charge = chargeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Charge not found"));


        charge.setStatut(statut);

        return chargeMapper.toResponse(chargeRepository.save(charge));
    }

}
