package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Payment;
import com.dev.delta.repositories.PaymentRepository;

@Service
public class PaymentService {
	/**
	 * PaymentRepository
	 */
	@Autowired
	PaymentRepository paymentRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param payment
	 * @return
	 */
	public Payment saveOrUpdate(Payment payment) {
		return paymentRepository.save(payment);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Payment> findAll() {
		return paymentRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Payment findById(Long id) throws Exception {
		return paymentRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Payment member = findById(id);
		paymentRepository.delete(member);
	}

}
