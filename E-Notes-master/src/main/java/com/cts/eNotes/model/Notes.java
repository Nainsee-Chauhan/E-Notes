package com.cts.eNotes.model;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Notes extends BaseModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String title;
	
	private String description;
	
	@ManyToOne
	private Category category;
	
	private Boolean isDeleted;
	
	private LocalDateTime deletedOn;

}
