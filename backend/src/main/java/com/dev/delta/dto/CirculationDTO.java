package com.dev.delta.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.CirculationRepository;
import com.dev.delta.repositoriesi18n.CirculationI18nRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

/**
 * CirculationDTO
 * 
 * @author Admin
 *
 */
@Service
public class CirculationDTO implements DTO {

	@Autowired
	CirculationRepository circulationRepository;

	@Autowired
	CirculationI18nRepository circulationnRepositoryI18n;

	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy/dd/MM");
	private static final Random random = new Random();


	public static LocalDate getRandomDate(int startYear, int endYear) {
		int day = random.nextInt(365); // Random day offset
		LocalDate startDate = LocalDate.of(startYear, 1, 1); // Start from the first day of the start year
		return startDate.plusDays(day);
	}

	@Override
	public void populate() {


		// Generating random dates
		LocalDate randomIssueDate = getRandomDate(2021, 2022);
		LocalDate randomLastDate = randomIssueDate.plusDays(30); // Add 30 days to the issue date for the last date
		LocalDate randomReturnDate = getRandomDate(2022, 2023); // Random return date
		LocalDate randomToReturnDate = getRandomDate(2022, 2023); // Random to return date

		// Circulation 1
		circulation.setcCatalogItemName(CATALOG_ITEM);
		circulation.setIssueDate(randomIssueDate.format(DATE_FORMAT));
		circulation.setLastDate(randomLastDate.format(DATE_FORMAT));
		circulation.setMemberName(member);
		circulation.setPenalty(5);
		circulation.setReturnDate(randomReturnDate.format(DATE_FORMAT));
		circulation.setReturnStatus(circulationStatus5);
		circulation.setToReturn(randomToReturnDate);
		//circulation.setWriter(writer);
		circulationRepository.save(circulation);

		// Circulation 2
		circulation2.setcCatalogItemName(CATALOG_ITEM_3);
		randomIssueDate = getRandomDate(2021, 2022); // Generate new random dates
		randomLastDate = randomIssueDate.plusDays(30);
		circulation2.setIssueDate(randomIssueDate.format(DATE_FORMAT));
		circulation2.setLastDate(randomLastDate.format(DATE_FORMAT));
		circulation2.setMemberName(member);
		circulation2.setPenalty(5);
		randomReturnDate = getRandomDate(2021, 2022);
		circulation2.setReturnDate(randomReturnDate.format(DATE_FORMAT));
		circulation2.setReturnStatus(circulationStatus);
		randomToReturnDate = getRandomDate(2021, 2022);
		circulation2.setToReturn(LocalDate.of(2024, 1, 1));
		//circulation2.setWriter(writer);
		circulationRepository.save(circulation2);

		// Circulation 3
		circulation3.setcCatalogItemName(CATALOG_ITEM_4);
		randomIssueDate = getRandomDate(2021, 2022); // Generate new random dates
		randomLastDate = randomIssueDate.plusDays(30);
		circulation3.setIssueDate(randomIssueDate.format(DATE_FORMAT));
		circulation3.setLastDate(randomLastDate.format(DATE_FORMAT));
		circulation3.setMemberName(member);
		circulation3.setPenalty(5);
		randomReturnDate = getRandomDate(2021, 2022);
		circulation3.setReturnDate(randomReturnDate.format(DATE_FORMAT));
		circulation3.setReturnStatus(circulationStatus2);
		randomToReturnDate = getRandomDate(2021, 2022);
		circulation3.setToReturn(randomToReturnDate);
		//circulation3.setWriter(writer);
		circulationRepository.save(circulation3);

		// Circulation 4
		circulation4.setcCatalogItemName(CATALOG_ITEM_6);
		randomIssueDate = getRandomDate(2021, 2022); // Generate new random dates
		randomLastDate = randomIssueDate.plusDays(30);
		circulation4.setIssueDate(randomIssueDate.format(DATE_FORMAT));
		circulation4.setLastDate(randomLastDate.format(DATE_FORMAT));
		circulation4.setMemberName(member);
		circulation4.setPenalty(5);
		randomReturnDate = getRandomDate(2021, 2022);
		circulation4.setReturnDate(randomReturnDate.format(DATE_FORMAT));
		circulation4.setReturnStatus(circulationStatus2);
		randomToReturnDate = getRandomDate(2021, 2022);
		circulation4.setToReturn(randomToReturnDate);
		//circulation4.setWriter(writer);
		circulationRepository.save(circulation4);

		// Circulation 5
		circulation5.setcCatalogItemName(CATALOG_ITEM_5);
		randomIssueDate = getRandomDate(2021, 2022); // Generate new random dates
		randomLastDate = randomIssueDate.plusDays(30);
		circulation5.setIssueDate(randomIssueDate.format(DATE_FORMAT));
		circulation5.setLastDate(randomLastDate.format(DATE_FORMAT));
		circulation5.setMemberName(member);
		circulation5.setPenalty(5);
		randomReturnDate = getRandomDate(2021, 2022);
		circulation5.setReturnDate(randomReturnDate.format(DATE_FORMAT));
		circulation5.setReturnStatus(circulationStatus4);
		randomToReturnDate = getRandomDate(2021, 2022);
		circulation5.setToReturn(randomToReturnDate);
		//circulation5.setWriter(writer);
		circulationRepository.save(circulation5);

		// Circulation 6
		circulation6.setcCatalogItemName(CATALOG_ITEM_2);
		randomIssueDate = getRandomDate(2021, 2022); // Generate new random dates
		randomLastDate = randomIssueDate.plusDays(30);
		circulation6.setIssueDate(randomIssueDate.format(DATE_FORMAT));
		circulation6.setLastDate(randomLastDate.format(DATE_FORMAT));
		circulation6.setMemberName(member);
		circulation6.setPenalty(5);
		randomReturnDate = getRandomDate(2021, 2022);
		circulation6.setReturnDate(randomReturnDate.format(DATE_FORMAT));
		circulation6.setReturnStatus(circulationStatus5);
		randomToReturnDate = getRandomDate(2021, 2022);
		circulation6.setToReturn(randomToReturnDate);
		//circulation6.setWriter(writer);
		circulationRepository.save(circulation6);

		circulation.setcCatalogItemName(CATALOG_ITEM_3);
		circulation.setIssueDate("02/01/2022");
		circulation.setLastDate("02/05/2022");
		circulation.setMemberName(member);
		circulation.setPenalty(5);
		circulation.setReturnDate("11/9/2021");
		circulation.setReturnStatus(circulationStatus2);
		circulation.setToReturn(randomToReturnDate);
		//circulation.setWriter(writer);
		circulationRepository.save(circulation);

		circulationI18n2.setBookNameI18n("اسم الكتاب");
		circulationI18n2.setIssueDateI18n("تاريخ الإصدار");
		circulationI18n2.setLastDateI18n("آخر تاريخ");
		circulationI18n2.setMemberNameI18n("اسم العضو");
		circulationI18n2.setPenaltyI18n("عقوبة");
		circulationI18n2.setReturnDateI18n("تاريخ العودة");
		circulationI18n2.setReturnStatusI18n("حالة الإرجاع");
		circulationI18n2.setToReturnI18n("To Return");
		circulationI18n2.setWriterI18n("الكاتب");
		circulationI18n2.setLangI18n("AR");
		circulationI18n2.setAddButtonI18n("إنشاء");
		circulationI18n2.setAddTitleI18n("إنشاء إعارة");
		circulationI18n2.setAllTitleI18n("توزيع الكتاب");
		circulationI18n2.setCloseButtonI18n("إغلاق");
		circulationI18n2.setEditButtonI18n("تحرير");
		circulationI18n2.setEditTitleI18n("تحرير التدوير");
		circulationI18n2.setSendEmailI18n("إرسال");
		circulationI18n2.setContactMemberTitleI18n("عضو الاتصال");
		circulationI18n2.setMessageI18n("رسالة");
		circulationnRepositoryI18n.save(circulationI18n2);

		circulationI18n.setBookNameI18n("Tên sách");
		circulationI18n.setIssueDateI18n("Ngày phát hành");
		circulationI18n.setLastDateI18n("Ngày cuối cùng");
		circulationI18n.setMemberNameI18n("Tên thành viên");
		circulationI18n.setPenaltyI18n("Hình phạt");
		circulationI18n.setReturnDateI18n("Ngày trả lại");
		circulationI18n.setReturnStatusI18n("Trạng thái trả lại");
		circulationI18n.setToReturnI18n("Để trả lại");
		circulationI18n.setWriterI18n("Tác giả");
		circulationI18n.setLangI18n("EN");
		circulationI18n.setAddButtonI18n("Tạo");
		circulationI18n.setAddTitleI18n("Tạo lưu thông");
		circulationI18n.setAllTitleI18n("Lưu thông sách");
		circulationI18n.setCloseButtonI18n("Đóng");
		circulationI18n.setEditButtonI18n("Chỉnh sửa");
		circulationI18n.setEditTitleI18n("Chỉnh sửa lưu thông");
		circulationI18n.setSendEmailI18n("Gửi");
		circulationI18n.setContactMemberTitleI18n("Liên hệ thành viên");
		circulationI18n.setMessageI18n("Tin nhắn");
		circulationnRepositoryI18n.save(circulationI18n);

		circulationI18n3.setBookNameI18n("पुस्तक का नाम");
		circulationI18n3.setIssueDateI18n("इश्यू डेट");
		circulationI18n3.setLastDateI18n("अंतिम तिथि");
		circulationI18n3.setMemberNameI18n("सदस्य का नाम");
		circulationI18n3.setPenaltyI18n("जुर्माना");
		circulationI18n3.setReturnDateI18n("रिटर्न डेट");
		circulationI18n3.setReturnStatusI18n("रिटर्न स्टेटस");
		circulationI18n3.setToReturnI18n("वापसी करने के लिए");
		circulationI18n3.setWriterI18n("लेखक");
		circulationI18n3.setLangI18n("HN");
		circulationI18n3.setAddButtonI18n("बनाएं");
		circulationI18n3.setAddTitleI18n("परिसंचरण बनाएँ");
		circulationI18n3.setAllTitleI18n("बुक सर्कुलेशन");
		circulationI18n3.setCloseButtonI18n("बंद करें");
		circulationI18n3.setEditButtonI18n("संपादित करें");
		circulationI18n3.setEditTitleI18n("परिसंचरण संपादित करें");
		circulationI18n3.setSendEmailI18n("भेजना");
		circulationI18n3.setContactMemberTitleI18n("सदस्य संपर्क");
		circulationI18n3.setMessageI18n("संदेश");
		circulationnRepositoryI18n.save(circulationI18n3);

		circulationI18n4.setBookNameI18n("বইয়ের নাম");
		circulationI18n4.setIssueDateI18n("ইস্যু তারিখ");
		circulationI18n4.setLastDateI18n("শেষ তারিখ");
		circulationI18n4.setMemberNameI18n("সদস্যের নাম");
		circulationI18n4.setPenaltyI18n("পেনাল্টি");
		circulationI18n4.setReturnDateI18n("রিটার্ন ডেট");
		circulationI18n4.setReturnStatusI18n("রিটার্ন স্ট্যাটাস");
		circulationI18n4.setToReturnI18n("ফিরতে");
		circulationI18n4.setWriterI18n("লেখক");
		circulationI18n4.setLangI18n("BN");
		circulationI18n4.setAddButtonI18n("তৈরি করুন");
		circulationI18n4.setAddTitleI18n("সঞ্চালন তৈরি করুন");
		circulationI18n4.setAllTitleI18n("বুক সার্কুলেশন");
		circulationI18n4.setCloseButtonI18n("বন্ধ");
		circulationI18n4.setEditButtonI18n("সম্পাদনা");
		circulationI18n4.setEditTitleI18n("পরিচলন সম্পাদনা করুন");
		circulationI18n4.setSendEmailI18n("পাঠান");
		circulationI18n4.setContactMemberTitleI18n("সদস্য যোগাযোগ");
		circulationI18n4.setMessageI18n("বার্তা");
		circulationnRepositoryI18n.save(circulationI18n4);
	}

}
