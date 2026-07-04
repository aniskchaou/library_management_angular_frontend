package com.dev.delta.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.ArchiveRepository;

/**
 * 
 * @author Admin
 *
 */
@Service
public class ArchiveDTO implements DTO {

	@Autowired
	ArchiveRepository archiveRepository;

	@Override
	public void populate() {
		archive.setCategory(category1);
		archive.setCode(null);
		archive.setEdition(null);
		archive.setEditionYear(null);
		archive.setISBN(null);
		archive.setIssuedQuantity(null);
		archive.setName(null);
		archive.setPublication(null);
		archive.setQuantity(null);
		archive.setRackNo("");
		archive.setWriter(writer);
		archiveRepository.save(archive);

	}

}
