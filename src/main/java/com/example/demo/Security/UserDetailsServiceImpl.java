package com.example.demo.Security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Utilisateur;
import com.example.demo.Repository.UtilisateurRepository;
@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
    private UtilisateurRepository utilisateurRepository;
    

    public UserDetailsServiceImpl(UtilisateurRepository utilisateurRepository) {
		super();
		this.utilisateurRepository = utilisateurRepository;
	}


	@Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(
                "Utilisateur non trouvé : " + email
            ));


        if (!Boolean.TRUE.equals(utilisateur.getActif())) {
            throw new UsernameNotFoundException("Compte désactivé : " + email);
        }

        return new org.springframework.security.core.userdetails.User(
            utilisateur.getEmail(),
            utilisateur.getMotDePasse(),
            List.of(new SimpleGrantedAuthority("ROLE_" + utilisateur.getRole().name()))
        );
    }

}
