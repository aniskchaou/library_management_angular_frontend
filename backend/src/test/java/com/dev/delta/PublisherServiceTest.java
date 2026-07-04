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

import com.dev.delta.entities.Publisher;
import com.dev.delta.repositories.PublisherRepository;
import com.dev.delta.services.PublisherService;

/**
 * PublisherServiceTest
 * 
 * @author Admin
 *
 */
@SpringBootTest
class PublisherServiceTest {

	@InjectMocks
	PublisherService publisherService;

	@Mock
	PublisherRepository publisherRepository;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	/**
	 * getAllPublishersTest
	 */
	@Test
	public void getAllPublishersTest() {
		List<Publisher> list = new ArrayList<Publisher>();
		Publisher publisher1 = new Publisher(1L, "John");
		Publisher publisher2 = new Publisher(2L, "Martin");
		Publisher publisher3 = new Publisher(3L, "James");

		list.add(publisher1);
		list.add(publisher2);
		list.add(publisher3);

		when(publisherRepository.findAll()).thenReturn(list);

		// test
		List<Publisher> publisherList = (List<Publisher>) publisherService.findAll();

		assertEquals(3, publisherList.size());
		verify(publisherRepository, times(1)).findAll();
	}

	/**
	 * getPublisherByIdTest
	 * 
	 * @throws Exception
	 */
	@Test
	public void getPublisherByIdTest() throws Exception {
		when(publisherRepository.findById(1L)).thenReturn(Optional.of(new Publisher(1L, "John")));
		Publisher publisher = publisherService.findById(1L);
		assertEquals("John", publisher.getName());
	}

	/**
	 * savePublisherTest
	 */
	@Test
	public void savePublisherTest() {
		Publisher publisher1 = new Publisher(1L, "John");
		publisherService.saveOrUpdate(publisher1);
		verify(publisherRepository, times(1)).save(publisher1);
	}

}
