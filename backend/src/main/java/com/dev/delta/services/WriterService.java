package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Writer;
import com.dev.delta.repositories.WriterRepository;

/**
 * WriterService
 * 
 * @author Admin
 *
 */
@Service
public class WriterService {
	/**
	 * 
	 */
	@Autowired
	WriterRepository writerRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param writer
	 * @return
	 */
	public Writer saveOrUpdate(Writer writer) {
		return writerRepository.save(writer);
	}

	/**
	 * find all
	 * 
	 * @return
	 */
	public Iterable<Writer> findAll() {
		return writerRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Writer findById(Long id) throws Exception {
		return writerRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Writer writer = findById(id);
		writerRepository.delete(writer);
	}
}
