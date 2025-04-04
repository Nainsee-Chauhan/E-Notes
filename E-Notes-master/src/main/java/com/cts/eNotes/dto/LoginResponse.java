package com.cts.eNotes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginResponse {

	private UserDto user;
	
	private String token;
	
}
