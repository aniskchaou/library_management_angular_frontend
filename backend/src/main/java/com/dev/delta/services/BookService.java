package com.dev.delta.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.dev.delta.dto.AuthorPublicationDTO;
import com.dev.delta.dto.ChartData;
import com.dev.delta.dto.MediaTypeCountDTO;
import com.dev.delta.entities.CatalogItem;
import com.dev.delta.entities.Shelf;
import com.dev.delta.repositories.CategoryBookRepository;
import com.dev.delta.repositories.CirculationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.BookRepository;

/**
 * BookService
 * 
 * @author Admin
 *
 */
@Service
public class BookService {

	/**
	 * BookRepository
	 */
	@Autowired
	BookRepository bookRepository;

	@Autowired
	CategoryBookRepository categoryBookRepository;

	@Autowired
	CirculationRepository circulationRepository;

	public long count() {

		return bookRepository.count();
	}

	/**
	 * saveOrUpdate
	 * 
	 * @param catalogItem
	 * @return
	 */
	public CatalogItem saveOrUpdate(CatalogItem catalogItem) {

		return bookRepository.save(catalogItem);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<CatalogItem> findAll() {
		return bookRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public CatalogItem findById(Long id) throws Exception {
		return bookRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	public List<CatalogItem> findArchivedBook() throws Exception {
		return bookRepository.findArchivedBook();
	}

	public List<CatalogItem> findDestroyedBook() throws Exception {
		return bookRepository.findDestroyedBook();
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		CatalogItem catalogItem = findById(id);
		bookRepository.delete(catalogItem);
	}

	/**
	 * filterBook
	 * 
	 * @param edition_year
	 * @param publishing_year
	 * @param publishing_place
	 * @param number_of_pages
	 * @return
	 */
	public CatalogItem filterBook(String edition_year, String publishing_year, String publishing_place,
                                  String number_of_pages) {
		return bookRepository.findBookFilter(edition_year, publishing_year, publishing_place, number_of_pages);
	}

	public List<CatalogItem> filterBookByCriteria(String edition_year, int authorId, int publisherId, int categoryId) {
		return bookRepository.findBookByCriteria(edition_year, authorId, publisherId, categoryId);
	}

	public List<CatalogItem> groupByAuthors() {
		return bookRepository.groupByAuthors();
	}

	public List<CatalogItem> groupByEditionYear() {
		return bookRepository.groupByEditionYear();
	}

	public List<CatalogItem> groupByPublishers() {
		return bookRepository.groupByPublisher();
	}

	public List<CatalogItem> groupByCategories() {
		return bookRepository.groupByCategories();
	}

	public List<CatalogItem> filterByYears(int id) {
		// TODO Auto-generated method stub
		return bookRepository.filterByYears(String.valueOf(id));
	}

	public List<CatalogItem> filterByWriters(int id) {
		// TODO Auto-generated method stub
		return bookRepository.filterByWriters(id);
	}

	public List<CatalogItem> filterByCategories(int id) {
		// TODO Auto-generated method stub
		return bookRepository.filterByCategories(id);
	}

	public void archiveBook(int id) {
		bookRepository.archiveBook(id);

	}

	public void destroyBook(int id) {
		bookRepository.destroyBook(id);

	}

	public List<Map<String, Object>> getNumberOfPublicationsByPublisher() {
		return bookRepository.findPublicationsByPublisher();
	}

	// 2. Publisher Distribution by Genre
	public List<Map<String, Object>> getPublisherDistributionByGenre() {
		return bookRepository.findPublisherDistributionByGenre();
	}

	// 3. Publication Trends by Publisher Over Time
	public List<Map<String, Object>> getPublicationTrendsByPublisher() {
		return bookRepository.findPublicationTrendsByPublisher();
	}

	// 4. Top Publishers by Borrow Count
	public List<Map<String, Object>> getTopPublishersByBorrowCount(){
		return bookRepository.findTopPublishersByBorrowCount();
	}


	public List<AuthorPublicationDTO> getNumberOfPublicationsByAuthors() {
		return bookRepository.getNumberOfPublicationsByAuthors();
	}

	public List<AuthorPublicationDTO> getPublicationDistributionByGenre() {
		return bookRepository.getPublicationDistributionByGenre();
	}

	public List<AuthorPublicationDTO> getPublicationTrendsOverTime() {
		return bookRepository.getPublicationTrendsOverTime();
	}

	public List<AuthorPublicationDTO> getTopAuthorsByBorrowCount() {
		return bookRepository.getTopAuthorsByBorrowCount();
	}

	public List<MediaTypeCountDTO> getNumberOfMediaItemsByType() {
		return bookRepository.getNumberOfMediaItemsByType();
	}

	public List<MediaTypeCountDTO> getMediaDistributionByGenre() {
		return bookRepository.getMediaDistributionByGenre();
	}

	public List<MediaTypeCountDTO> getMediaAcquisitionTrendsOverTime() {
		return bookRepository.getMediaAcquisitionTrendsOverTime();
	}

	public List<MediaTypeCountDTO> getTopMediaTypesByBorrowCount() {
		return bookRepository.getTopMediaTypesByBorrowCount();
	}


	public List<ChartData> getItemsByCategory() {
		return bookRepository.findItemsByCategory();
	}

	public List<ChartData> getItemsByMediaType() {
		return bookRepository.findItemsByMediaType();
	}

	public List<ChartData> getItemsByPublishingYear() {
		return bookRepository.findItemsByPublishingYear();
	}

	public List<ChartData> getItemsByStatus() {
		return bookRepository.findItemsByStatus();
	}

	// Top Authors
	public List<Object[]> getTopAuthors() {
		return bookRepository.findTopAuthors();
	}

	// Top Publications
	public List<Object[]> getTopPublications() {
		return bookRepository.findTopPublications();
	}

	// Most Popular Genres
	public List<Object[]> getMostPopularGenres() {
		return categoryBookRepository.findMostPopularGenres();
	}

	// Top Circulating Books
	public List<Object[]> getTopCirculatingBooks() {
		return circulationRepository.findTopCirculatingBooks();
	}

	// Top Book Series
	public List<Object[]> getTopBookSeries() {
		return bookRepository.findTopBookSeries();
	}



	// Method to get books grouped by shelves
	/*public Map<String, List<CatalogItem>> getBooksGroupedByShelves(String departmentName) {
		// Fetch all books in the department
		List<CatalogItem> books = bookRepository.findByDepartmentName(departmentName);

		// Group books by shelf name
		return books.stream()
				.collect(Collectors.groupingBy(book -> book.getShelf().getShelfName()));
	}*/

	public List<Map<String, Object>> getBooksGroupedByShelves(String departmentName) {
		// Fetch all books in the department
		List<CatalogItem> books = bookRepository.findByDepartmentName(departmentName);

		// Group books by shelf
		Map<Shelf, List<CatalogItem>> groupedBooks = books.stream()
				.collect(Collectors.groupingBy(CatalogItem::getShelf));

		// Create the response as a list of maps
		List<Map<String, Object>> response = new ArrayList<>();

		for (Map.Entry<Shelf, List<CatalogItem>> entry : groupedBooks.entrySet()) {
			Shelf shelf = entry.getKey();
			List<CatalogItem> shelfBooks = entry.getValue();

			// Create a map for the shelf
			Map<String, Object> shelfMap = new HashMap<>();
			shelfMap.put("id", shelf.getId());
			shelfMap.put("name", shelf.getShelfName());

			// Create the list of books
			List<Map<String, Object>> bookList = shelfBooks.stream()
					.map(book -> {
						Map<String, Object> bookMap = new HashMap<>();
						bookMap.put("id", book.getId());
						bookMap.put("title", book.getTitle());
						bookMap.put("imageUrl", book.getPhoto());  // Assuming photo is the URL
						return bookMap;
					})
					.collect(Collectors.toList());

			shelfMap.put("books", bookList);
			response.add(shelfMap);
		}

		return response;
	}
}
