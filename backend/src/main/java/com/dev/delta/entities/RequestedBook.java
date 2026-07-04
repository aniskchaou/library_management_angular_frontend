package com.dev.delta.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class RequestedBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "book_id")
	private CatalogItem catalogItem;
	@ManyToOne
	@JoinColumn(name = "writer_id")
	private Writer writer;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category ctagory;
	private String edition;
	private String note;
	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	private String status;

	// ── Reservation queue fields ──────────────────────────────────────
	private Integer queuePosition;      // Position in hold queue (1 = first)
	private LocalDate reservationDate;  // When reservation was created
	private LocalDate expiryDate;       // When reservation expires
	private boolean notified;           // Whether member was notified of availability
	private LocalDate notifiedDate;     // When notification was sent

	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	public RequestedBook() {}

	public RequestedBook(CatalogItem catalogItem, Writer writer, Category ctagory, String edition, String note, Member member, String status) {
		this.catalogItem = catalogItem;
		this.writer = writer;
		this.ctagory = ctagory;
		this.edition = edition;
		this.note = note;
		this.member = member;
		this.status = status;
	}

	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }

	public CatalogItem getCatalogItem() { return catalogItem; }
	public void setCatalogItem(CatalogItem catalogItem) { this.catalogItem = catalogItem; }

	public Writer getWriter() { return writer; }
	public void setWriter(Writer writer) { this.writer = writer; }

	public Category getCtagory() { return ctagory; }
	public void setCtagory(Category ctagory) { this.ctagory = ctagory; }

	public String getEdition() { return edition; }
	public void setEdition(String edition) { this.edition = edition; }

	public String getNote() { return note; }
	public void setNote(String note) { this.note = note; }

	public Member getMember() { return member; }
	public void setMember(Member member) { this.member = member; }

	public Integer getQueuePosition() { return queuePosition; }
	public void setQueuePosition(Integer queuePosition) { this.queuePosition = queuePosition; }

	public LocalDate getReservationDate() { return reservationDate; }
	public void setReservationDate(LocalDate reservationDate) { this.reservationDate = reservationDate; }

	public LocalDate getExpiryDate() { return expiryDate; }
	public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

	public boolean isNotified() { return notified; }
	public void setNotified(boolean notified) { this.notified = notified; }

	public LocalDate getNotifiedDate() { return notifiedDate; }
	public void setNotifiedDate(LocalDate notifiedDate) { this.notifiedDate = notifiedDate; }
}

