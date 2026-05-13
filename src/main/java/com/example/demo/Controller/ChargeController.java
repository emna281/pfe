package com.example.demo.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.Request.ChargeRequest;
import com.example.demo.DTO.Response.ChargeResponse;
import com.example.demo.Enumeration.StatutCharge;
import com.example.demo.Repository.SessionRepository;
import com.example.demo.Service.ChargeService;

@RestController
@RequestMapping("/api/financier/charges")
public class ChargeController {
	private final ChargeService chargeService;
	private final SessionRepository sessionRepository;

    public ChargeController(ChargeService chargeService,SessionRepository sessionRepository) {
		this.chargeService = chargeService;
		this.sessionRepository=sessionRepository;
	}

    @GetMapping
    public List<ChargeResponse> getAll() {
        return chargeService.getAll();
    }

    @PostMapping
    public ChargeResponse create(@RequestBody ChargeRequest request) {
        return chargeService.create(request);
    }

    @GetMapping("/{id}")
    public ChargeResponse getById(@PathVariable Long id) {
        return chargeService.getById(id);
    }

    @PutMapping("/{id}")
    public ChargeResponse update(@PathVariable Long id,
                                 @RequestBody ChargeRequest request) {
        return chargeService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        chargeService.delete(id);
    }
    
    @PatchMapping("/{id}/statut")
    public ChargeResponse updateStatut(@PathVariable Long id,
    		@RequestParam StatutCharge statut) {
        return chargeService.updateStatut(id, statut);
    }
    @GetMapping("/session/{sessionId}")
    public List<ChargeResponse> getBySession(@PathVariable Long sessionId) {
        return chargeService.getBySession(sessionId);
    }

    @GetMapping("/generales")
    public List<ChargeResponse> getGenerales() {
        return chargeService.getGenerales();
    }
}
