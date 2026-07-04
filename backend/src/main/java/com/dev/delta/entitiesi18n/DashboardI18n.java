package com.dev.delta.entitiesi18n;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DashboardI18n {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String titleI18n;
	String booksNumberI18n;
	String categoriesNumberI18n;
	String membersNumberI18n;
	String issueBookNumberI18n;
	String booksI18n;
	String categoriesI18n;
	String expensesI18n;
	String incomesI18n;
	String langI18n;

	public String getExpensesI18n() {
		return expensesI18n;
	}

	public void setExpensesI18n(String expensesI18n) {
		this.expensesI18n = expensesI18n;
	}

	public String getIncomesI18n() {
		return incomesI18n;
	}

	public void setIncomesI18n(String incomesI18n) {
		this.incomesI18n = incomesI18n;
	}

	public DashboardI18n() {
		// TODO Auto-generated constructor stub
	}

	public String getTitleI18n() {
		return titleI18n;
	}

	public void setTitleI18n(String titleI18n) {
		this.titleI18n = titleI18n;
	}

	public String getLangI18n() {
		return langI18n;
	}

	public void setLangI18n(String langI18n) {
		this.langI18n = langI18n;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBooksNumberI18n() {
		return booksNumberI18n;
	}

	public void setBooksNumberI18n(String booksNumberI18n) {
		this.booksNumberI18n = booksNumberI18n;
	}

	public String getCategoriesNumberI18n() {
		return categoriesNumberI18n;
	}

	public void setCategoriesNumberI18n(String categoriesNumberI18n) {
		this.categoriesNumberI18n = categoriesNumberI18n;
	}

	public String getMembersNumberI18n() {
		return membersNumberI18n;
	}

	public void setMembersNumberI18n(String membersNumberI18n) {
		this.membersNumberI18n = membersNumberI18n;
	}

	public String getIssueBookNumberI18n() {
		return issueBookNumberI18n;
	}

	public void setIssueBookNumberI18n(String issueBookNumberI18n) {
		this.issueBookNumberI18n = issueBookNumberI18n;
	}

	public String getBooksI18n() {
		return booksI18n;
	}

	public void setBooksI18n(String booksI18n) {
		this.booksI18n = booksI18n;
	}

	public String getCategoriesI18n() {
		return categoriesI18n;
	}

	public void setCategoriesI18n(String categoriesI18n) {
		this.categoriesI18n = categoriesI18n;
	}

}
