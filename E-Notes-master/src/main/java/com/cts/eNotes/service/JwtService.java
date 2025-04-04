package com.cts.eNotes.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.cts.eNotes.model.User;

public interface JwtService {

	public String generateToken(User user);
	
	public String getUsername(String token);
	
	public Boolean validateToken(String token, UserDetails userDetails);
	
}
