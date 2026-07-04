package com.dev.delta.dto;

import com.dev.delta.entities.CirculationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.CirculationStatusRepository;
import com.dev.delta.repositoriesi18n.CirculationStatusI18nRepository;

/**
 * CirculationStatusDTO
 * 
 * @author Admin
 *
 */
@Service
public class CirculationStatusDTO implements DTO {

	@Autowired
	CirculationStatusRepository circulationRepository;

	@Autowired
	CirculationStatusI18nRepository circulationI18nRepository;

	@Override
	public void populate() {

		/*circulationStatus.setName("Issued");
		circulationRepository.save(circulationStatus);
		circulationStatus2.setName("Returned");
		circulationRepository.save(circulationStatus2);*/

		// Creating the "Issued" status
		//circulationStatus.setName("Issued");
		//circulationRepository.save(circulationStatus);

// Creating the "Returned" status
		circulationStatus2.setName("Renew");
		circulationRepository.save(circulationStatus2);

// Creating the "CheckIn" status
		//CirculationStatus circulationStatus3 = new CirculationStatus();
		circulationStatus.setName("CheckIn");
		circulationRepository.save(circulationStatus);

// Creating the "CheckOut" status

		circulationStatus4.setName("CheckOut");
		circulationRepository.save(circulationStatus4);

// Creating the "Holded" status

		circulationStatus5.setName("On Hold");
		circulationRepository.save(circulationStatus5);

// Creating the "Overdue" status
		CirculationStatus circulationStatus6 = new CirculationStatus();
		circulationStatus6.setName("Overdue");
		circulationRepository.save(circulationStatus6);


		circulationStatusI18n.setNameI18n("Trạng thái lưu thông");
		circulationStatusI18n.setLangI18n("EN");
		circulationStatusI18n.setAddButtonI18n("Tạo");
		circulationStatusI18n.setAddTitleI18n("Tạo trạng thái lưu thông");
		circulationStatusI18n.setAllTitleI18n("Trạng thái lưu thông");
		circulationStatusI18n.setCloseButtonI18n("Đóng");
		circulationStatusI18n.setEditButtonI18n("Chỉnh sửa");
		circulationStatusI18n.setEditTitleI18n("Chỉnh sửa trạng thái lưu thông");
		circulationI18nRepository.save(circulationStatusI18n);

		circulationStatusI18n2.setNameI18n("حالة الإعارة");
		circulationStatusI18n2.setLangI18n("AR");
		circulationStatusI18n2.setAddButtonI18n("إنشاء");
		circulationStatusI18n2.setAddTitleI18n("إنشاء حالة الإعارة");
		circulationStatusI18n2.setAllTitleI18n("حالة الإعارة");
		circulationStatusI18n2.setCloseButtonI18n("إغلاق");
		circulationStatusI18n2.setEditButtonI18n("تحرير");
		circulationStatusI18n2.setEditTitleI18n("تحرير حالة الإعارة");
		circulationI18nRepository.save(circulationStatusI18n2);

		circulationStatusI18n4.setNameI18n("পরিচলন অবস্থা");
		circulationStatusI18n4.setLangI18n("BN");
		circulationStatusI18n4.setAddButtonI18n("তৈরি করুন");
		circulationStatusI18n4.setAddTitleI18n("সার্কুলেশন স্ট্যাটাস তৈরি করুন");
		circulationStatusI18n4.setAllTitleI18n("সার্কুলেশন স্ট্যাটাস");
		circulationStatusI18n4.setCloseButtonI18n("বন্ধ");
		circulationStatusI18n4.setEditButtonI18n("সম্পাদনা");
		circulationStatusI18n4.setEditTitleI18n("পরিচলন স্থিতি সম্পাদনা করুন");
		circulationI18nRepository.save(circulationStatusI18n4);

		circulationStatusI18n3.setNameI18n("परिसंचरण स्थिति");
		circulationStatusI18n3.setLangI18n("HN");
		circulationStatusI18n3.setAddButtonI18n("बनाएं");
		circulationStatusI18n3.setAddTitleI18n("परिसंचरण स्थिति बनाएँ");
		circulationStatusI18n3.setAllTitleI18n("परिसंचरण स्थिति");
		circulationStatusI18n3.setCloseButtonI18n("बंद करें");
		circulationStatusI18n3.setEditButtonI18n("संपादित करें");
		circulationStatusI18n3.setEditTitleI18n("परिसंचरण स्थिति संपादित करें");
		circulationI18nRepository.save(circulationStatusI18n3);
	}

}
