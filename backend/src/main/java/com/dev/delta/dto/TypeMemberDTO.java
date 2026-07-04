package com.dev.delta.dto;

import com.dev.delta.entities.MemberType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.TypeMemberRepository;
import com.dev.delta.repositoriesi18n.TypeMemberI18nRepository;

@Service
public class TypeMemberDTO implements DTO {

	@Autowired
	TypeMemberRepository typeMemberRepository;

	@Autowired
	TypeMemberI18nRepository typeMemberI18nRepository;

	@Override
	public void populate() {
		MEMBER_TYPE.setName("Normal");
		MEMBER_TYPE.setName("Normal");
		MEMBER_TYPE.setCategoryCode("NM01");
		MEMBER_TYPE.setDescription("Standard membership with no special privileges.");
		MEMBER_TYPE.setUpperAgeLimit(65);
		MEMBER_TYPE.setEnrollmentFee(50.0);
		MEMBER_TYPE.setEnrollmentPeriod(12); // 12 months
		MEMBER_TYPE.setHoldFee(5.0);
		MEMBER_TYPE.setCategoryType("Standard");
		MEMBER_TYPE.setMinPasswordLength(8);
		MEMBER_TYPE.setRequireStrongPassword(true);
		MEMBER_TYPE.setBlockExpiredPatrons(true);
		typeMemberRepository.save(MEMBER_TYPE);

//		MemberType normalMember = new MemberType();
//		normalMember.setName("Normal");
//		normalMember.setCategoryCode("NM01");
//		normalMember.setDescription("Standard membership with no special privileges.");
//		normalMember.setUpperAgeLimit(65);
//		normalMember.setEnrollmentFee(50.0);
//		normalMember.setEnrollmentPeriod(12); // 12 months
//		normalMember.setHoldFee(5.0);
//		normalMember.setCategoryType("Standard");
//		normalMember.setMinPasswordLength(8);
//		normalMember.setRequireStrongPassword(true);
//		normalMember.setBlockExpiredPatrons(true);
//		typeMemberRepository.save(normalMember);

		MemberType seniorMember = new MemberType();
		seniorMember.setName("Senior");
		seniorMember.setCategoryCode("SN01");
		seniorMember.setDescription("Special membership for patrons above 65 years old.");
		seniorMember.setUpperAgeLimit(120);
		seniorMember.setEnrollmentFee(30.0);
		seniorMember.setEnrollmentPeriod(12);
		seniorMember.setHoldFee(2.5);
		seniorMember.setCategoryType("Discounted");
		seniorMember.setMinPasswordLength(8);
		seniorMember.setRequireStrongPassword(false);
		seniorMember.setBlockExpiredPatrons(true);
		typeMemberRepository.save(seniorMember);

		MemberType studentMember = new MemberType();
		studentMember.setName("Student");
		studentMember.setCategoryCode("ST01");
		studentMember.setDescription("Membership for students with discounts.");
		studentMember.setUpperAgeLimit(25);
		studentMember.setEnrollmentFee(25.0);
		studentMember.setEnrollmentPeriod(6);
		studentMember.setHoldFee(1.0);
		studentMember.setCategoryType("Discounted");
		studentMember.setMinPasswordLength(6);
		studentMember.setRequireStrongPassword(false);
		studentMember.setBlockExpiredPatrons(false);
		typeMemberRepository.save(studentMember);

		MemberType premiumMember = new MemberType();
		premiumMember.setName("Premium");
		premiumMember.setCategoryCode("PR01");
		premiumMember.setDescription("Premium membership with added benefits.");
		premiumMember.setUpperAgeLimit(120);
		premiumMember.setEnrollmentFee(100.0);
		premiumMember.setEnrollmentPeriod(24);
		premiumMember.setHoldFee(0.0);
		premiumMember.setCategoryType("Premium");
		premiumMember.setMinPasswordLength(10);
		premiumMember.setRequireStrongPassword(true);
		premiumMember.setBlockExpiredPatrons(true);
		typeMemberRepository.save(premiumMember);

		MemberType juniorMember = new MemberType();
		juniorMember.setName("Junior");
		juniorMember.setCategoryCode("JR01");
		juniorMember.setDescription("Membership for young patrons.");
		juniorMember.setUpperAgeLimit(18);
		juniorMember.setEnrollmentFee(15.0);
		juniorMember.setEnrollmentPeriod(12);
		juniorMember.setHoldFee(1.0);
		juniorMember.setCategoryType("Junior");
		juniorMember.setMinPasswordLength(6);
		juniorMember.setRequireStrongPassword(false);
		juniorMember.setBlockExpiredPatrons(false);
		typeMemberRepository.save(juniorMember);

		typeMemberI18n.setMember_type_nameI18n("Type Member");
		typeMemberI18n.setLangI18n("EN");
		typeMemberI18n.setAddButtonI18n("Create");
		typeMemberI18n.setAddTitleI18n("Create Type Member");
		typeMemberI18n.setAllTitleI18n("Type Members");
		typeMemberI18n.setCloseButtonI18n("Close");
		typeMemberI18n.setEditButtonI18n("Edit");
		typeMemberI18n.setEditTitleI18n("Edit Type Member");
		typeMemberI18nRepository.save(typeMemberI18n);

		typeMemberI18n3.setMember_type_nameI18n("টাইপ মেম্বার");
		typeMemberI18n3.setLangI18n("BN");
		typeMemberI18n3.setAddButtonI18n("তৈরি করুন");
		typeMemberI18n3.setAddTitleI18n("প্রকার সদস্য তৈরি করুন");
		typeMemberI18n3.setAllTitleI18n("টাইপ সদস্য");
		typeMemberI18n3.setCloseButtonI18n("বন্ধ");
		typeMemberI18n3.setEditButtonI18n("সম্পাদনা");
		typeMemberI18n3.setEditTitleI18n("সম্পাদনা প্রকার সদস্য");
		typeMemberI18nRepository.save(typeMemberI18n3);

		typeMemberI18n4.setMember_type_nameI18n("सदस्य टाइप करें");
		typeMemberI18n4.setLangI18n("HN");
		typeMemberI18n4.setAddButtonI18n("बनाएं");
		typeMemberI18n4.setAddTitleI18n("प्रकार सदस्य बनाएं");
		typeMemberI18n4.setAllTitleI18n("सदस्य टाइप करें");
		typeMemberI18n4.setCloseButtonI18n("बंद करें");
		typeMemberI18n4.setEditButtonI18n("संपादित करें");
		typeMemberI18n4.setEditTitleI18n("टाइप सदस्य संपादित करें");
		typeMemberI18nRepository.save(typeMemberI18n4);

		typeMemberI18n2.setMember_type_nameI18n("نوع العضو");
		typeMemberI18n2.setLangI18n("AR");
		typeMemberI18n2.setAddButtonI18n("إنشاء");
		typeMemberI18n2.setAddTitleI18n("إنشاء نوع عضو");
		typeMemberI18n2.setAllTitleI18n("أعضاء النوع");
		typeMemberI18n2.setCloseButtonI18n("إغلاق");
		typeMemberI18n2.setEditButtonI18n("تحرير");
		typeMemberI18n2.setEditTitleI18n("تحرير نوع العضو");
		typeMemberI18nRepository.save(typeMemberI18n2);
	}

}
