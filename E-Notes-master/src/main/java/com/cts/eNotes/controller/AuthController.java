package com.cts.eNotes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import com.cts.eNotes.dto.LoginRequest;
import com.cts.eNotes.dto.LoginResponse;
import com.cts.eNotes.dto.UserDto;
import com.cts.eNotes.service.AuthService;
import com.cts.eNotes.util.CommonUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {


	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserDto userDto, HttpServletRequest request) throws Exception {
		log.info("AuthController : registerUser() : Exceution Start");
		String url = CommonUtil.getUrl(request);
		Boolean register = authService.register(userDto, url);
		if (register) {
			log.info("Error : {}","Register failed");
			return CommonUtil.createBuildResponseMessage("Register successfully", HttpStatus.CREATED);
		}
		return CommonUtil.createErrorResponseMessage("Registeration failed", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws Exception {

		LoginResponse loginResponse = authService.login(loginRequest);
		if (ObjectUtils.isEmpty(loginResponse)) {
			return CommonUtil.createErrorResponseMessage("invalid credential", HttpStatus.BAD_REQUEST);
		}
		return CommonUtil.createBuildResponse(loginResponse,HttpStatus.OK);
	}
	
	
}
