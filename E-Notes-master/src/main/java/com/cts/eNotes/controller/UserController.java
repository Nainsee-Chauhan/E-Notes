package com.cts.eNotes.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.eNotes.dto.UserResponse;
import com.cts.eNotes.model.User;
import com.cts.eNotes.service.AuthService;
import com.cts.eNotes.util.CommonUtil;


@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private AuthService userService;

	@GetMapping("/profile")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<?> getProfile() {
		User loggedInUser = CommonUtil.getLoggedInUser();
		UserResponse userResponse = mapper.map(loggedInUser, UserResponse.class);
		return CommonUtil.createBuildResponse(userResponse, HttpStatus.OK);
	}
	
}
