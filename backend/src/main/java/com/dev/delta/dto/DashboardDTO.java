package com.dev.delta.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.DashboardRepository;

/**
 * 
 * @author Admin
 *
 */
@Service
public class DashboardDTO implements DTO {

	@Autowired
	DashboardRepository dashboardRepository;

	@Override
	public void populate() {
		dashboardI18n.setBooksI18n("Sách");
		dashboardI18n.setBooksNumberI18n("Sách");
		dashboardI18n.setCategoriesI18n("Thể loại");
		dashboardI18n.setCategoriesNumberI18n("Thể loại");
		dashboardI18n.setIssueBookNumberI18n("Sách đã phát hành");
		dashboardI18n.setMembersNumberI18n("Thành viên");
		dashboardI18n.setLangI18n("EN");
		dashboardI18n.setTitleI18n("Bảng điều khiển");
		dashboardI18n.setExpensesI18n("Chi phí");
		dashboardI18n.setIncomesI18n("Thu nhập");
		dashboardRepository.save(dashboardI18n);

		dashboardI18n3.setBooksI18n("বই");
		dashboardI18n3.setBooksNumberI18n("বই");
		dashboardI18n3.setCategoriesI18n("বিভাগগুলি");
		dashboardI18n3.setCategoriesNumberI18n("বিভাগগুলি");
		dashboardI18n3.setIssueBookNumberI18n("ইস্যু বই");
		dashboardI18n3.setMembersNumberI18n("সদস্য");
		dashboardI18n3.setLangI18n("BN");
		dashboardI18n3.setTitleI18n("ড্যাশবোর্ড");
		dashboardI18n3.setExpensesI18n("ব্যয়");
		dashboardI18n3.setIncomesI18n("আয়");
		dashboardRepository.save(dashboardI18n);

		dashboardI18n4.setBooksI18n("पुस्तकें");
		dashboardI18n4.setBooksNumberI18n("पुस्तकें");
		dashboardI18n4.setCategoriesI18n("श्रेणियां");
		dashboardI18n4.setCategoriesNumberI18n("श्रेणियां");
		dashboardI18n4.setIssueBookNumberI18n("समस्या पुस्तकें");
		dashboardI18n4.setMembersNumberI18n("सदस्य");
		dashboardI18n4.setLangI18n("HN");
		dashboardI18n4.setTitleI18n("डैशबोर्ड");
		dashboardI18n4.setExpensesI18n("व्यय");
		dashboardI18n4.setIncomesI18n("आय");
		dashboardRepository.save(dashboardI18n4);

		dashboardI18n2.setBooksI18n("الكتب");
		dashboardI18n2.setBooksNumberI18n("الكتب");
		dashboardI18n2.setCategoriesI18n("الفئات");
		dashboardI18n2.setCategoriesNumberI18n("الفئات");
		dashboardI18n2.setIssueBookNumberI18n("إصدار الكتب");
		dashboardI18n2.setMembersNumberI18n("الأعضاء");
		dashboardI18n2.setLangI18n("AR");
		dashboardI18n2.setTitleI18n("لوحة المعلومات");
		dashboardI18n2.setExpensesI18n("النفقات");
		dashboardI18n2.setIncomesI18n("الدخل");
		dashboardRepository.save(dashboardI18n2);
	}

}
