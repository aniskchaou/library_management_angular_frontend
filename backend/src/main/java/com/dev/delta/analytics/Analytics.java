package com.dev.delta.analytics;

public class Analytics {
	long memberNumber;
	long categoryNumber;
	long bookNumber;
	long issueBookNumber;

	public Analytics() {
	
	}

	public Analytics(long memberNumber, long categoryNumber, long bookNumber, long issueBookNumber) {
		super();
		this.memberNumber = memberNumber;
		this.categoryNumber = categoryNumber;
		this.bookNumber = bookNumber;
		this.issueBookNumber = issueBookNumber;
	}

	public long getMemberNumber() {
		return memberNumber;
	}

	public void setMemberNumber(long memberNumber) {
		this.memberNumber = memberNumber;
	}

	public long getCategoryNumber() {
		return categoryNumber;
	}

	public void setCategoryNumber(long categoryNumber) {
		this.categoryNumber = categoryNumber;
	}

	public long getBookNumber() {
		return bookNumber;
	}

	public void setBookNumber(long bookNumber) {
		this.bookNumber = bookNumber;
	}

	public long getIssueBookNumber() {
		return issueBookNumber;
	}

	public void setIssueBookNumber(long issueBookNumber) {
		this.issueBookNumber = issueBookNumber;
	}

}
