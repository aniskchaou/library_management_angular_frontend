package com.dev.delta.dto;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.IncomeRepository;

@Service
public class IncomeDTO implements DTO {

	@Autowired
	IncomeRepository incomeRepository;

	@SuppressWarnings("deprecation")
	@Override
	public void populate() {
		income.setAmount(100);
		income.setDate(new Date());
		income.setName("svdvfv");
		income.setNote("");
		incomeRepository.save(income);

		income2.setAmount(44);
		income2.setDate(new Date(3, 3, 2022));
		income2.setName("svdvfv");
		income2.setNote("");
		incomeRepository.save(income2);

	}

}
