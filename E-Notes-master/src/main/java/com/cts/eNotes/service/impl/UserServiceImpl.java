package com.cts.eNotes.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.cts.eNotes.config.security.CustomUserDetails;
import com.cts.eNotes.dto.LoginRequest;
import com.cts.eNotes.dto.LoginResponse;
import com.cts.eNotes.dto.UserDto;
import com.cts.eNotes.model.Role;
import com.cts.eNotes.model.User;
import com.cts.eNotes.repository.RoleRepository;
import com.cts.eNotes.repository.UserRepository;
import com.cts.eNotes.service.JwtService;
import com.cts.eNotes.service.AuthService;
import com.cts.eNotes.util.Validation;

@Service
public class UserServiceImpl implements AuthService {
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private Validation validation;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;

	@Override
	public Boolean register(UserDto userDto,  String url) throws Exception{

		validation.userValidation(userDto);
		User user = mapper.map(userDto, User.class);

		setRole(userDto, user);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User saveUser = userRepo.save(user);
		if (!ObjectUtils.isEmpty(saveUser)) {
			
			return true;
		}
		return false;
	}

	private void setRole(UserDto userDto, User user) {
		List<Integer> reqRoleId = userDto.getRoles().stream().map(r -> r.getId()).toList();
		List<Role> roles = roleRepo.findAllById(reqRoleId);
		user.setRoles(roles);
	}

	@Override
	public LoginResponse login(LoginRequest loginRequest) {
		
		Authentication authenticate = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		if(authenticate.isAuthenticated())
		{
			//typecaste to customuserdetails
			CustomUserDetails customUserDetails = (CustomUserDetails)authenticate.getPrincipal();
			
			String token = jwtService.generateToken(customUserDetails.getUser());
			
			LoginResponse loginResponse=LoginResponse.builder()
					.user(mapper.map(customUserDetails.getUser(), UserDto.class))
					.token(token)
					.build();
			return loginResponse;
		}
		
		return null;
		
	}
	
	

}
