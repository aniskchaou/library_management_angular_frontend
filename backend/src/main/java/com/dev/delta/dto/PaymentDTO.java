package com.dev.delta.dto;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.repositories.PaymentRepository;
import com.dev.delta.repositoriesi18n.PaymentI18nRepository;

@Service
public class PaymentDTO implements DTO {

	@Autowired
	PaymentRepository paymentRepository;

	@Autowired
	PaymentI18nRepository paymentI18nRepository;

	@Override
	public void populate() {
		// TODO Auto-generated method stub
		//payment.setAmount(100);

		//payment.setMemberName(member);
		//payment.setNote("");
		//payment.setDate(new Date().toString());
		//paymentRepository.save(payment);

		paymentI18n.setAmountI18n("Số tiền");
		paymentI18n.setDateI18n("Ngày");
		paymentI18n.setNameI18n("Tên");
		paymentI18n.setNoteI18n("Ghi chú");
		paymentI18n.setAddButtonI18n("Tạo mới");
		paymentI18n.setAddTitleI18n("Tạo thanh toán");
		paymentI18n.setAllTitleI18n("Danh sách thanh toán");
		paymentI18n.setCloseButtonI18n("Đóng");
		paymentI18n.setLangI18n("EN");
		paymentI18nRepository.save(paymentI18n);

		paymentI18n.setAmountI18n("Số tiền");
		paymentI18n.setDateI18n("Ngày");
		paymentI18n.setNameI18n("Tên");
		paymentI18n.setNoteI18n("Ghi chú");
		paymentI18n.setAddButtonI18n("Tạo mới");
		paymentI18n.setAddTitleI18n("Tạo thanh toán");
		paymentI18n.setAllTitleI18n("Danh sách thanh toán");
		paymentI18n.setCloseButtonI18n("Đóng");
		paymentI18n.setLangI18n("EN");
		paymentI18nRepository.save(paymentI18n);

		paymentI18n2.setAmountI18n("Số tiền");
		paymentI18n2.setDateI18n("Ngày");
		paymentI18n2.setNameI18n("Tên");
		paymentI18n2.setNoteI18n("Ghi chú");
		paymentI18n2.setAddButtonI18n("Tạo mới");
		paymentI18n2.setAddTitleI18n("Tạo thanh toán");
		paymentI18n2.setAllTitleI18n("Danh sách thanh toán");
		paymentI18n2.setCloseButtonI18n("Đóng");
		paymentI18n2.setLangI18n("AR");
		paymentI18nRepository.save(paymentI18n2);

		paymentI18n3.setAmountI18n("Số tiền");
		paymentI18n3.setDateI18n("Ngày");
		paymentI18n3.setNameI18n("Tên");
		paymentI18n3.setNoteI18n("Ghi chú");
		paymentI18n3.setAddButtonI18n("Tạo mới");
		paymentI18n3.setAddTitleI18n("Tạo thanh toán");
		paymentI18n3.setAllTitleI18n("Danh sách thanh toán");
		paymentI18n3.setCloseButtonI18n("Đóng");
		paymentI18n3.setLangI18n("BN");
		paymentI18nRepository.save(paymentI18n3);

		paymentI18n4.setAmountI18n("Số tiền");
		paymentI18n4.setDateI18n("Ngày");
		paymentI18n4.setNameI18n("Tên");
		paymentI18n4.setNoteI18n("Ghi chú");
		paymentI18n4.setAddButtonI18n("Tạo mới");
		paymentI18n4.setAddTitleI18n("Tạo thanh toán");
		paymentI18n4.setAllTitleI18n("Danh sách thanh toán");
		paymentI18n4.setCloseButtonI18n("Đóng");
		paymentI18n4.setLangI18n("HN");
		paymentI18nRepository.save(paymentI18n4);

	}

}
