package com.dev.delta.dto;

import com.dev.delta.entities.Publisher;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.PublisherRepository;
import com.dev.delta.repositoriesi18n.PublisherI18nRepository;

@Service
public class PublisherDTO implements DTO {

	@Autowired
	PublisherRepository publisherRepository;

	@Autowired
	PublisherI18nRepository publisherI18nRepository;

	@Override
	public void populate() {

		for (int i = 0; i < 55; i++) {
			Publisher publisher4 = new Publisher();

			// Vietnamese publisher data
			String[] vietnamesePublisherNames = {
				"Nhà xuất bản Trẻ",
				"Nhà xuất bản Kim Đồng",
				"Nhà xuất bản Giáo dục Việt Nam",
				"Nhà xuất bản Văn học",
				"Nhà xuất bản Chính trị Quốc gia",
				"Nhà xuất bản Khoa học và Kỹ thuật",
				"Nhà xuất bản Tổng hợp TP.HCM",
				"Nhà xuất bản Lao động",
				"Nhà xuất bản Phụ nữ Việt Nam",
				"Nhà xuất bản Hội Nhà văn"
			};

			String[] vietnameseAddresses = {
				"12 Nguyễn Huệ, Quận 1, TP.HCM",
				"45 Tràng Tiền, Hoàn Kiếm, Hà Nội",
				"22 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
				"10 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
				"25 Hàng Bài, Hoàn Kiếm, Hà Nội"
			};

			Random random = new Random();

			// Set Vietnamese publisher details
			publisher4.setName(vietnamesePublisherNames[random.nextInt(vietnamesePublisherNames.length)]);
			publisher4.setAddress(vietnameseAddresses[random.nextInt(vietnameseAddresses.length)]);
			publisher4.setEmail("publisher" + i + "@example.vn");
			publisher4.setPhone("+84 " + (random.nextInt(900000000) + 100000000));
			publisher4.setCountry("Việt Nam");
			publisher4.setWebsite("https://www.nxb" + i + ".vn");

			publisherRepository.save(publisher4);
		}


		publisher.setName(faker.book().publisher());
		publisher.setAddress(faker.address().streetAddress());
		publisher.setEmail(faker.internet().emailAddress());
		publisher.setPhone(faker.phoneNumber().phoneNumber());
		publisher.setCountry(faker.address().country());
		publisher.setWebsite(faker.internet().url());

		publisherRepository.save(publisher);

		publisherI18n.setNameI18n("Tên nhà xuất bản");
		publisherI18n.setLangI18n("EN");
		publisherI18n.setAddButtonI18n("Tạo mới");
		publisherI18n.setAddTitleI18n("Tạo nhà xuất bản");
		publisherI18n.setAllTitleI18n("Danh sách nhà xuất bản");
		publisherI18n.setCloseButtonI18n("Đóng");
		publisherI18n.setEditButtonI18n("Chỉnh sửa");
		publisherI18n.setEditTitleI18n("Chỉnh sửa nhà xuất bản");
		publisherI18nRepository.save(publisherI18n);

		publisherI18n2.setNameI18n("اسم الناشر");
		publisherI18n2.setLangI18n("AR");
		publisherI18n2.setAddButtonI18n("إنشاء");
		publisherI18n2.setAddTitleI18n("إنشاء فئة");
		publisherI18n2.setAllTitleI18n("الفئات");
		publisherI18n2.setCloseButtonI18n("إغلاق");
		publisherI18n2.setEditButtonI18n("تحرير");
		publisherI18n2.setEditTitleI18n("تحرير الفئة");
		publisherI18nRepository.save(publisherI18n2);

		publisherI18n3.setNameI18n("प्रकाशक का नाम");
		publisherI18n3.setLangI18n("HN");
		publisherI18n3.setAddButtonI18n("बनाएं");
		publisherI18n3.setAddTitleI18n("प्रकाशक बनाएं");
		publisherI18n3.setAllTitleI18n("प्रकाशक");
		publisherI18n3.setCloseButtonI18n("बंद करें");
		publisherI18n3.setEditButtonI18n("संपादित करें");
		publisherI18n3.setEditTitleI18n("प्रकाशक संपादित करें");
		publisherI18nRepository.save(publisherI18n3);

		publisherI18n4.setNameI18n("প্রকাশকের নাম");
		publisherI18n4.setLangI18n("BN");
		publisherI18n4.setAddButtonI18n("তৈরি করুন");
		publisherI18n4.setAddTitleI18n("প্রকাশক তৈরি করুন");
		publisherI18n4.setAllTitleI18n("প্রকাশকরা");
		publisherI18n4.setCloseButtonI18n("বন্ধ");
		publisherI18n4.setEditButtonI18n("সম্পাদনা");
		publisherI18n4.setEditTitleI18n("সম্পাদনা প্রকাশক");
		publisherI18nRepository.save(publisherI18n4);

	}

}
