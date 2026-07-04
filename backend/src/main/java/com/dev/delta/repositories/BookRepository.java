package com.dev.delta.repositories;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.dev.delta.dto.AuthorPublicationDTO;
import com.dev.delta.dto.ChartData;
import com.dev.delta.dto.MediaTypeCountDTO;
import com.dev.delta.entities.CatalogItem;
import com.dev.delta.entities.Category;
import com.dev.delta.entities.MediaType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BookRepository extends JpaRepository<CatalogItem, Long> {
	@Query(nativeQuery = true,value="select count(*) from book b group by b.category")
	List<Integer> findBooksByCategory();

	@Query(nativeQuery = true, value = "select * from CatalogItem b where b.edition_year = :edition_year and b.publishing_year=:publishing_year  and b.publication_place=:publishing_place and number_of_pages=:number_of_pages ")
    CatalogItem findBookFilter(@Param("edition_year") String edition_year, @Param("publishing_year") String publishing_year,
                               @Param("publishing_place") String publishing_place, @Param("number_of_pages") String number_of_pages

	);

	@Query(nativeQuery = true, value = "select * from book order by category_id ")
	List<CatalogItem> getBooksByCategory();

	@Query(nativeQuery = true, value = "select * from book order by publisher_id ")
	List<CatalogItem> getBooksByPublisher();

	@Query(nativeQuery = true, value = "select * from book order by author_id ")
	List<CatalogItem> getBooksByAuhor();

	@Query(nativeQuery = true, value = "select * from book b where b.edition_year = :edition_year and b.author_id=:author_id and b.publisher_id=:publisher_id and  b.category_id=:category_id")
	List<CatalogItem> findBookByCriteria(@Param("edition_year") String edition_year, @Param("author_id") int author_id,
                                         @Param("publisher_id") int publisher_id, @Param("category_id") int category_id);

	List<CatalogItem> findByTitle(String book);

	@Query(nativeQuery = true, value = "select count(*) from book c where c.title = :title")
	Long getBookCount(String title);

	@Query(nativeQuery = true, value = "select * from book c where c.book_status_id = 2 ")
	List<CatalogItem> findArchivedBook();

	@Query(nativeQuery = true, value = "select * from book c group by  c.author_id, c.id  ")
	List<CatalogItem> groupByAuthors();

	@Query(nativeQuery = true, value = "select *  from book c group by c.category_id, c.id  ")
	List<CatalogItem> groupByCategories();

	@Query(nativeQuery = true, value = "select *  from book c group by  c.edition_year, c.id  ")
	List<CatalogItem> groupByEditionYear();

	@Query(nativeQuery = true, value = "select *  from book c group by c.publisher_id, c.id  ")
	List<CatalogItem> groupByPublisher();

	@Query(nativeQuery = true, value = "select * from book c where c.book_status_id = 3 ")
	List<CatalogItem> findDestroyedBook();

	@Query(nativeQuery = true, value = "select count(*) from book c where c.category_id = :categoryId")
	Long getBookByCategory(int categoryId);

	@Query(nativeQuery = true, value = "select * from book c where c.edition_year = :year")
	List<CatalogItem> filterByYears(String year);

	@Query(nativeQuery = true, value = "select * from book c where c.author_id  = :writerId")
	List<CatalogItem> filterByWriters(int writerId);

	@Query(nativeQuery = true, value = "select * from book c where c.category_id = :categoryId")
	List<CatalogItem> filterByCategories(int categoryId);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(nativeQuery = true, value = "UPDATE book SET book_status_id=2 WHERE id=:id")
	void archiveBook(@Param("id") int id);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(nativeQuery = true, value = "UPDATE book   SET book_status_id=3 WHERE id=:id ")
	void destroyBook(@Param("id") int id);

	@Query(nativeQuery = true, value = "select count(*) from book c where c.publisher_id = :intValue")
	Long getBookPublisher(int intValue);

	@Query(nativeQuery = true, value = "select count(*) from book c where c.author_id = :intValue")
	Long getBookByWriter(int intValue);


	@Query("SELECT COUNT(b) FROM CatalogItem b WHERE b.category = :category")
	int countByCategory(Category category);

	@Query("SELECT COUNT(b) FROM CatalogItem b WHERE b.mediaType = :mediaType")
	int countByType(MediaType mediaType);


	// Query to count publications by each publisher
	@Query("SELECT new map(p.name as name, COUNT(c.id) as value) FROM CatalogItem c JOIN c.publisher p GROUP BY p.name")
	List<Map<String, Object>> findPublicationsByPublisher();

	// Query to count books by publisher and genre
	@Query("SELECT new map(p.name as name, COUNT(c.id) as value) FROM CatalogItem c JOIN c.publisher p JOIN c.category cat GROUP BY p.name, cat.category_name")
	List<Map<String, Object>> findPublisherDistributionByGenre();

	// Query to count publications by publisher and year
	@Query("SELECT new map(p.name as name, COUNT(c.id) as value, c.publishing_year as year) FROM CatalogItem c JOIN c.publisher p GROUP BY p.name, c.publishing_year ORDER BY c.publishing_year")
	List<Map<String, Object>> findPublicationTrendsByPublisher();

	// Query to count borrow count by publisher
	@Query("SELECT new map(p.name as name, COUNT(c.id) as value) FROM Circulation c JOIN c.catalogItemName cb JOIN cb.publisher p GROUP BY p.name ORDER BY COUNT(c.id) DESC")
	List<Map<String, Object>> findTopPublishersByBorrowCount();

	@Query("SELECT new com.dev.delta.dto.AuthorPublicationDTO(w.name, COUNT(c)) " +
			"FROM CatalogItem c JOIN c.writer w " +
			"GROUP BY w.name")
	List<AuthorPublicationDTO> getNumberOfPublicationsByAuthors();

	@Query("SELECT new com.dev.delta.dto.AuthorPublicationDTO(c.category.category_name, COUNT(c)) " +
			"FROM CatalogItem c " +
			"GROUP BY c.category.category_name")
	List<AuthorPublicationDTO> getPublicationDistributionByGenre();

	@Query("SELECT new com.dev.delta.dto.AuthorPublicationDTO(c.publishing_year, COUNT(c)) " +
			"FROM CatalogItem c " +
			"GROUP BY c.publishing_year " +
			"ORDER BY c.publishing_year")
	List<AuthorPublicationDTO> getPublicationTrendsOverTime();

	@Query("SELECT new com.dev.delta.dto.AuthorPublicationDTO(w.name, SUM(c.id)) " +
			"FROM CatalogItem c JOIN c.writer w " +
			"GROUP BY w.name " +
			"ORDER BY SUM(c.id) DESC")
	List<AuthorPublicationDTO> getTopAuthorsByBorrowCount();

	@Query("SELECT new com.dev.delta.dto.MediaTypeCountDTO(m.name, COUNT(c)) " +
			"FROM CatalogItem c JOIN c.status m " +
			"GROUP BY m.name")
	List<MediaTypeCountDTO> getNumberOfMediaItemsByType();


	@Query("SELECT new com.dev.delta.dto.MediaTypeCountDTO(c.category.category_name, COUNT(c)) " +
			"FROM CatalogItem c " +
			"GROUP BY c.category.category_name")
	List<MediaTypeCountDTO> getMediaDistributionByGenre();

	@Query("SELECT new com.dev.delta.dto.MediaTypeCountDTO(c.publishing_year, COUNT(c)) " +
			"FROM CatalogItem c " +
			"GROUP BY c.publishing_year " +
			"ORDER BY c.publishing_year")
	List<MediaTypeCountDTO> getMediaAcquisitionTrendsOverTime();

	@Query("SELECT new com.dev.delta.dto.MediaTypeCountDTO(m.name, SUM(c.id)) " +
			"FROM CatalogItem c JOIN c.status m " +
			"GROUP BY m.name " +
			"ORDER BY SUM(c.id) DESC")
	List<MediaTypeCountDTO> getTopMediaTypesByBorrowCount();

	long countByMediaType(MediaType mediaType);


	@Query("SELECT new com.dev.delta.dto.ChartData(c.category.category_name, COUNT(c)) FROM CatalogItem c GROUP BY c.category.category_name")
	List<ChartData> findItemsByCategory();

	@Query("SELECT new com.dev.delta.dto.ChartData(c.mediaType.name, COUNT(c)) FROM CatalogItem c GROUP BY c.mediaType.name")
	List<ChartData> findItemsByMediaType();

	@Query("SELECT new com.dev.delta.dto.ChartData(c.publishing_year, COUNT(c)) FROM CatalogItem c GROUP BY c.publishing_year")
	List<ChartData> findItemsByPublishingYear();

	@Query("SELECT new com.dev.delta.dto.ChartData(c.status.name, COUNT(c)) FROM CatalogItem c GROUP BY c.status.name")
	List<ChartData> findItemsByStatus();

	// Top Authors
	@Query("SELECT c.writer.name, COUNT(c.writer) FROM CatalogItem c GROUP BY c.writer.name ORDER BY COUNT(c.writer) DESC")
	List<Object[]> findTopAuthors();

	// Top Publications
	@Query("SELECT c.publisher.name, COUNT(c.publisher) FROM CatalogItem c GROUP BY c.publisher.name ORDER BY COUNT(c.publisher) DESC")
	List<Object[]> findTopPublications();

	// Top Book Series (Assuming series data exists)
	@Query("SELECT c.title, COUNT(c.title) FROM CatalogItem c WHERE c.title LIKE '%Series%' GROUP BY c.title ORDER BY COUNT(c.title) DESC")
	List<Object[]> findTopBookSeries();

	@Query("SELECT c FROM CatalogItem c WHERE c.departement.departmentCode = :departmentName")
	List<CatalogItem> findByDepartmentName(@Param("departmentName") String departmentName);

}
