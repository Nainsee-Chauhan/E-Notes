package com.cts.eNotes.service.impl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.cts.eNotes.dto.CategoryDto;
import com.cts.eNotes.dto.CategoryResponse;
import com.cts.eNotes.exception.ExistDataException;
import com.cts.eNotes.exception.ResourceNotFoundException;
import com.cts.eNotes.model.Category;
import com.cts.eNotes.repository.CategoryRepository;
import com.cts.eNotes.service.CategoryService;
import com.cts.eNotes.util.Validation;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private Validation validation;
	
	@Override
	public boolean saveCategory(CategoryDto categoryDto) {
		
		//Validation Checking
		validation.categoryValidation(categoryDto);
		
		//check category exist or not
		boolean exist = categoryRepo.existsByName(categoryDto.getName().trim());
		if(exist) {
			//throw error
			throw new ExistDataException("Category already exist");
		}
		
		// Map CategoryDto to Category entity
		Category category = mapper.map(categoryDto, Category.class);
		
		if(ObjectUtils.isEmpty(category.getId())) {
			// If category ID is empty, set isDeleted to false
			category.setIsDeleted(false);
		}else {
			// Update the existing category if ID is not empty
			updateCategory(category);
		}
		Category saveCategory = categoryRepo.save(category);
		if(ObjectUtils.isEmpty(saveCategory)) {
			return false;
		}
		return true;
	}
	

	// Update category with existing information
	public void updateCategory(Category category) {
		
		Optional<Category> findById = categoryRepo.findById(category.getId());
		if(findById.isPresent()) {
			Category existCategory = findById.get();
			// Copy existing details to the new category
			category.setCreatedBy(existCategory.getCreatedBy());
			category.setCreatedOn(existCategory.getCreatedOn());
			category.setIsDeleted(existCategory.getIsDeleted());

		}
	}

	@Override
	public List<CategoryDto> getAllCategory() {
		// Find all categories that are not deleted
		List<Category>categories = categoryRepo.findByIsDeletedFalse();
		List<CategoryDto> categoryDtoList = categories.stream().map(cat -> mapper.map(cat, CategoryDto.class)).toList();
		return categoryDtoList;
	}
	
	@Override
	public List<CategoryResponse>getActiveCategory(){
		// Find all active categories that are not deleted
		List<Category>categories = categoryRepo.findByIsActiveTrueAndIsDeletedFalse();
		List<CategoryResponse> categoryList = categories.stream().map(cat -> mapper.map(cat, CategoryResponse.class)).toList();
		return categoryList;
	}
	
	
	@Override
	public CategoryDto getCategoryById(Integer id)throws Exception{
		Category category = categoryRepo.findByIdAndIsDeletedFalse(id).orElseThrow(() ->new ResourceNotFoundException("Category Not Found with id = "+id) );
		if(!ObjectUtils.isEmpty(category)) {
			return mapper.map(category, CategoryDto.class);
		}
		return null;
	}
	
	@Override
	public boolean deleteCategory(Integer id) {
		Optional<Category>findByCategory = categoryRepo.findById(id);
		if(findByCategory.isPresent()) {
			Category category= findByCategory.get();
			category.setIsDeleted(true);
			categoryRepo.save(category);
			return true;
		}
		return false;
	}
	
	
}
