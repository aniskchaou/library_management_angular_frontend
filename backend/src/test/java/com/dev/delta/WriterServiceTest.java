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

import com.dev.delta.entities.Writer;
import com.dev.delta.repositories.WriterRepository;
import com.dev.delta.services.WriterService;

/**
 * WriterServiceTest
 * 
 * @author Admin
 *
 */
@SpringBootTest
class WriterServiceTest {

	@InjectMocks
	WriterService writerService;

	@Mock
	WriterRepository writerRepository;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	/**
	 * getAllWritersTest
	 */
	@Test
	public void getAllWritersTest() {
		List<Writer> list = new ArrayList<Writer>();
		Writer writer1 = new Writer(1L, "John", "");
		Writer writer2 = new Writer(2L, "James", "");
		Writer writer3 = new Writer(3L, "Mike", "");

		list.add(writer1);
		list.add(writer2);
		list.add(writer3);

		when(writerRepository.findAll()).thenReturn(list);
		List<Writer> writerList = (List<Writer>) writerService.findAll();
		assertEquals(3, writerList.size());
		verify(writerRepository, times(1)).findAll();
	}

	/**
	 * getWriterByIdTest
	 * 
	 * @throws Exception
	 */
	@Test
	public void getWriterByIdTest() throws Exception {
		when(writerRepository.findById(1L)).thenReturn(Optional.of(new Writer(1L, "John", "")));
		Writer writer = writerService.findById(1L);
		assertEquals("John", writer.getName());
	}

	/**
	 * saveWriterTest
	 */
	@Test
	public void saveWriterTest() {
		Writer writer1 = new Writer(1L, "123", "title 1");
		writerService.saveOrUpdate(writer1);
		verify(writerRepository, times(1)).save(writer1);
	}

}
