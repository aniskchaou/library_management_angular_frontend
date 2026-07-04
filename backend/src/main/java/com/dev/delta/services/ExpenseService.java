package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Expense;
import com.dev.delta.repositories.ExpenseRepository;

@Service
public class ExpenseService {
	/**
	 * PaymentRepository
	 */
	@Autowired
	ExpenseRepository expenseRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param expense
	 * @return
	 */
	public Expense saveOrUpdate(Expense expense) {
		return expenseRepository.save(expense);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Expense> findAll() {
		return expenseRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Expense findById(Long id) throws Exception {
		return expenseRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Expense member = findById(id);
		expenseRepository.delete(member);
	}

	/*
	 * public List<Member> filterMemberCriteria(String status, String type_id,String
	 * user_type) throws Exception { return
	 * expenseRepository.filterMemberByCriteria(status,type_id,user_type); }
	 */
}
