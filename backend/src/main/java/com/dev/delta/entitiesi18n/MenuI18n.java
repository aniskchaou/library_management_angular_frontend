package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MenuI18n {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String dashboardI18n;
	String booksMenuI18n;
	String categoriesI18n;
	String booksI18n;
	String requesredBooksI18n;
	String ArchivesI18n;
	String membersI18n;
	String membersMenuI18n;
	String typeMembersI18n;
	String circulationsI18n;
	String circulationsMenuI18n;
	String circulationStatusI18n;
	String publishersI18n;
	String weitersI18n;
	String settingsI18n;
	String logOutI18n;
	String archivedBookI18n;
	String destroyedBookI18n;
	String calendarI18n;
	String expenseI18n;
	String account18n;
	String income18n;
	String membershipI18n;
	String paymentI18n;
	String reportI18n;
	String bookReportI18n;
	String memberReportI18n;
	String circulationI18n;
	String circulationReportI18n;
	String analyticsI18n;
	String bookAnalayticsI18n;
	String accountI18n;
	String emailSettingsI18n;
	String generalSettingsI18n;
	String langI18n;
	String accountAnalyticsI18n;

	public String getAccountAnalyticsI18n() {
		return accountAnalyticsI18n;
	}

	public void setAccountAnalyticsI18n(String accountAnalyticsI18n) {
		this.accountAnalyticsI18n = accountAnalyticsI18n;
	}

	public Long getId() {
		return id;
	}

	public String getCirculationReportI18n() {
		return circulationReportI18n;
	}

	public void setCirculationReportI18n(String circulationReportI18n) {
		this.circulationReportI18n = circulationReportI18n;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDashboardI18n() {
		return dashboardI18n;
	}

	public void setDashboardI18n(String dashboardI18n) {
		this.dashboardI18n = dashboardI18n;
	}

	public String getBooksMenuI18n() {
		return booksMenuI18n;
	}

	public void setBooksMenuI18n(String booksMenuI18n) {
		this.booksMenuI18n = booksMenuI18n;
	}

	public String getCategoriesI18n() {
		return categoriesI18n;
	}

	public void setCategoriesI18n(String categoriesI18n) {
		this.categoriesI18n = categoriesI18n;
	}

	public String getBooksI18n() {
		return booksI18n;
	}

	public void setBooksI18n(String booksI18n) {
		this.booksI18n = booksI18n;
	}

	public String getRequesredBooksI18n() {
		return requesredBooksI18n;
	}

	public void setRequesredBooksI18n(String requesredBooksI18n) {
		this.requesredBooksI18n = requesredBooksI18n;
	}

	public String getArchivesI18n() {
		return ArchivesI18n;
	}

	public void setArchivesI18n(String archivesI18n) {
		ArchivesI18n = archivesI18n;
	}

	public String getMembersI18n() {
		return membersI18n;
	}

	public void setMembersI18n(String membersI18n) {
		this.membersI18n = membersI18n;
	}

	public String getMembersMenuI18n() {
		return membersMenuI18n;
	}

	public void setMembersMenuI18n(String membersMenuI18n) {
		this.membersMenuI18n = membersMenuI18n;
	}

	public String getTypeMembersI18n() {
		return typeMembersI18n;
	}

	public void setTypeMembersI18n(String typeMembersI18n) {
		this.typeMembersI18n = typeMembersI18n;
	}

	public String getCirculationsI18n() {
		return circulationsI18n;
	}

	public void setCirculationsI18n(String circulationsI18n) {
		this.circulationsI18n = circulationsI18n;
	}

	public String getCirculationsMenuI18n() {
		return circulationsMenuI18n;
	}

	public void setCirculationsMenuI18n(String circulationsMenuI18n) {
		this.circulationsMenuI18n = circulationsMenuI18n;
	}

	public String getCirculationStatusI18n() {
		return circulationStatusI18n;
	}

	public void setCirculationStatusI18n(String circulationStatusI18n) {
		this.circulationStatusI18n = circulationStatusI18n;
	}

	public String getPublishersI18n() {
		return publishersI18n;
	}

	public void setPublishersI18n(String publishersI18n) {
		this.publishersI18n = publishersI18n;
	}

	public String getWeitersI18n() {
		return weitersI18n;
	}

	public void setWeitersI18n(String weitersI18n) {
		this.weitersI18n = weitersI18n;
	}

	public String getSettingsI18n() {
		return settingsI18n;
	}

	public void setSettingsI18n(String settingsI18n) {
		this.settingsI18n = settingsI18n;
	}

	public String getLogOutI18n() {
		return logOutI18n;
	}

	public void setLogOutI18n(String logOutI18n) {
		this.logOutI18n = logOutI18n;
	}

	public String getLangI18n() {
		return langI18n;
	}

	public void setLangI18n(String langI18n) {
		this.langI18n = langI18n;
	}

	public String getArchivedBookI18n() {
		return archivedBookI18n;
	}

	public void setArchivedBookI18n(String archivedBookI18n) {
		this.archivedBookI18n = archivedBookI18n;
	}

	public String getDestroyedBookI18n() {
		return destroyedBookI18n;
	}

	public void setDestroyedBookI18n(String destroyedBookI18n) {
		this.destroyedBookI18n = destroyedBookI18n;
	}

	public String getCalendarI18n() {
		return calendarI18n;
	}

	public void setCalendarI18n(String calendarI18n) {
		this.calendarI18n = calendarI18n;
	}

	public String getExpenseI18n() {
		return expenseI18n;
	}

	public void setExpenseI18n(String expenseI18n) {
		this.expenseI18n = expenseI18n;
	}

	public String getAccount18n() {
		return account18n;
	}

	public void setAccount18n(String account18n) {
		this.account18n = account18n;
	}

	public String getIncome18n() {
		return income18n;
	}

	public void setIncome18n(String income18n) {
		this.income18n = income18n;
	}

	public String getMembershipI18n() {
		return membershipI18n;
	}

	public void setMembershipI18n(String membershipI18n) {
		this.membershipI18n = membershipI18n;
	}

	public String getPaymentI18n() {
		return paymentI18n;
	}

	public void setPaymentI18n(String paymentI18n) {
		this.paymentI18n = paymentI18n;
	}

	public String getReportI18n() {
		return reportI18n;
	}

	public void setReportI18n(String reportI18n) {
		this.reportI18n = reportI18n;
	}

	public String getBookReportI18n() {
		return bookReportI18n;
	}

	public void setBookReportI18n(String bookReportI18n) {
		this.bookReportI18n = bookReportI18n;
	}

	public String getMemberReportI18n() {
		return memberReportI18n;
	}

	public void setMemberReportI18n(String memberReportI18n) {
		this.memberReportI18n = memberReportI18n;
	}

	public String getCirculationI18n() {
		return circulationI18n;
	}

	public void setCirculationI18n(String circulationI18n) {
		this.circulationI18n = circulationI18n;
	}

	public String getAnalyticsI18n() {
		return analyticsI18n;
	}

	public void setAnalyticsI18n(String analyticsI18n) {
		this.analyticsI18n = analyticsI18n;
	}

	public String getBookAnalayticsI18n() {
		return bookAnalayticsI18n;
	}

	public void setBookAnalayticsI18n(String bookAnalayticsI18n) {
		this.bookAnalayticsI18n = bookAnalayticsI18n;
	}

	public String getAccountI18n() {
		return accountI18n;
	}

	public void setAccountI18n(String accountI18n) {
		this.accountI18n = accountI18n;
	}

	public String getEmailSettingsI18n() {
		return emailSettingsI18n;
	}

	public void setEmailSettingsI18n(String emailSettingsI18n) {
		this.emailSettingsI18n = emailSettingsI18n;
	}

	public String getGeneralSettingsI18n() {
		return generalSettingsI18n;
	}

	public void setGeneralSettingsI18n(String generalSettingsI18n) {
		this.generalSettingsI18n = generalSettingsI18n;
	}

}
