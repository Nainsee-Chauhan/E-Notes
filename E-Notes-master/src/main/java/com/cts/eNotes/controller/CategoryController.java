package com.cts.eNotes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.eNotes.dto.CategoryDto;
import com.cts.eNotes.dto.CategoryResponse;
//import com.cts.eNotes.exception.ResourceNotFoundException;
//import com.cts.eNotes.model.Category;
import com.cts.eNotes.service.CategoryService;
import com.cts.eNotes.util.CommonUtil;


@RestController
@RequestMapping("/api/v1/category")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/save")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?>saveCategory(@RequestBody CategoryDto categoryDto){
		
		boolean saveCategory = categoryService.saveCategory(categoryDto);
		if(saveCategory) {
			return CommonUtil.createBuildResponseMessage("saved successfully",HttpStatus.CREATED);
		}else {
			return CommonUtil.createErrorResponseMessage("Category Not saved",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	@GetMapping("/")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<?>getAllCategory(){
		List<CategoryDto> allCategory = categoryService.getAllCategory();
		
		if(CollectionUtils.isEmpty(allCategory)) {
			return ResponseEntity.noContent().build();
		}else {

			return CommonUtil.createBuildResponse(allCategory, HttpStatus.OK);
		}
		
	}
	
	
//	@GetMapping("/active")
////	@PreAuthorize("hasAnyRole('USER','ADMIN')")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<?>getActiveCategory(){
//		List<CategoryResponse> allCategory = categoryService.getActiveCategory();
//		
//		if(CollectionUtils.isEmpty(allCategory)) {
//			return ResponseEntity.noContent().build();
//		}else {
////			return new ResponseEntity<>(allCategory, HttpStatus.OK);
//			return CommonUtil.createBuildResponse(allCategory, HttpStatus.OK);
//		}
//		
//	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?>getCategoryDetailsById(@PathVariable Integer id)throws Exception{
		
			CategoryDto categoryDto = categoryService.getCategoryById(id);
			if(ObjectUtils.isEmpty(categoryDto)) {

				return CommonUtil.createErrorResponseMessage("Internal Server Error", HttpStatus.NOT_FOUND);
			}
			return CommonUtil.createBuildResponse(categoryDto, HttpStatus.OK);
		
	}
	
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?>deleteCategoryById(@PathVariable Integer id){
		
		boolean deleted= categoryService.deleteCategory(id);
		if(deleted) {
			return CommonUtil.createBuildResponse("Category deleted successfully", HttpStatus.OK);
		}
		return CommonUtil.createErrorResponseMessage("Category not deleted", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
