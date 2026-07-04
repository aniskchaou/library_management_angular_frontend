package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MemberType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String categoryCode;
	private String description;
	private Integer upperAgeLimit;
	private Double enrollmentFee;
	private Integer enrollmentPeriod; // in months
	private Double holdFee;
	private String categoryType;
	private Integer minPasswordLength;
	private Boolean requireStrongPassword;
	private Boolean blockExpiredPatrons;

	public MemberType() {
		// TODO Auto-generated constructor stub
	}

	public MemberType(String member_type_name) {
		super();
		this.name = member_type_name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getUpperAgeLimit() {
		return upperAgeLimit;
	}

	public void setUpperAgeLimit(Integer upperAgeLimit) {
		this.upperAgeLimit = upperAgeLimit;
	}

	public Double getEnrollmentFee() {
		return enrollmentFee;
	}

	public void setEnrollmentFee(Double enrollmentFee) {
		this.enrollmentFee = enrollmentFee;
	}

	public Integer getEnrollmentPeriod() {
		return enrollmentPeriod;
	}

	public void setEnrollmentPeriod(Integer enrollmentPeriod) {
		this.enrollmentPeriod = enrollmentPeriod;
	}

	public Double getHoldFee() {
		return holdFee;
	}

	public void setHoldFee(Double holdFee) {
		this.holdFee = holdFee;
	}

	public String getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(String categoryType) {
		this.categoryType = categoryType;
	}

	public Integer getMinPasswordLength() {
		return minPasswordLength;
	}

	public void setMinPasswordLength(Integer minPasswordLength) {
		this.minPasswordLength = minPasswordLength;
	}

	public Boolean getRequireStrongPassword() {
		return requireStrongPassword;
	}

	public void setRequireStrongPassword(Boolean requireStrongPassword) {
		this.requireStrongPassword = requireStrongPassword;
	}

	public Boolean getBlockExpiredPatrons() {
		return blockExpiredPatrons;
	}

	public void setBlockExpiredPatrons(Boolean blockExpiredPatrons) {
		this.blockExpiredPatrons = blockExpiredPatrons;
	}
}
