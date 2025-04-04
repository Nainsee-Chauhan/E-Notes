package com.cts.eNotes.model;

import java.util.Date;

import org.springframework.data.annotation.*;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseModel {
	
	@CreatedBy
	@Column(updatable = false)
	private Integer createdBy;
	
	@CreatedDate
	@Column(updatable = false)
	private Date createdOn;
	
	@LastModifiedBy
	@Column(insertable = false)
	private Integer updatedBy;
	
	@LastModifiedDate
	@Column(insertable = false) 
	private Date updatedOn;
}
