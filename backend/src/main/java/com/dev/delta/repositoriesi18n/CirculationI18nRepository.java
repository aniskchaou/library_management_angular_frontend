package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.CirculationI18n;

public interface CirculationI18nRepository extends JpaRepository<CirculationI18n, Long> {

	CirculationI18n findByLangI18n(String lang);

}
