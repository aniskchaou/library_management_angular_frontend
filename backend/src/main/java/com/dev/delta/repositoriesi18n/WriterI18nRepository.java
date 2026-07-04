package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.WriterI18n;

public interface WriterI18nRepository extends JpaRepository<WriterI18n, Long> {

	WriterI18n findByLangI18n(String lang);

}
