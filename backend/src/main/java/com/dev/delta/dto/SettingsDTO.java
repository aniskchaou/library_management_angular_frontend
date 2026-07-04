package com.dev.delta.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.email.EmailSettingRepository;
import com.dev.delta.repositories.SettingsRepository;
import com.dev.delta.repositoriesi18n.SettingsI18nRepository;

@Service
public class SettingsDTO implements DTO {

	@Autowired
	SettingsRepository settingsRepository;

	@Autowired
	SettingsI18nRepository settingsI18nRepository;

	@Autowired
	EmailSettingRepository emailSettingRepository;

	@Override
	public void populate() {
		settings.setAddress(faker.address().fullAddress());
		settings.setFax(faker.phoneNumber().phoneNumber().toString());
		settings.setLang("AR");
		settings.setName("Libary Lab");
		settings.setTelephone(faker.phoneNumber().phoneNumber().toString());
		settingsRepository.save(settings);

		emailSetting.setAuth("true");
		emailSetting.setEmail("kchaouanis27@gmail.com");
		emailSetting.setEnableTLS("true");
		emailSetting.setHost("smtp.gmail.com");
		emailSetting.setPassword("vhfzafafcdrmjvez");
		emailSetting.setPort("587");

		emailSettingRepository.save(emailSetting);

		settingsI18n.setAddressI18n("Address");
		settingsI18n.setFaxI18n("Fax");
		// settingsI18n.setLangI18n("Language");
		settingsI18n.setNameI18n("Library Name");
		settingsI18n.setTelephoneI18n("Phone");
		settingsI18n.setLangI18n("EN");
		settingsI18n.setAddButtonI18n("Create");
		settingsI18n.setAddTitleI18n("Create");
		settingsI18n.setAllTitleI18n("Settings");
		settingsI18n.setCloseButtonI18n("Close");
		settingsI18n.setEditButtonI18n("Edit");
		settingsI18n.setEditTitleI18n("Edit Settings");
		settingsI18n.setLanguageI18n("Language");
		settingsI18n.setAuthI18n("Authentification");
		settingsI18n.setHostI18n("Host");
		settingsI18n.setEmailI18n("Sender email");
		settingsI18n.setEnableTLS("enable TLS");
		settingsI18nRepository.save(settingsI18n);

		settingsI18n2.setAddressI18n("العنوان");
		settingsI18n2.setFaxI18n("فاكس");
		settingsI18n2.setNameI18n("اسم المكتبة");
		settingsI18n2.setTelephoneI18n("الهاتف");
		settingsI18n2.setAddButtonI18n("إنشاء");
		settingsI18n2.setAddTitleI18n("إنشاء");
		settingsI18n2.setAllTitleI18n("الإعدادات");
		settingsI18n2.setCloseButtonI18n("إغلاق");
		settingsI18n2.setEditButtonI18n("تحرير");
		settingsI18n2.setEditTitleI18n("تحرير الإعدادات");
		settingsI18n2.setLangI18n("AR");
		settingsI18n2.setLanguageI18n("لغة");
		settingsI18n2.setAuthI18n("المصادقة");
		settingsI18n2.setHostI18n("مضيف");
		settingsI18n2.setEmailI18n("البريد الإلكتروني المرسل");
		settingsI18n2.setEnableTLS("TLS");
		settingsI18nRepository.save(settingsI18n2);

		settingsI18n3.setAddressI18n("पता");
		settingsI18n3.setFaxI18n("फैक्स");
		// सेटिंग्सI18n.setLangI18n ("भाषा");
		settingsI18n3.setNameI18n("लाइब्रेरी का नाम");
		settingsI18n3.setTelephoneI18n("फोन");
		settingsI18n3.setLangI18n("HN");
		settingsI18n3.setAddButtonI18n("बनाएं");
		settingsI18n3.setAddTitleI18n("बनाएं");
		settingsI18n3.setAllTitleI18n("सेटिंग्स");
		settingsI18n3.setCloseButtonI18n("बंद करें");
		settingsI18n3.setEditButtonI18n("संपादित करें");
		settingsI18n3.setEditTitleI18n("सेटिंग संपादित करें");
		settingsI18n3.setLanguageI18n("भाषा");
		settingsI18n3.setAuthI18n("প্রমাণীকরণ");
		settingsI18n3.setHostI18n("হোস্ট");
		settingsI18n3.setEmailI18n("প্রেরক ইমেল");
		settingsI18n3.setEnableTLS("TLS");
		settingsI18nRepository.save(settingsI18n3);

		settingsI18n4.setAddressI18n("ঠিকানা");
		settingsI18n4.setFaxI18n("ফ্যাক্স");
		// settingsI18n.setLangI18n("ভাষা");
		settingsI18n4.setNameI18n("লাইব্রেরির নাম");
		settingsI18n4.setTelephoneI18n("ফোন");
		settingsI18n4.setLangI18n("BN");
		settingsI18n4.setAddButtonI18n("তৈরি করুন");
		settingsI18n4.setAddTitleI18n("তৈরি করুন");
		settingsI18n4.setAllTitleI18n("সেটিংস");
		settingsI18n4.setCloseButtonI18n("বন্ধ");
		settingsI18n4.setEditButtonI18n("সম্পাদনা");
		settingsI18n4.setEditTitleI18n("সেটিংস সম্পাদনা করুন");
		settingsI18n4.setLanguageI18n("ভাষা");
		settingsI18n4.setAuthI18n("प्रमाणीकरण");
		settingsI18n4.setHostI18n("मेज़बान");
		settingsI18n4.setEmailI18n("प्रेषक ईमेल");
		settingsI18n4.setEnableTLS("TLS");
		settingsI18nRepository.save(settingsI18n4);

	}

}
