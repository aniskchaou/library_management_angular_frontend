package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.SearchI18n;

public interface SearchRepository extends JpaRepository<SearchI18n, Long> {

	SearchI18n findByLangI18n(String lang);

}
