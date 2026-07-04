package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.CirculationStatusI18n;

public interface CirculationStatusI18nRepository extends JpaRepository<CirculationStatusI18n, Long> {

	CirculationStatusI18n findByLangI18n(String lang);

}
