package com.cts.eNotes.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import com.cts.eNotes.config.security.CustomUserDetails;
import com.cts.eNotes.handler.GenericResponse;
import com.cts.eNotes.model.User;

import jakarta.servlet.http.HttpServletRequest;



public class CommonUtil {

	public static ResponseEntity<?> createBuildResponse(Object data, HttpStatus status) {

		GenericResponse response = GenericResponse.builder()
				.responseStatus(status)
				.status("success")
				.message("success")
				.data(data)
				.build();
		return response.create();
	}
	
	public static ResponseEntity<?> createBuildResponseMessage(String message, HttpStatus status) {

		GenericResponse response = GenericResponse.builder()
				.responseStatus(status)
				.status("success")
				.message(message)
				.build();
		return response.create();
	}
	
	public static ResponseEntity<?> createErrorResponse(Object data, HttpStatus status) {

		GenericResponse response = GenericResponse.builder()
				.responseStatus(status)
				.status("failed")
				.message("failed")
				.data(data)
				.build();
		return response.create();
	}
	
	public static ResponseEntity<?> createErrorResponseMessage(String message, HttpStatus status) {

		GenericResponse response = GenericResponse.builder()
				.responseStatus(status)
				.status("failed")
				.message(message)
				.build();
		return response.create();
	}
	
	public static String getUrl(HttpServletRequest request) {
		String apiUrl = request.getRequestURL().toString(); // http:localhost:8080/api/v1/auth
		apiUrl = apiUrl.replace(request.getServletPath(), ""); // http:localhost:8080
		return apiUrl;
	}

	public static User getLoggedInUser() {
		try {
			CustomUserDetails logUser = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			return logUser.getUser();
		} catch (Exception e) {
			throw e;
		}

	}

}
