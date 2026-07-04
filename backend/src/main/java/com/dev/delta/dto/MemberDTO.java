package com.dev.delta.dto;

import com.dev.delta.entities.Member;
import com.dev.delta.entities.MemberType;
import com.dev.delta.repositories.TypeMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.MemberRepository;
import com.dev.delta.repositoriesi18n.MemberI18nRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

/**
 *
 * @author Admin
 *
 */
@Service
public class MemberDTO implements DTO {

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	MemberI18nRepository memberI18nRepository;

	@Autowired
	TypeMemberRepository typeMemberRepository;


	@Override
	public void populate() {


		for (int i = 0; i < 35; i++) {
			Member member6 = new Member();

			// Vietnamese names
			String[] vietnameseFirstNames = {
				"Anh", "Bình", "Chi", "Dũng", "Hà", "Hùng", "Lan", "Linh", "Minh", "Ngọc"
			};
			String[] vietnameseLastNames = {
				"Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng"
			};

			Random random = new Random();

			// Set Vietnamese names
			member6.setSurname(vietnameseLastNames[random.nextInt(vietnameseLastNames.length)]);
			member6.setFirstname(vietnameseFirstNames[random.nextInt(vietnameseFirstNames.length)]);

			// Set date of birth (you can modify this to generate random DOB)
			member6.setDob("1989-06-07");

			// Generate a random age between 18 and 65
			int randomAge = 18 + random.nextInt(48);
			member6.setAge(String.valueOf(randomAge));

			// Randomly set gender
			String[] genders = {"Nam", "Nữ"};
			boolean[] trueFalse = {true, false};
			String randomGender = genders[random.nextInt(genders.length)];
			boolean randomtrueFalse = trueFalse[random.nextInt(trueFalse.length)];
			member6.setGender(randomGender);
			member6.setVerified(randomtrueFalse);
			member6.setBlocked(randomtrueFalse);
			member6.setExpired(randomtrueFalse);

			// Set Vietnamese address details
			member6.setStreet_number(String.valueOf(random.nextInt(100) + 1)); // Random street number
			member6.setAddress("Số " + member6.getStreet_number() + ", Phường " + (random.nextInt(10) + 1));
			member6.setCity("Hà Nội");
			member6.setState("Hà Nội");
			member6.setZip("100000");
			member6.setCountry("Việt Nam");

			// Set contact details
			member6.setPrimary_phone("+84 " + (random.nextInt(900000000) + 100000000));
			member6.setSecondary_phone("+84 " + (random.nextInt(900000000) + 100000000));
			member6.setPrimary_email("member" + i + "@example.vn");
			member6.setSecondary_email("secondary" + i + "@example.vn");
			member6.setHeadOfDepartment("Trưởng phòng " + (random.nextInt(10) + 1));

			// Get the list of available member types from the repository
			List<MemberType> memberTypes = typeMemberRepository.findAll();

			if (!memberTypes.isEmpty()) {
				// Randomly select an index for the user type
				int randomIndex = random.nextInt(memberTypes.size());
				String randomMemberType = memberTypes.get(randomIndex).getName();
				member6.setUserType(randomMemberType);
				member6.setTypeId(randomMemberType); // Set Type ID to match user type or modify if needed
			} else {
				// Handle the case where there are no member types available
				member6.setUserType("Mặc định"); // Use a default type or handle this scenario as needed
				member6.setTypeId("Default");
			}


			member6.setStatus("Hoạt động"); // Member status

			memberRepository.save(member6);
		}






		member.setSurname(faker.name().lastName());
		member.setFirstname(faker.name().firstName()); // Assuming you want to set the first name as well
		member.setDob("1989-06-07".toString()); // Set date of birth
		member.setAge("Unknown"); // Set age (you might calculate this based on the DOB in a real scenario)
		member.setGender("Male"); // Example for gender
		member.setStreet_number(faker.address().buildingNumber()); // Street number
		member.setAddress(faker.address().fullAddress()); // Full address
		member.setCity(faker.address().city()); // City
		member.setState(faker.address().state()); // State
		member.setZip(faker.address().zipCode()); // ZIP/Postal code
		member.setCountry(faker.address().country()); // Country
		member.setPrimary_phone(faker.phoneNumber().cellPhone()); // Primary phone
		member.setSecondary_phone(faker.phoneNumber().cellPhone()); // Secondary phone (optional)
		member.setPrimary_email(faker.internet().emailAddress()); // Primary email
		member.setSecondary_email(faker.internet().emailAddress()); // Secondary email (optional)
		member.setHeadOfDepartment(faker.name().fullName()); // Example for head of department
		member.setUserType("Regular Member"); // User type (can be modified as per requirement)
		member.setTypeId("Regular"); // Type ID (modify if needed)
		member.setStatus("Active"); // Member status
		member.setCreatedDate(LocalDate.now());
		memberRepository.save(member);


		memberI18n.setAddressI18n("Địa chỉ");
		memberI18n.setEmailI18n("Email");
		memberI18n.setMobileI18n("Điện thoại");
		memberI18n.setNameI18n("Tên");
		memberI18n.setPasswordI18n("Mật khẩu");
		memberI18n.setStatusI18n("Trạng thái");
		memberI18n.setType_idI18n("Loại");
		memberI18n.setUser_typeI18n("Loại người dùng");
		memberI18n.setLangI18n("EN");
		memberI18n.setAddButtonI18n("Tạo mới");
		memberI18n.setAddTitleI18n("Tạo thành viên");
		memberI18n.setAllTitleI18n("Danh sách thành viên");
		memberI18n.setCloseButtonI18n("Đóng");
		memberI18n.setEditButtonI18n("Chỉnh sửa");
		memberI18n.setEditTitleI18n("Chỉnh sửa thành viên");
		memberI18nRepository.save(memberI18n);

		memberI18n2.setAddressI18n("العنوان");
		memberI18n2.setEmailI18n("البريد الإلكتروني");
		memberI18n2.setMobileI18n("الهاتف");
		memberI18n2.setNameI18n("الاسم");
		memberI18n2.setPasswordI18n("كلمة المرور");
		memberI18n2.setStatusI18n("الحالة");
		memberI18n2.setType_idI18n("نوع المستخدم");
		memberI18n2.setUser_typeI18n("نوع المستخدم");
		memberI18n2.setLangI18n("AR");
		memberI18n2.setAddButtonI18n("إنشاء");
		memberI18n2.setAddTitleI18n("إنشاء فئة");
		memberI18n2.setAllTitleI18n("الفئات");
		memberI18n2.setCloseButtonI18n("إغلاق");
		memberI18n2.setEditButtonI18n("تحرير");
		memberI18n2.setEditTitleI18n("تحرير الفئة");
		memberI18nRepository.save(memberI18n2);

		memberI18n3.setAddressI18n("पता");
		memberI18n3.setEmailI18n("ईमेल");
		memberI18n3.setMobileI18n("फोन");
		memberI18n3.setNameI18n("नाम");
		memberI18n3.setPasswordI18n("पासवर्ड");
		memberI18n3.setStatusI18n("स्थिति");
		memberI18n3.setType_idI18n("टाइप");
		memberI18n3.setUser_typeI18n("उपयोगकर्ता प्रकार");
		memberI18n3.setLangI18n("HN");
		memberI18n3.setAddButtonI18n("बनाएं");
		memberI18n3.setAddTitleI18n("सदस्य बनाएं");
		memberI18n3.setAllTitleI18n("सदस्य");
		memberI18n3.setCloseButtonI18n("बंद करें");
		memberI18n3.setEditButtonI18n("संपादित करें");
		memberI18n3.setEditTitleI18n("सदस्य संपादित करें");
		memberI18nRepository.save(memberI18n3);

		memberI18n4.setAddressI18n("ঠিকানা");
		memberI18n4.setEmailI18n("ইমেল");
		memberI18n4.setMobileI18n("ফোন");
		memberI18n4.setNameI18n("নাম");
		memberI18n4.setPasswordI18n("পাসওয়ার্ড");
		memberI18n4.setStatusI18n("স্থিতি");
		memberI18n4.setType_idI18n("টাইপ");
		memberI18n4.setUser_typeI18n("ব্যবহারকারীর ধরন");
		memberI18n4.setLangI18n("BN");
		memberI18n4.setAddButtonI18n("তৈরি করুন");
		memberI18n4.setAddTitleI18n("সদস্য তৈরি করুন");
		memberI18n4.setAllTitleI18n("সদস্য");
		memberI18n4.setCloseButtonI18n("বন্ধ");
		memberI18n4.setEditButtonI18n("সম্পাদনা");
		memberI18n4.setEditTitleI18n("সদস্য সম্পাদনা করুন");
		memberI18nRepository.save(memberI18n4);

	}

}
