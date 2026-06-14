package com.example.demo.DTO.Response;

import java.util.List;



public class FormationAdminDTO {
	private Long id;
	private String code; 
	private String titre;
    private String description;
    private Integer dureeJours;
    private Integer dureeHeures;
    private Double prixPublic;
    private String publicCible;
    private String prerequis;
    private String programme;
    private String version ;
    private Boolean actif=true ;
    private List<String> codesSessions;
    private List<CompetenceInfoDTO> competenceDetail ;
    
    
    public FormationAdminDTO() {}


	public FormationAdminDTO(Long id, String code, String titre, String description, Integer dureeJours,
			Integer dureeHeures, Double prixPublic, String publicCible, String prerequis, String programme,
			String version, Boolean actif,/*StatistiqueDTO statistique */ List<String> codesSessions,
			List<CompetenceInfoDTO> competenceDetail) {
		super();
		this.id = id;
		this.code = code;
		this.titre = titre;
		this.description = description;
		this.dureeJours = dureeJours;
		this.dureeHeures = dureeHeures;
		this.prixPublic = prixPublic;
		this.publicCible = publicCible;
		this.prerequis = prerequis;
		this.programme = programme;
		this.version = version;
		this.actif = actif;
		//this.statistique = statistique;
		this.codesSessions = codesSessions;
		this.competenceDetail = competenceDetail;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public String getTitre() {
		return titre;
	}


	public void setTitre(String titre) {
		this.titre = titre;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Integer getDureeJours() {
		return dureeJours;
	}


	public void setDureeJours(Integer dureeJours) {
		this.dureeJours = dureeJours;
	}


	public Integer getDureeHeures() {
		return dureeHeures;
	}


	public void setDureeHeures(Integer dureeHeures) {
		this.dureeHeures = dureeHeures;
	}


	public Double getPrixPublic() {
		return prixPublic;
	}


	public void setPrixPublic(Double prixPublic) {
		this.prixPublic = prixPublic;
	}


	public String getPublicCible() {
		return publicCible;
	}


	public void setPublicCible(String publicCible) {
		this.publicCible = publicCible;
	}


	public String getPrerequis() {
		return prerequis;
	}


	public void setPrerequis(String prerequis) {
		this.prerequis = prerequis;
	}


	public String getProgramme() {
		return programme;
	}


	public void setProgramme(String programme) {
		this.programme = programme;
	}


	public String getVersion() {
		return version;
	}


	public void setVersion(String version) {
		this.version = version;
	}


	public Boolean getActif() {
		return actif;
	}


	public void setActif(Boolean actif) {
		this.actif = actif;
	}

/*
	public StatistiqueDTO getStatistique() {
		return statistique;
	}


	public void setStatistique(StatistiqueDTO statistique) {
		this.statistique = statistique;
	}

*/



	public List<CompetenceInfoDTO> getCompetenceDetail() {
		return competenceDetail;
	}


	public List<String> getCodesSessions() {
		return codesSessions;
	}


	public void setCodesSessions(List<String> codesSessions) {
		this.codesSessions = codesSessions;
	}


	public void setCompetenceDetail(List<CompetenceInfoDTO> competenceDetail) {
		this.competenceDetail = competenceDetail;
	}
    
  

    

}
