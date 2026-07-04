package com.dev.delta.repositoriesi18n;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.delta.entitiesi18n.PaymentI18n;

public interface PaymentI18nRepository extends JpaRepository<PaymentI18n, Long> {
	PaymentI18n findByLangI18n(String lang);
}
