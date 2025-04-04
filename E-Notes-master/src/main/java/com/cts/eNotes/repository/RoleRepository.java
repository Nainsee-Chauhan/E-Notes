package com.cts.eNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.eNotes.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	
}
