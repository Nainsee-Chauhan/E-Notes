package com.cts.eNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.eNotes.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Boolean existsByEmail(String email);

	User findByEmail(String email);

}
