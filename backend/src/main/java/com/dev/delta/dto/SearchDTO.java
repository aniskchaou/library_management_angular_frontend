package com.dev.delta.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositoriesi18n.SearchRepository;

@Service
public class SearchDTO implements DTO {

	@Autowired
	SearchRepository searchRepository;

	@Override
	public void populate() {
		searchI18n.setAuthorI18n("Tác giả");
		searchI18n.setBookI18n("Sách");
		searchI18n.setCategoryI18n("Danh mục");
		searchI18n.setLangI18n("EN");
		searchI18n.setResultI18n("Kết quả cho");
		searchRepository.save(searchI18n);

		searchI18n2.setAuthorI18n("المؤلف");
		searchI18n2.setBookI18n("كتاب");
		searchI18n2.setCategoryI18n("الفئة");
		searchI18n2.setLangI18n("AR");
		searchI18n2.setResultI18n("نتيجة لـ");
		searchRepository.save(searchI18n2);

		searchI18n4.setAuthorI18n("লেখক");
		searchI18n4.setBookI18n("বই");
		searchI18n4.setCategoryI18n("বিভাগ");
		searchI18n4.setLangI18n("BN");
		searchI18n4.setResultI18n("এর জন্য ফলাফল");
		searchRepository.save(searchI18n4);

		searchI18n3.setAuthorI18n("लेखक");
		searchI18n3.setBookI18n("बुक");
		searchI18n3.setCategoryI18n("श्रेणी");
		searchI18n3.setLangI18n("HN");
		searchI18n3.setResultI18n("के लिए परिणाम");
		searchRepository.save(searchI18n3);

	}

}
