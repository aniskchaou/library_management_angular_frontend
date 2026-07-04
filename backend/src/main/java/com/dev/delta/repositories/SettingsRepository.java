package com.dev.delta.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev.delta.entities.Settings;

public interface SettingsRepository extends JpaRepository<Settings, Long> {
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "update settings  set lang=:lang  where id=1")
	void updateSettingsByLang(@Param("lang") String lang);
}
