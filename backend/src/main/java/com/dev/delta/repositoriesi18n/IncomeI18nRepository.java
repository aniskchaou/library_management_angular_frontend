package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.IncomeI18n;

public interface IncomeI18nRepository extends JpaRepository<IncomeI18n, Long> {
	IncomeI18n findByLangI18n(String lang);
}
