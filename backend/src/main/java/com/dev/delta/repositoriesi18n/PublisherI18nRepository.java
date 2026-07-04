package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.PublisherI18n;

public interface PublisherI18nRepository extends JpaRepository<PublisherI18n, Long> {

	PublisherI18n findByLangI18n(String lang);

}
