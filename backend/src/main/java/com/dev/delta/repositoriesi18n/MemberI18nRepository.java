package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.MemberI18n;

public interface MemberI18nRepository extends JpaRepository<MemberI18n, Long> {

	MemberI18n findByLangI18n(String lang);

}
