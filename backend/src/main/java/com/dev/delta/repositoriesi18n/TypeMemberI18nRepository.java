package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.TypeMemberI18n;

public interface TypeMemberI18nRepository extends JpaRepository<TypeMemberI18n, Long> {

	TypeMemberI18n findByLangI18n(String lang);

}
