package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.SettingsI18n;

public interface SettingsI18nRepository extends JpaRepository<SettingsI18n, Long> {

	SettingsI18n findByLangI18n(String lang);

}
