package com.cts.eNotes.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;


import com.cts.eNotes.dto.NotesDto;
import com.cts.eNotes.dto.NotesDto.CategoryDto;
import com.cts.eNotes.dto.NotesResponse;
import com.cts.eNotes.exception.ResourceNotFoundException;
import com.cts.eNotes.model.Notes;
import com.cts.eNotes.repository.CategoryRepository;
import com.cts.eNotes.repository.NotesRepository;
import com.cts.eNotes.service.NotesService;
import com.cts.eNotes.util.CommonUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class NotesServiceImpl implements NotesService{
	
	@Autowired
	private NotesRepository notesRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private CategoryRepository categoryRepo;

	@Override
	public Boolean saveNotes(@RequestBody NotesDto notesDto) throws Exception {
	    // Initialize ObjectMapper - you can remove this if it's not used elsewhere
	    // ObjectMapper ob = new ObjectMapper();
	    // NotesDto notesDto = ob.readValue(notes, NotesDto.class);

	    // Set deletion properties
	    notesDto.setIsDeleted(false);
	    notesDto.setDeletedOn(null);

	    // Update notes if ID is given in request
	    if (!ObjectUtils.isEmpty(notesDto.getId())) {
	        updateNotes(notesDto);
	    }

	    // Category validation
	    checkCategoryExist(notesDto.getCategory());

	    // Map DTO to Notes entity
	    Notes notesMap = mapper.map(notesDto, Notes.class);
	    Notes saveNotes = notesRepo.save(notesMap);

	    // Return success status
	    return !ObjectUtils.isEmpty(saveNotes);
	}

	
	
//	private void updateNotes(NotesDto notesDto)throws Exception {
//		Notes existNotes = notesRepo.findById(notesDto.getId()).orElseThrow(()->new ResourceNotFoundException("Invalid notes id"));
//		
//	}
	
	private void updateNotes(NotesDto notesDto) throws Exception {
	    Notes existNotes = notesRepo.findById(notesDto.getId())
	        .orElseThrow(() -> new ResourceNotFoundException("Invalid notes id"));

	    // Update the existing note with new data
	    existNotes.setTitle(notesDto.getTitle());
	    existNotes.setDescription(notesDto.getDescription());
	    existNotes.setIsDeleted(notesDto.getIsDeleted());

	    // Save the updated note
	    notesRepo.save(existNotes);
	}


	private void checkCategoryExist(CategoryDto category) throws Exception {
		categoryRepo.findById(category.getId()).orElseThrow(() -> new ResourceNotFoundException("category id invalid"));
	}

	@Override
	public List<NotesDto>getAllNotes(){
		return notesRepo.findAll().stream().map(note->mapper.map(note, NotesDto.class)).toList();
	}
	
	@Override
	public NotesResponse getAllNotesByUser() {
	    Integer userId = CommonUtil.getLoggedInUser().getId();
	    List<Notes> notesList = notesRepo.findByCreatedByAndIsDeletedFalse(userId);

	    List<NotesDto> notesDto = notesList.stream().map(n -> mapper.map(n, NotesDto.class)).toList();

	    return NotesResponse.builder().notes(notesDto).build();
	}


	
	@Override
	public void softDeleteNotes(Integer id) throws Exception{
		Notes notes = notesRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Notes id invalid! Not Found"));
		notes.setIsDeleted(true);
		notes.setDeletedOn(LocalDateTime.now());
		notesRepo.save(notes);
	}
	
	@Override
	public void restoreNotes(Integer id)throws Exception {
		Notes notes = notesRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Notes id invalid! Not Found"));
		notes.setIsDeleted(false);
		notes.setDeletedOn(null);
		notesRepo.save(notes);
	}
	
	@Override
	public List<NotesDto> getUserRecycleBinNotes() {
		Integer userId = CommonUtil.getLoggedInUser().getId();
		List<Notes> recycleNotes = notesRepo.findByCreatedByAndIsDeletedTrue(userId);
		List<NotesDto> notesDtoList = recycleNotes.stream().map(note -> mapper.map(note, NotesDto.class)).toList();
		return notesDtoList;
	}
	
	@Override
	public void hardDeleteNotes(Integer id) throws Exception {
		Notes notes = notesRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Notes not found"));
		if (notes.getIsDeleted()) {
			notesRepo.delete(notes);
		} else {
			throw new IllegalArgumentException("Sorry You can't hard delete Directly");
		}
	}

	@Override
	public void emptyRecycleBin() {
		Integer userId = CommonUtil.getLoggedInUser().getId();
		List<Notes> recycleNotes = notesRepo.findByCreatedByAndIsDeletedTrue(userId);
		if (!CollectionUtils.isEmpty(recycleNotes)) {
			notesRepo.deleteAll(recycleNotes);
		}
	}


	@Override
	public Boolean copyNotes(Integer id) throws Exception{
		Notes notes = notesRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Notes id invalid! Not Found"));
		Notes copyNote = Notes.builder()
			.title(notes.getTitle())
				.description(notes.getDescription())
				.category(notes.getCategory())
				.isDeleted(false)
				.build();
		Notes saveCopyNotes = notesRepo.save(copyNote);
		if(!ObjectUtils.isEmpty(saveCopyNotes)) {
			return true;
		}
		return false;
	}
	
}
