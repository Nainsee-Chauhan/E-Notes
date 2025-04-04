package com.cts.eNotes.config.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cts.eNotes.model.User;


public class CustomUserDetails implements UserDetails{
	
	@Autowired
	private User user;
	
	
	public CustomUserDetails(User user) {
		super();
		this.user = user;

	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		List<SimpleGrantedAuthority> authority = new ArrayList<>();
		user.getRoles().forEach(r -> {
			authority.add(new SimpleGrantedAuthority("ROLE_"+r.getName()));
		});

		return authority;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}
	
}
