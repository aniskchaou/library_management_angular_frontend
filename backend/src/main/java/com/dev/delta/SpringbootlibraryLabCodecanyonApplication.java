package com.dev.delta;

import com.dev.delta.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@ComponentScan({ "com.dev.delta.email", "com.dev.delta.swagger", "com.dev.delta.analytics", "com.dev.delta.security",
		"com.dev.delta.controllers", "com.dev.delta.controllersi18n", "com.dev.delta.services", "com.dev.delta.dto" }) // to
																														// scan
																														// repository
																														// files
@EntityScan({ "com.dev.delta.sms","com.dev.delta.email", "com.dev.delta.entities", "com.dev.delta.entitiesi18n" })
@EnableJpaRepositories({ "com.dev.delta.email", "com.dev.delta.repositories", "com.dev.delta.repositoriesi18n" })
@SpringBootApplication
public class SpringbootlibraryLabCodecanyonApplication implements CommandLineRunner {

	@Autowired
	ArchiveDTO archiveDTO;

	@Autowired
	BookDTO bookDTO;

	@Autowired
	CategoryDTO categoryDTO;

	@Autowired
	CirculationDTO circulationDTO;

	@Autowired
	CirculationStatusDTO circulationStatusDTO;

	@Autowired
	MemberDTO memberDTO;
	@Autowired
	PublisherDTO publisherDTO;
	@Autowired
	RequestedBookDTO requestedBookDTO;
	@Autowired
	TypeMemberDTO typeMemberDTO;
	@Autowired
	WriterDTO writerDTO;

	@Autowired
	SettingsDTO settingsDTO;

	@Autowired
	MenuDTO menuDTO;

	@Autowired
	SearchDTO searchDTO;

	@Autowired
	DashboardDTO dashboardDTO;

	@Autowired
	BookStatusDTO bookStatusDTO;

	@Autowired
	IncomeDTO incomeDTO;

	@Autowired
	ExpenseDTO expenseDTO;

	@Autowired
	PaymentDTO paymentDTO;

	@Autowired
	DepartmentDTO departmentDTO;

	@Autowired
	ShelfDTO shelfDTO;

	@Autowired
	RowDTO rowDTO;

	@Autowired
	QRCodeDTO qrCodeDTO;

	@Autowired
	BarCodeDTO barCodeDTO;
	@Autowired
	PhysicalDescriptionDTO physicalDescriptionDTO;
	@Autowired
	VendorDTO vendorDTO;

	@Autowired
	BudgetDTO budgetDTO;

	@Autowired
	FundDTO fundDTO;

	@Autowired
	NoticeTemplateDTO noticeTemplateDTO;

	@Autowired
	NoticeDTO noticeDTO;

	@Autowired
	ContractDTO contractDTO;

	@Autowired
	OrderDTO orderDTO;

	@Autowired
	InvoiceDTO invoiceDTO;

	@Autowired
	BasketDTO basketDTO;

	@Autowired
	PurchaseSuggestionDTO purchaseSuggestionDTO;

	@Autowired
	MediaTypeDTO mediaTypeDTO;

	@Autowired
	UserDTO userDTO;

	@Autowired
	NotificationDTO notificationDTO;

	public static void main(String[] args) {
		SpringApplication.run(SpringbootlibraryLabCodecanyonApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		mediaTypeDTO.populate();
		bookStatusDTO.populate();
		typeMemberDTO.populate();
		memberDTO.populate();
		circulationStatusDTO.populate();
		publisherDTO.populate();
		writerDTO.populate();

		categoryDTO.populate();



		settingsDTO.populate();
		menuDTO.populate();
		dashboardDTO.populate();
		searchDTO.populate();
		paymentDTO.populate();
		incomeDTO.populate();
		expenseDTO.populate();
		departmentDTO.populate();
		shelfDTO.populate();
		rowDTO.populate();
		barCodeDTO.populate();
		qrCodeDTO.populate();
		physicalDescriptionDTO.populate();
		vendorDTO.populate();
		budgetDTO.populate();
		fundDTO.populate();
		noticeTemplateDTO.populate();
		noticeDTO.populate();
		contractDTO.populate();

		orderDTO.populate();
		invoiceDTO.populate();
		basketDTO.populate();
		bookDTO.populate();
		circulationDTO.populate();
		requestedBookDTO.populate();
		purchaseSuggestionDTO.populate();
		userDTO.populate();
		notificationDTO.populate();
		//sendSimpleEmail("kchaouanis20@gmail.com","hello","hello world");
	}




}
