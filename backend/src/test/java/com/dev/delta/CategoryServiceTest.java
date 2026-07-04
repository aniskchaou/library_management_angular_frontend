package com.dev.delta;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.dev.delta.entities.Category;
import com.dev.delta.repositories.CategoryBookRepository;
import com.dev.delta.services.CategoryBookService;

/**
 * CategoryServiceTest
 * 
 * @author Admin
 *
 */
@SpringBootTest
class CategoryServiceTest {

	@InjectMocks
	CategoryBookService categoryService;

	@Mock
	CategoryBookRepository categoryRepository;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	/**
	 * getAllCategorysTest
	 */
	@Test
	public void getAllCategorysTest() {
		List<Category> list = new ArrayList<Category>();
		Category category1 = new Category(1L, "Technology");
		Category category2 = new Category(1L, "Romance");
		Category category3 = new Category(1L, "Kids");

		list.add(category1);
		list.add(category2);
		list.add(category3);

		when(categoryRepository.findAll()).thenReturn(list);

		List<Category> categoryList = (List<Category>) categoryService.findAll();

		assertEquals(3, categoryList.size());
		verify(categoryRepository, times(1)).findAll();
	}

	/**
	 * getCategoryByIdTest
	 * 
	 * @throws Exception
	 */
	@Test
	public void getCategoryByIdTest() throws Exception {
		when(categoryRepository.findById(1L)).thenReturn(Optional.of(new Category(1L, "Technology")));
		Category category = categoryService.findById(1L);
		assertEquals("Technology", category.getCategory_name());
	}

	/**
	 * saveCategoryTest
	 */
	@Test
	public void saveCategoryTest() {
		Category category1 = new Category(1L, "Technology");
		categoryService.saveOrUpdate(category1);
		verify(categoryRepository, times(1)).save(category1);
	}

}
