package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.Request.ChargeRequest;
import com.example.demo.DTO.Response.ChargeResponse;
import com.example.demo.Enumeration.StatutCharge;

public interface ChargeService {
	ChargeResponse create(ChargeRequest request);
	List<ChargeResponse> getAll();
	ChargeResponse getById(Long id);
	ChargeResponse update(Long id, ChargeRequest request);
	void delete(Long id);
	ChargeResponse updateStatut(Long id, StatutCharge statut);
	List<ChargeResponse> getBySession(Long sessionId);
	List<ChargeResponse> getGenerales();
}
