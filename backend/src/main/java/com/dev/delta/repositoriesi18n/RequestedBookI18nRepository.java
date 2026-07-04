package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.RequestedBookI18n;

public interface RequestedBookI18nRepository extends JpaRepository<RequestedBookI18n, Long> {

	RequestedBookI18n findByLangI18n(String lang);

}
