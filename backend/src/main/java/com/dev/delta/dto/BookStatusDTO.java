package com.dev.delta.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.BookStatusRepository;

@Service
public class BookStatusDTO implements DTO {

	@Autowired
	BookStatusRepository bookStatusRepository;

	@Override
	public void populate() {
		// TODO Auto-generated method stub
		bookStatus.setName("good");
		bookStatusRepository.save(bookStatus);
		bookStatus2.setName("archived");
		bookStatusRepository.save(bookStatus2);
		bookStatus3.setName("destroyed");
		bookStatusRepository.save(bookStatus3);

	}

}
