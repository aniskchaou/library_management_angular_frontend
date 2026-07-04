package com.dev.delta.dto;

import com.dev.delta.entities.Writer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.WriterRepository;
import com.dev.delta.repositoriesi18n.WriterI18nRepository;

import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.Random;

@Service
public class WriterDTO implements DTO {

	@Autowired
	WriterRepository writerRepository;

	@Autowired
	WriterI18nRepository writerI18nRepository;

	@Override
	public void populate() {

		writer.setName("Nguyễn Nhật Ánh");
		writer.setNote("Tác giả nổi tiếng với các tác phẩm dành cho thiếu nhi.");
		writer.setDob("1955-05-07"); // Date of birth
		writer.setDied("no");
		writer.setDod("N/A");
		writer.setPublications("Kính vạn hoa, Tôi thấy hoa vàng trên cỏ xanh");
		writer.setBio("Nguyễn Nhật Ánh là một trong những nhà văn nổi tiếng nhất Việt Nam.");
		writer.setAwards("Giải thưởng văn học thiếu nhi");
		writer.setRefrences("Tạp chí Văn học Việt Nam");
		writerRepository.save(writer);

		for (int i = 0; i < 55; i++) {
			Writer writer5 = new Writer();

			// Vietnamese writer data
			String[] vietnameseWriters = {
				"Nguyễn Du",
				"Xuân Diệu",
				"Hàn Mặc Tử",
				"Tố Hữu",
				"Nam Cao",
				"Nguyễn Nhật Ánh",
				"Vũ Trọng Phụng",
				"Nguyễn Huy Thiệp",
				"Nguyễn Đình Chiểu",
				"Hồ Xuân Hương"
			};

			Random random = new Random();

			writer5.setName(vietnameseWriters[random.nextInt(vietnameseWriters.length)]);
			writer5.setNote("Tác giả nổi tiếng với nhiều tác phẩm văn học.");
			writer5.setDob("1970-01-01"); // Fake date of birth
			writer5.setDied(random.nextBoolean() ? "yes" : "no");
			writer5.setDod(random.nextBoolean() ? "2024-09-30".toString():"N/A");
			writer5.setPublications("Tuyển tập văn học Việt Nam");
			writer5.setBio("Nhà văn có nhiều đóng góp cho nền văn học Việt Nam.");
			writer5.setAwards("Giải thưởng văn học Việt Nam");
			writer5.setRefrences("Tạp chí Văn học Việt Nam");

			writerRepository.save(writer5);
		}

		writerI18n.setNameI18n("Tên tác giả");
		writerI18n.setNoteI18n("Ghi chú");
		writerI18n.setLangI18n("EN");
		writerI18n.setAddButtonI18n("Tạo mới");
		writerI18n.setAddTitleI18n("Tạo tác giả");
		writerI18n.setAllTitleI18n("Tác giả");
		writerI18n.setCloseButtonI18n("Đóng");
		writerI18n.setEditButtonI18n("Chỉnh sửa");
		writerI18n.setEditTitleI18n("Chỉnh sửa tác giả");
		writerI18nRepository.save(writerI18n);

		writerI18n3.setNameI18n("लेखक का नाम");
		writerI18n3.setNoteI18n("नोट");
		writerI18n3.setLangI18n("HN");
		writerI18n3.setAddButtonI18n("बनाएं");
		writerI18n3.setAddTitleI18n("लेखक बनाएं");
		writerI18n3.setAllTitleI18n("लेखक");
		writerI18n3.setCloseButtonI18n("बंद करें");
		writerI18n3.setEditButtonI18n("संपादित करें");
		writerI18n3.setEditTitleI18n("लेखक संपादित करें");
		writerI18nRepository.save(writerI18n3);

		writerI18n4.setNameI18n("লেখকের নাম");
		writerI18n4.setNoteI18n("নোট");
		writerI18n4.setLangI18n("BN");
		writerI18n4.setAddButtonI18n("তৈরি করুন");
		writerI18n4.setAddTitleI18n("লেখক তৈরি করুন");
		writerI18n4.setAllTitleI18n("লেখক");
		writerI18n4.setCloseButtonI18n("বন্ধ");
		writerI18n4.setEditButtonI18n("সম্পাদনা");
		writerI18n4.setEditTitleI18n("লেখক সম্পাদনা করুন");
		writerI18nRepository.save(writerI18n4);

		writerI18n2.setNameI18n("اسم الكاتب");
		writerI18n2.setNoteI18n("ملاحظة");
		writerI18n2.setLangI18n("AR");
		writerI18n2.setAddButtonI18n("إنشاء");
		writerI18n2.setAddTitleI18n("إنشاء فئة");
		writerI18n2.setAllTitleI18n("الناشر");
		writerI18n2.setCloseButtonI18n("إغلاق");
		writerI18n2.setEditButtonI18n("تحرير");
		writerI18n2.setEditTitleI18n("تحرير الفئة");
		writerI18nRepository.save(writerI18n2);
	}

}
