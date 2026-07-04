package com.dev.delta.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dev.delta.entities.Writer;

public interface WriterRepository extends JpaRepository<Writer, Long> {

	List<Writer> findByName(String writer);

	@Query(nativeQuery = true, value = "select count(*) from Writer c where c.name = :name")
	Long getWriterCount(String name);
}
