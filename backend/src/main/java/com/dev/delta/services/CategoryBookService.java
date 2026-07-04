package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Category;
import com.dev.delta.repositories.CategoryBookRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * CategoryBookService
 * 
 * @author Admin
 *
 */
@Service
public class CategoryBookService {

	/**
	 * CategoryBookRepository
	 */
	@Autowired
	CategoryBookRepository categoryRepository;

	public long count() {

		return categoryRepository.findAll().stream().count();
	}

	/**
	 * saveOrUpdate
	 * 
	 * @param category
	 * @return
	 */
	public Category saveOrUpdate(Category category) {
		return categoryRepository.save(category);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Category> findAll() {
		return categoryRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Category findById(Long id) throws Exception {
		return categoryRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Category category = findById(id);
		categoryRepository.delete(category);
	}

	// Method to get total count of categories
	public long getTotalCategoryCount() {
		return categoryRepository.count();
	}

	// Method to get count of published and unpublished categories
	public Map<String, Long> getPublishedUnpublishedCount() {
		Map<String, Long> countMap = new HashMap<>();
		countMap.put("published", categoryRepository.countByPublished(true));
		countMap.put("unpublished", categoryRepository.countByPublished(false));
		return countMap;
	}

	// Method to get distribution of categories based on name (example)
	public Map<String, Long> getCategoryDistribution() {
		List<Category> categories = categoryRepository.findAll();
		Map<String, Long> distribution = new HashMap<>();

		for (Category category : categories) {
			String categoryName = category.getCategory_name();
			distribution.put(categoryName, distribution.getOrDefault(categoryName, 0L) + 1);
		}

		return distribution;
	}


	public Category setCategoryPublished(Long categoryId, boolean published) {
		Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
		category.setPublished(published);
		return categoryRepository.save(category);
	}
}
