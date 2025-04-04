package com.cts.eNotes.util;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import com.cts.eNotes.dto.CategoryDto;
import com.cts.eNotes.dto.UserDto;
import com.cts.eNotes.exception.ExistDataException;
import com.cts.eNotes.exception.ValidationException;
import com.cts.eNotes.repository.RoleRepository;
import com.cts.eNotes.repository.UserRepository;

@Component
public class Validation {
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public void categoryValidation(CategoryDto categoryDto) {
		
		Map<String, Object>error = new LinkedHashMap<>();
		
		if(ObjectUtils.isEmpty(categoryDto)) {
			throw new IllegalArgumentException("category object shouldn't be null or empty");
		}else {
			//validation name field
			if(ObjectUtils.isEmpty(categoryDto.getName())) {
				error.put("name","Name field is empty or null");
			}else {
				if(categoryDto.getName().length()<3) {
					error.put("name", "Name length min 3");
				}
				if(categoryDto.getName().length()>20) {
					error.put("name", "Name length max 20");
				}
			}
			
			//validation for description
			if(ObjectUtils.isEmpty(categoryDto.getDescription())) {
				error.put("description","Description field is empty or null");
			}
			
//			//validation for isActive
//			if(ObjectUtils.isEmpty(categoryDto.getIsActive())) {
//				error.put("name","isActive field is empty or null");
//			}else {
//				if(categoryDto.getIsActive() != Boolean.TRUE.booleanValue() && categoryDto.getIsActive() != Boolean.FALSE.booleanValue()) {
//					error.put("isActive", "Invalid value in isActive field");
//				}
//			}
			
		}
		if(!error.isEmpty()) {
			throw new ValidationException(error);
		}
	}

	public void userValidation(UserDto userDto) {
		if (!StringUtils.hasText(userDto.getName())) {
			throw new IllegalArgumentException("Name is invalid");
		}

//		if (!StringUtils.hasText(userDto.getLastName())) {
//			throw new IllegalArgumentException("last name is invalid");
//		}

		if (!StringUtils.hasText(userDto.getEmail()) || !userDto.getEmail().matches(Constants.EMAIL_REGEX)) {
			throw new IllegalArgumentException("email is invalid");
		}else {
			//validate email exist or not
			Boolean existEmail = userRepo.existsByEmail(userDto.getEmail());
			if (existEmail) {
				throw new ExistDataException("Email already exist");
			}
		}

		if (!StringUtils.hasText(userDto.getMobNo()) || !userDto.getMobNo().matches(Constants.MOBNO_REGEX)) {
			throw new IllegalArgumentException("mobile no. is invalid");
		}

		if (CollectionUtils.isEmpty(userDto.getRoles())) {
			throw new IllegalArgumentException("role is invalid");
		} else {

			List<Integer> roleIds = roleRepo.findAll().stream().map(r -> r.getId()).toList();

			List<Integer> invalidReqRoleids = userDto.getRoles().stream().map(r -> r.getId())
					.filter(roleId -> !roleIds.contains(roleId)).toList();

			if (!CollectionUtils.isEmpty(invalidReqRoleids)) {
				throw new IllegalArgumentException("role is invalid" + invalidReqRoleids);
			}

		}
		
		
	}
}
