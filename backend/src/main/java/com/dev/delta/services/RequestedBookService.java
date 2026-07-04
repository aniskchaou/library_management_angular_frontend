package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.RequestedBook;
import com.dev.delta.repositories.RequestedBookRepository;

/**
 * RequestedBookService
 * 
 * @author Admin
 *
 */
@Service
public class RequestedBookService {
	/**
	 * RequestedBookRepository
	 */
	@Autowired
	RequestedBookRepository requestedRequestedBookRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param requestedRequestedBook
	 * @return
	 */
	public RequestedBook saveOrUpdate(RequestedBook requestedRequestedBook) {
		return requestedRequestedBookRepository.save(requestedRequestedBook);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<RequestedBook> findAll() {
		return requestedRequestedBookRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public RequestedBook findById(Long id) throws Exception {
		return requestedRequestedBookRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		RequestedBook requestedRequestedBook = findById(id);
		requestedRequestedBookRepository.delete(requestedRequestedBook);
	}

	public void resolve(int id) {
		requestedRequestedBookRepository.resoveRequest(id);
	}

	public void reject(int id) {
		requestedRequestedBookRepository.rejectRequest(id);
	}
}
