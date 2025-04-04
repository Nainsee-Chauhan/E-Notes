package com.cts.eNotes.dto;

import java.util.Date;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {
	
	private Integer  id;
	@NotBlank
	@Min(value = 3 )
	@Max(value = 20)
	private String name;
	@NotBlank
	@Min(value = 3 )
	@Max(value = 50)
	private String description;
	
//	private Boolean isActive;
	private Integer createdBy;
	private Date createdOn;
	private Integer updatedBy;
	private Date updatedOn;
}
