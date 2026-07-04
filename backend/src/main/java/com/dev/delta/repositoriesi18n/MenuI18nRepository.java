package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.MenuI18n;

public interface MenuI18nRepository extends JpaRepository<MenuI18n, Long> {

	MenuI18n findByLangI18n(String lang);

}
