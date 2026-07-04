package com.dev.delta;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.dev.delta.entities.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.dev.delta.entities.CatalogItem;
import com.dev.delta.repositories.CirculationRepository;
import com.dev.delta.services.CirculationService;

/**
 * CirculationServiceTest
 * 
 * @author Admin
 *
 */
@SpringBootTest
class CirculationServiceTest {

	@InjectMocks
	CirculationService circulationService;

	@Mock
	CirculationRepository circulationRepository;

	List<Category> list;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
		list = new ArrayList<Category>();
	}

	/**
	 * getAllCirculationsTest
	 */
	@Test
	public void getAllCirculationsTest() {
		List<Circulation> list = new ArrayList<Circulation>();

		Circulation circulation1 = new Circulation(1L, new Member(), new CatalogItem(), "11/12/2021",
				"11/12/2021", LocalDate.of(2021,11,12), "11/12/2021", 5, new CirculationStatus());
		Circulation circulation2 = new Circulation(2L, new Member(), new CatalogItem(), "11/12/2021",
				"11/12/2021", LocalDate.of(2021,11,12), "11/12/2021", 5, new CirculationStatus());
		Circulation circulation3 = new Circulation(3L, new Member(), new CatalogItem(),  "11/12/2021",
				"11/12/2021", LocalDate.of(2021,11,12), "11/12/2021", 5, new CirculationStatus());

		list.add(circulation1);
		list.add(circulation2);
		list.add(circulation3);

		when(circulationRepository.findAll()).thenReturn(list);

		// test
		List<Circulation> circulationList = (List<Circulation>) circulationService.findAll();

		assertEquals(3, circulationList.size());
		verify(circulationRepository, times(1)).findAll();
	}

	/**
	 * getCirculationByIdTest
	 * 
	 * @throws Exception
	 */
	@Test
	public void getCirculationByIdTest() throws Exception {
		when(circulationRepository.findById(1L)).thenReturn(Optional.of(new Circulation(1L, new Member(), new CatalogItem(),
				 "11/12/2021", "11/12/2021", LocalDate.of(2021,11,12), "11/12/2021", 5, new CirculationStatus())));
		Circulation circulation = circulationService.findById(1L);
		assertEquals("11/12/2021", circulation.getIssueDate());
	}

	/**
	 * saveCirculationTest
	 */
	@Test
	public void saveCirculationTest() {
		Circulation circulation1 = new Circulation(1L, new Member(), new CatalogItem(), "11/12/2021",
				"11/12/2021", LocalDate.of(2021,11,12), "11/12/2021", 5, new CirculationStatus());
		circulationService.saveOrUpdate(circulation1);
		verify(circulationRepository, times(1)).save(circulation1);
	}

}
