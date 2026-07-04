package com.dev.delta.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.RequestedBookRepository;
import com.dev.delta.repositoriesi18n.RequestedBookI18nRepository;

@Service
public class RequestedBookDTO implements DTO {

	@Autowired
	RequestedBookRepository requestedBookRepository;

	@Autowired
	RequestedBookI18nRepository requestedBookI18nRepository;

	@Override
	public void populate() {
		// TODO Auto-generated method stub
		requestedBook.setCatalogItem(CATALOG_ITEM);
		requestedBook.setCtagory(category1);
		requestedBook.setEdition("2004");
		requestedBook.setMember(member);
		requestedBook.setNote("N/A");
		requestedBook.setWriter(writer);
		requestedBook.setStatus("Pending");
		requestedBookRepository.save(requestedBook);

		requestedBookI18n.setBookI18n("Sách");
		requestedBookI18n.setCtagoryI18n("Danh mục");
		requestedBookI18n.setEditionI18n("Phiên bản");
		requestedBookI18n.setMemberI18n("Thành viên");
		requestedBookI18n.setNoteI18n("Ghi chú");
		requestedBookI18n.setWriterI18n("Tác giả");
		requestedBookI18n.setLangI18n("EN");
		requestedBookI18n.setAddButtonI18n("Tạo mới");
		requestedBookI18n.setAddTitleI18n("Tạo sách được yêu cầu");
		requestedBookI18n.setAllTitleI18n("Danh sách sách được yêu cầu");
		requestedBookI18n.setCloseButtonI18n("Đóng");
		requestedBookI18n.setEditButtonI18n("Chỉnh sửa");
		requestedBookI18n.setEditTitleI18n("Chỉnh sửa sách được yêu cầu");
		requestedBookI18nRepository.save(requestedBookI18n);

		requestedBookI18n3.setBookI18n("বুক");
		requestedBookI18n3.setCtagoryI18n("বিভাগ");
		requestedBookI18n3.setEditionI18n("সংস্করণ");
		requestedBookI18n3.setMemberI18n("সদস্য");
		requestedBookI18n3.setNoteI18n("নোট");
		requestedBookI18n3.setWriterI18n("লেখক");
		requestedBookI18n3.setLangI18n("BN");
		requestedBookI18n3.setAddButtonI18n("তৈরি করুন");
		requestedBookI18n3.setAddTitleI18n("রিকোয়েস্ট করা বই তৈরি করুন");
		requestedBookI18n3.setAllTitleI18n("অনুরোধ করা বই");
		requestedBookI18n3.setCloseButtonI18n("বন্ধ");
		requestedBookI18n3.setEditButtonI18n("সম্পাদনা");
		requestedBookI18n3.setEditTitleI18n("অনুরোধকৃত বই সম্পাদনা করুন");
		requestedBookI18nRepository.save(requestedBookI18n3);

		requestBookI18n4.setBookI18n("बुक");
		requestBookI18n4.setCtagoryI18n("श्रेणी");
		requestBookI18n4.setEditionI18n("संस्करण");
		requestBookI18n4.setMemberI18n("सदस्य");
		requestBookI18n4.setNoteI18n("नोट");
		requestBookI18n4.setWriterI18n("लेखक");
		requestBookI18n4.setLangI18n("HN");
		requestBookI18n4.setAddButtonI18n("बनाएं");
		requestBookI18n4.setAddTitleI18n("अनुरोधित पुस्तक बनाएं");
		requestBookI18n4.setAllTitleI18n("अनुरोधित पुस्तकें");
		requestBookI18n4.setCloseButtonI18n("बंद करें");
		requestBookI18n4.setEditButtonI18n("संपादित करें");
		requestBookI18n4.setEditTitleI18n("अनुरोधित पुस्तक संपादित करें");
		requestedBookI18nRepository.save(requestBookI18n4);

		requestBookI18n2.setBookI18n("كتاب");
		requestBookI18n2.setCtagoryI18n("الفئة");
		requestBookI18n2.setEditionI18n("Edition");
		requestBookI18n2.setMemberI18n("عضو");
		requestBookI18n2.setNoteI18n("ملاحظة");
		requestBookI18n2.setWriterI18n("الكاتب");
		requestBookI18n2.setLangI18n("AR");
		requestBookI18n2.setAddButtonI18n("إنشاء");
		requestBookI18n2.setAddTitleI18n("إنشاء كتاب مطلوب");
		requestBookI18n2.setAllTitleI18n("الكتب المطلوبة");
		requestBookI18n2.setCloseButtonI18n("إغلاق");
		requestBookI18n2.setEditButtonI18n("تحرير");
		requestBookI18n2.setEditTitleI18n("تحرير الكتاب المطلوب");
		requestedBookI18nRepository.save(requestBookI18n2);
	}

}
