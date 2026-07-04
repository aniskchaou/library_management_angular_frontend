package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Publisher;
import com.dev.delta.repositories.PublisherRepository;

/**
 * PublisherService
 * 
 * @author Admin
 *
 */
@Service
public class PublisherService {

	/**
	 * PublisherRepository
	 */
	@Autowired
	PublisherRepository publisherRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param publisher
	 * @return
	 */
	public Publisher saveOrUpdate(Publisher publisher) {
		return publisherRepository.save(publisher);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Publisher> findAll() {
		return publisherRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Publisher findById(Long id) throws Exception {
		return publisherRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Publisher publisher = findById(id);
		publisherRepository.delete(publisher);
	}
}
