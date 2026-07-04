package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CirculationI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String memberNameI18n;
	String bookNameI18n;
	String writerI18n;
	String issueDateI18n;
	String lastDateI18n;
	String toReturnI18n;
	String returnDateI18n;
	String penaltyI18n;
	String returnStatusI18n;
	String allTitleI18n;
	String editTitleI18n;
	String addTitleI18n;
	String addButtonI18n;
	String editButtonI18n;
	String resetButtonI18n;
	String closeButtonI18n;
	String langI18n;
	String contactMemberTitleI18n;
	String messageI18n;
	String sendEmailI18n;

	public CirculationI18n() {
		// TODO Auto-generated constructor stub
	}

	public String getContactMemberTitleI18n() {
		return contactMemberTitleI18n;
	}

	public void setContactMemberTitleI18n(String contactMemberTitleI18n) {
		this.contactMemberTitleI18n = contactMemberTitleI18n;
	}

	public String getMessageI18n() {
		return messageI18n;
	}

	public void setMessageI18n(String messageI18n) {
		this.messageI18n = messageI18n;
	}

	public String getSendEmailI18n() {
		return sendEmailI18n;
	}

	public void setSendEmailI18n(String sendEmailI18n) {
		this.sendEmailI18n = sendEmailI18n;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMemberNameI18n() {
		return memberNameI18n;
	}

	public void setMemberNameI18n(String memberNameI18n) {
		this.memberNameI18n = memberNameI18n;
	}

	public String getBookNameI18n() {
		return bookNameI18n;
	}

	public void setBookNameI18n(String bookNameI18n) {
		this.bookNameI18n = bookNameI18n;
	}

	public String getWriterI18n() {
		return writerI18n;
	}

	public void setWriterI18n(String writerI18n) {
		this.writerI18n = writerI18n;
	}

	public String getIssueDateI18n() {
		return issueDateI18n;
	}

	public void setIssueDateI18n(String issueDateI18n) {
		this.issueDateI18n = issueDateI18n;
	}

	public String getLastDateI18n() {
		return lastDateI18n;
	}

	public void setLastDateI18n(String lastDateI18n) {
		this.lastDateI18n = lastDateI18n;
	}

	public String getToReturnI18n() {
		return toReturnI18n;
	}

	public void setToReturnI18n(String toReturnI18n) {
		this.toReturnI18n = toReturnI18n;
	}

	public String getReturnDateI18n() {
		return returnDateI18n;
	}

	public void setReturnDateI18n(String returnDateI18n) {
		this.returnDateI18n = returnDateI18n;
	}

	public String getPenaltyI18n() {
		return penaltyI18n;
	}

	public void setPenaltyI18n(String penaltyI18n) {
		this.penaltyI18n = penaltyI18n;
	}

	public String getReturnStatusI18n() {
		return returnStatusI18n;
	}

	public void setReturnStatusI18n(String returnStatusI18n) {
		this.returnStatusI18n = returnStatusI18n;
	}

	public String getAllTitleI18n() {
		return allTitleI18n;
	}

	public void setAllTitleI18n(String allTitleI18n) {
		this.allTitleI18n = allTitleI18n;
	}

	public String getEditTitleI18n() {
		return editTitleI18n;
	}

	public void setEditTitleI18n(String editTitleI18n) {
		this.editTitleI18n = editTitleI18n;
	}

	public String getAddTitleI18n() {
		return addTitleI18n;
	}

	public void setAddTitleI18n(String addTitleI18n) {
		this.addTitleI18n = addTitleI18n;
	}

	public String getAddButtonI18n() {
		return addButtonI18n;
	}

	public void setAddButtonI18n(String addButtonI18n) {
		this.addButtonI18n = addButtonI18n;
	}

	public String getEditButtonI18n() {
		return editButtonI18n;
	}

	public void setEditButtonI18n(String editButtonI18n) {
		this.editButtonI18n = editButtonI18n;
	}

	public String getResetButtonI18n() {
		return resetButtonI18n;
	}

	public void setResetButtonI18n(String resetButtonI18n) {
		this.resetButtonI18n = resetButtonI18n;
	}

	public String getCloseButtonI18n() {
		return closeButtonI18n;
	}

	public void setCloseButtonI18n(String closeButtonI18n) {
		this.closeButtonI18n = closeButtonI18n;
	}

	public String getLangI18n() {
		return langI18n;
	}

	public void setLangI18n(String langI18n) {
		this.langI18n = langI18n;
	}

}
