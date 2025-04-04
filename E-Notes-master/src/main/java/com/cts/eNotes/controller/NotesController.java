package com.cts.eNotes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.cts.eNotes.dto.NotesDto;
import com.cts.eNotes.dto.NotesResponse;
import com.cts.eNotes.service.NotesService;
import com.cts.eNotes.util.CommonUtil;
  
@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NotesController {
	
	@Autowired
	private NotesService notesService;
	
	@PostMapping("/save")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> saveNotes(@RequestBody NotesDto notesDto) throws Exception {
	    Boolean saveNotes = notesService.saveNotes(notesDto);
	    if (saveNotes) {
	        return CommonUtil.createBuildResponseMessage("Notes saved success", HttpStatus.CREATED);
	    }
	    return CommonUtil.createErrorResponseMessage("Notes not saved", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	
	@GetMapping("/")
	//@PreAuthorize("hasAnyRole('USER','ADMIN')")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?>getAllNotes(){
		List<NotesDto> notes = notesService.getAllNotes();
		if(CollectionUtils.isEmpty(notes)) {
			return ResponseEntity.noContent().build();
		}
		return CommonUtil.createBuildResponse(notes, HttpStatus.OK);
	}
	
	
	 @GetMapping("/user-notes")
	    @PreAuthorize("hasRole('USER')")
	    public ResponseEntity<?> getAllNotesByUser() {
	        NotesResponse notes = notesService.getAllNotesByUser();
	        return CommonUtil.createBuildResponse(notes, HttpStatus.OK);
	    }
	
	
	@GetMapping("/delete/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?>deleteNotes(@PathVariable Integer id)throws Exception{
		notesService.softDeleteNotes(id);
		return CommonUtil.createBuildResponseMessage("Delete Success", HttpStatus.OK);
	}
	
	@GetMapping("/restore/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?>restoreNotes(@PathVariable Integer id)throws Exception{
		notesService.restoreNotes(id);
		return CommonUtil.createBuildResponseMessage("Notes Restore Success", HttpStatus.OK);
	}
	
	@GetMapping("/recycle-bin")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getUserRecycleBinNotes() throws Exception {
		List<NotesDto> notes = notesService.getUserRecycleBinNotes();
		if (CollectionUtils.isEmpty(notes)) {
			return CommonUtil.createBuildResponseMessage("Notes not avaible in Recycle Bin", HttpStatus.OK);
		}
		return CommonUtil.createBuildResponse(notes, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> hardDeleteNotes(@PathVariable Integer id) throws Exception {
		notesService.hardDeleteNotes(id);
		return CommonUtil.createBuildResponseMessage("Delete Success", HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> emptyUserRecyleBin() throws Exception {
		notesService.emptyRecycleBin();
		return CommonUtil.createBuildResponseMessage("Delete Success", HttpStatus.OK);
	}
	
	@GetMapping("/copy/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> copyNotes(@PathVariable Integer id)throws Exception{
		Boolean copyNotes = notesService.copyNotes(id);
		if(copyNotes) {
			return CommonUtil.createBuildResponseMessage("Copied Success", HttpStatus.CREATED);
		}
	 return CommonUtil.createErrorResponseMessage("Copy failes! Try Again", HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
}
