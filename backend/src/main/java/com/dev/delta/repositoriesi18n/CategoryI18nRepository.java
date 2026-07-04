package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.CategoryI18n;

public interface CategoryI18nRepository extends JpaRepository<CategoryI18n, Long> {
	CategoryI18n findByLangI18n(String lang);

}
