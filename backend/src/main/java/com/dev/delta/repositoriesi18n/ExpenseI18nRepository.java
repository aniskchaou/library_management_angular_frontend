package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.ExpenseI18n;

public interface ExpenseI18nRepository extends JpaRepository<ExpenseI18n, Long> {
	ExpenseI18n findByLangI18n(String lang);
}
