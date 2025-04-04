package com.cts.eNotes.service;

import com.cts.eNotes.dto.LoginRequest;
import com.cts.eNotes.dto.LoginResponse;
import com.cts.eNotes.dto.UserDto;

public interface AuthService {
	
	public Boolean register(UserDto userDto, String url)throws Exception;

	public LoginResponse login(LoginRequest loginRequest);

}
