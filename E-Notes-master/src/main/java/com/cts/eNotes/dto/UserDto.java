package com.cts.eNotes.dto;

import java.util.List;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDto {
	
	private Integer id;


	private String name;

	private String email;

	private String mobNo;

	private String password;

	private List<RoleDto> roles;

	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	@Setter
	@Builder
	public static class RoleDto {
		private Integer id;
		private String name;
	}
	
}
