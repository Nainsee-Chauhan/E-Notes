package com.cts.eNotes;

import com.cts.eNotes.dto.CategoryDto;
import com.cts.eNotes.exception.ExistDataException;
import com.cts.eNotes.model.Category;
import com.cts.eNotes.repository.CategoryRepository;
import com.cts.eNotes.service.impl.CategoryServiceImpl;
import com.cts.eNotes.util.Validation;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceImplTest {

	@Mock
	private CategoryRepository categoryRepository;

	@Mock
	private Validation validation;

	@Mock
	private ModelMapper modelMapper;

	@InjectMocks
	private CategoryServiceImpl categoryService;

	@Test
	public void testSaveCategory_Success() {
		CategoryDto categoryDto = new CategoryDto();
		categoryDto.setName("Category");
		Category category = new Category();
		category.setId(1);
		category.setName("Category");

		when(modelMapper.map(any(CategoryDto.class), any(Class.class))).thenReturn(category);
		when(categoryRepository.save(any(Category.class))).thenReturn(category);

		boolean result = categoryService.saveCategory(categoryDto);
		assertTrue(result);
	}

	@Test
	public void testSaveCategory_CategoryAlreadyExists() {
		CategoryDto categoryDto = new CategoryDto();
		categoryDto.setName("Existing Category");

		when(categoryRepository.existsByName(categoryDto.getName())).thenReturn(true);

		ExistDataException exception = assertThrows(ExistDataException.class, () -> {
			categoryService.saveCategory(categoryDto);
		});

		assertEquals("Category already exist", exception.getMessage());
	}


	// Test case for updateCategory method
	@Test
	public void testUpdateCategory_Success() {
		Category category = new Category();
		category.setId(1);
		category.setName("Updated Category");

		Category existingCategory = new Category();
		existingCategory.setId(1);
		existingCategory.setName("Existing Category");
		existingCategory.setCreatedBy(1);
		existingCategory.setCreatedOn(new Date());

		when(categoryRepository.findById(anyInt())).thenReturn(Optional.of(existingCategory));

		categoryService.updateCategory(category);

		// Assert
		assertEquals(1, category.getCreatedBy());
		assertEquals(existingCategory.getCreatedOn(), category.getCreatedOn());
	}

	// Test case for getAllCategory method
	@Test
	public void testGetAllCategory_Success() {
		// Arrange
		Category category = new Category();
		category.setId(1);
		category.setName("Category");

		CategoryDto categoryDto = new CategoryDto();
		categoryDto.setId(1);
		categoryDto.setName("Category");

		when(categoryRepository.findByIsDeletedFalse()).thenReturn(Collections.singletonList(category));
		when(modelMapper.map(any(Category.class), any(Class.class))).thenReturn(categoryDto);


		List<CategoryDto> categoryDtoList = categoryService.getAllCategory();

		assertNotNull(categoryDtoList);
		assertEquals(1, categoryDtoList.size());
		assertEquals("Category", categoryDtoList.get(0).getName());
	}

	
	@Test
	public void testDeleteCategory_Success() {
		int categoryId = 1;
		Category category = new Category();
		category.setId(categoryId);

		when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));

		boolean result = categoryService.deleteCategory(categoryId);

		assertTrue(result);
	}
	
	
	@Test
	public void testDeleteCategory_NotFound() {
		int categoryId = 1;

		when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

		boolean result = categoryService.deleteCategory(categoryId);

		assertFalse(result);
	}
	
	

}
