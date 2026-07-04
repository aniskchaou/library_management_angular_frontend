package com.dev.delta;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.dev.delta.repositories.BookRepository;
import com.dev.delta.services.BookService;

/**
 * BookServiceTest
 * 
 * @author Admin
 *
 */
@SpringBootTest
class CatalogItemServiceTest {

	@InjectMocks
	BookService bookService;

	@Mock
	BookRepository bookRepository;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	/**
	 * getAllBooksTest
	 */
	@Test
	public void getAllBooksTest() {
//		List<Book> list = new ArrayList<Book>();
//		Book book1 = new Book(1L, "123", "title 1", new Writer(), "", "", "", new Publisher(), "", "", "", "", "",
//				new Category(),new BookStatus("archived"));
//		Book book2 = new Book(1L, "123", "title 1", new Writer(), "", "", "", new Publisher(), "", "", "", "", "",
//				new Category(),new BookStatus("archived"));
//		Book book3 = new Book(1L, "123", "title 1", new Writer(), "", "", "", new Publisher(), "", "", "", "", "",
//				new Category(),new BookStatus("archived"));
//
//		list.add(book1);
//		list.add(book2);
//		list.add(book3);
//		when(bookRepository.findAll()).thenReturn(list);
//		List<Book> bookList = (List<Book>) bookService.findAll();
//		assertEquals(3, bookList.size());
//		verify(bookRepository, times(1)).findAll();
	}

	/**
	 * getAllBooksTest
	 * 
	 * @throws Exception
	 */
	@Test
	public void getBookByIdTest() throws Exception {
//		when(bookRepository.findById(1L)).thenReturn(Optional.of(new Book(1L, "123", "title 1", new Writer(), "", "",
//				"", new Publisher(), "", "", "", "", "", new Category())));
//		Book book = bookService.findById(1L);
//		assertEquals("123", book.getIsbn());
//		assertEquals("title 1", book.getTitle());
	}

	/**
	 * saveBookTest
	 */
	@Test
	public void saveBookTest() {
//		Book book1 = new Book(1L, "123", "title 1", new Writer(), "", "", "", new Publisher(), "", "", "", "", "",
//				new Category());
//		bookService.saveOrUpdate(book1);
//		verify(bookRepository, times(1)).save(book1);
	}

}
