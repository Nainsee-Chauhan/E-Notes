package com.cts.eNotes.model;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Category extends BaseModel{
	
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY )
	private Integer  id;
	private String name;
	private String description;
	private Boolean isActive;
	private Boolean isDeleted;
	
}
