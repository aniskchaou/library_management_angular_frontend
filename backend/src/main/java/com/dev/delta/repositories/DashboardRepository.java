package com.dev.delta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.DashboardI18n;

public interface DashboardRepository extends JpaRepository<DashboardI18n, Long> {

	DashboardI18n findByLangI18n(String lang);

}
