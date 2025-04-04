package com.cts.eNotes.service;

import java.util.List;

import com.cts.eNotes.dto.CategoryDto;
import com.cts.eNotes.dto.CategoryResponse;


public interface CategoryService {
		
	public boolean saveCategory(CategoryDto categoryDto);
	
	public List<CategoryDto>getAllCategory();
	
	public List<CategoryResponse>getActiveCategory();

	public CategoryDto getCategoryById(Integer id)throws Exception;

	public boolean deleteCategory(Integer Id);

}
