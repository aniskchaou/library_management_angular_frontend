package com.dev.delta.dto;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.ExpenseRepository;

@Service
public class ExpenseDTO implements DTO {

	@Autowired
	ExpenseRepository expenseRepository;

	@SuppressWarnings("deprecation")
	@Override
	public void populate() {
		expense.setAmount(12);
		expense.setDate(new Date());
		expense.setName("ds");
		expense.setNote("");
		expenseRepository.save(expense);

		expense2.setAmount(20);
		expense2.setDate(new Date(1, 2, 2022));
		expense2.setName("ss");
		expense2.setNote("");
		expenseRepository.save(expense2);

	}

}
