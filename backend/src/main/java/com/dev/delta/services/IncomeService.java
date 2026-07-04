package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Income;
import com.dev.delta.repositories.IncomeRepository;

@Service
public class IncomeService {
	/**
	 * PaymentRepository
	 */
	@Autowired
	IncomeRepository icomeRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param member
	 * @return
	 */
	public Income saveOrUpdate(Income member) {
		return icomeRepository.save(member);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Income> findAll() {
		return icomeRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Income findById(Long id) throws Exception {
		return icomeRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Income member = findById(id);
		icomeRepository.delete(member);
	}

}
