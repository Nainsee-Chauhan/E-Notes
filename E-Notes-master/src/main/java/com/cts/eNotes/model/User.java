package com.cts.eNotes.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	//private String firstName;

	private String name;

	private String email;

	private String mobNo;
	
	private String password;

	@OneToMany(cascade = CascadeType.ALL, fetch=FetchType.EAGER)
	private List<Role> roles;


}
