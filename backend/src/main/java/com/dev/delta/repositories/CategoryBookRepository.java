package com.dev.delta.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.dev.delta.entities.Category;

@RepositoryRestResource
public interface CategoryBookRepository extends JpaRepository<Category, Long> {

	// List<Category> findBy;
	@Query(nativeQuery = true, value = "select * from Category c where c.category_name = :category_name")
	List<Category> findByname(String category_name);

	@Query(nativeQuery = true, value = "select count(*) from Category c where c.category_name = :category_name")
	Long getCategoryCount(String category_name);

	// Most Popular Genres
	@Query("SELECT c.category_name, COUNT(c.category_name) FROM CatalogItem ci JOIN ci.category c GROUP BY c.category_name ORDER BY COUNT(c.category_name) DESC")
	List<Object[]> findMostPopularGenres();

	long countByPublished(boolean published);

}
