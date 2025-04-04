package com.cts.eNotes.service;

import java.util.List;

import com.cts.eNotes.dto.NotesDto;
import com.cts.eNotes.dto.NotesResponse;

public interface NotesService {

	public Boolean saveNotes(NotesDto notesDto)throws Exception;
		
	public List<NotesDto>getAllNotes();
	
	public NotesResponse getAllNotesByUser();

	public void softDeleteNotes(Integer id) throws Exception;

	public void restoreNotes(Integer id)throws Exception;

	public List<NotesDto> getUserRecycleBinNotes();
	
	public void hardDeleteNotes(Integer id) throws Exception;

	public void emptyRecycleBin();

	public Boolean copyNotes(Integer id)throws Exception;
}
