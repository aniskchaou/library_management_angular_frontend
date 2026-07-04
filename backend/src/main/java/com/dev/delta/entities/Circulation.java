package com.dev.delta.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Circulation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member memberName;
	@ManyToOne
	@JoinColumn(name = "book_id")
	private CatalogItem catalogItemName;
	//private Writer writer;
	private String issueDate;
	private String lastDate;
	private LocalDate toReturn;
	private String returnDate;
	private int penalty;
	@ManyToOne
	@JoinColumn(name = "return_status")
	private CirculationStatus returnStatus;

	public Circulation() {
		// TODO Auto-generated constructor stub
	}

	public Circulation(Long id, Member memberName, CatalogItem catalogItemName,  String issueDate, String lastDate,
                       LocalDate toReturn, String returnDate, int penalty, CirculationStatus returnStatus) {
		super();
		this.id = id;
		this.memberName = memberName;
		this.catalogItemName = catalogItemName;
		//this.writer = writer;
		this.issueDate = issueDate;
		this.lastDate = lastDate;
		this.toReturn = toReturn;
		this.returnDate = returnDate;
		this.penalty = penalty;
		this.returnStatus = returnStatus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Member getMemberName() {
		return memberName;
	}

	public void setMemberName(Member memberName) {
		this.memberName = memberName;
	}

	public CatalogItem getCatalogItemName() {
		return catalogItemName;
	}

	public void setcCatalogItemName(CatalogItem catalogItemName) {
		this.catalogItemName = catalogItemName;
	}

	/*public Writer getWriter() {
		return writer;
	}

	public void setWriter(Writer writer) {
		this.writer = writer;
	}
*/
	public String getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}

	public String getLastDate() {
		return lastDate;
	}

	public void setLastDate(String lastDate) {
		this.lastDate = lastDate;
	}

	public LocalDate getToReturn() {
		return toReturn;
	}

	public void setToReturn(java.time.LocalDate toReturn) {
		this.toReturn = toReturn;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public int getPenalty() {
		return penalty;
	}

	public void setPenalty(int penalty) {
		this.penalty = penalty;
	}

	public CirculationStatus getReturnStatus() {
		return returnStatus;
	}

	public void setReturnStatus(CirculationStatus returnStatus) {
		this.returnStatus = returnStatus;
	}

}
