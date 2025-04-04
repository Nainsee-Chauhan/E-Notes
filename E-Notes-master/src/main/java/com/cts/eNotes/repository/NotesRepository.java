package com.cts.eNotes.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.eNotes.model.Notes;

public interface NotesRepository extends JpaRepository<Notes,Integer>{

	List<Notes> findByCreatedByAndIsDeletedTrue(Integer userId);
	List<Notes> findAllByIsDeletedAndDeletedOnBefore(boolean b, LocalDateTime cutOffDate);
	List<Notes> findByCreatedByAndIsDeletedFalse(Integer userId);
}
