package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.BookI18n;

public interface BookI18nRepository extends JpaRepository<BookI18n, Long> {

	BookI18n findByLangI18n(String lang);

}
