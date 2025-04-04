package com.cts.eNotes.service.impl;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.cts.eNotes.exception.JwtTokenExpiredException;
import com.cts.eNotes.model.User;
import com.cts.eNotes.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtServiceImpl implements JwtService{
	
	private String secretKey="";
	
	//generates a secret key using the HmacSHA256 algorithm and encodes it in Base64
	public JwtServiceImpl() {
		try {
			KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
			SecretKey sk = keyGen.generateKey();
			secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public String generateToken(User user) {
		
		Map<String, Object>claims = new HashMap<>();
		claims.put("role", user.getRoles());
		claims.put("id", user.getId());
		claims.put("name", user.getName());
		
		String token = Jwts.builder()
		.claims().add(claims)
		.subject(user.getEmail())
		.issuedAt(new Date(System.currentTimeMillis()))
		//token expires in 1 hr
		.expiration(new Date(System.currentTimeMillis()+60*60*1000)).and()
		.signWith(getKey())	
		.compact();
		
		return token;
	}

	//secret key for encription and decription of token
	//decodes the Base64-encoded secret key and returns it as a Key object.
	private Key getKey() {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	@Override
	public String getUsername(String token) {
		
		Claims claims = getAllClaims(token);
		return claims.getSubject();
	}
	
	
	public String role(String token)
	{
		Claims claims = getAllClaims(token);
		String role=(String)claims.get("role");
		return role;
	}
	

	private Claims getAllClaims(String token) {
		try {
			return Jwts.parser()
					.verifyWith(decryptKey(secretKey))
					.build().parseSignedClaims(token)
					.getPayload();
		}catch (ExpiredJwtException e) {
			throw new JwtTokenExpiredException("Token is Expired");
		}catch (JwtException e) {
			throw new JwtTokenExpiredException("Invalid Jwt token");
		}catch(Exception e) {
			throw e;
		}
	}
	
	private SecretKey decryptKey(String secretKey) {
		
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	
	@Override
	public Boolean validateToken(String token, UserDetails userDetails) {
		
		String username = getUsername(token);
		Boolean isExpired=isTokenExpired(token);
		if(username.equalsIgnoreCase(userDetails.getUsername()) && !isExpired)
		{
			return true;
		}
		return false;
	}
	
	
	private Boolean isTokenExpired(String token) {
		
		Claims claims = getAllClaims(token);
		Date expiredDate = claims.getExpiration();
		return expiredDate.before(new Date());
	}
	
	
}
