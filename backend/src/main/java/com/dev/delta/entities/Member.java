package com.dev.delta.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String surname;           // Corresponds to the surname field
	private String firstname;        // Corresponds to the first name field
	private String dob;              // Date of birth
	private String age;              // Age, can be calculated from dob
	private String gender;           // Gender selection
	private String street_number;     // Street number
	private String address;          // Address
	private String city;             // City
	private String state;            // State
	private String zip;              // ZIP/Postal Code
	private String country;          // Country
	private String primary_phone;     // Primary phone number
	private String secondary_phone;   // Secondary phone number
	private String primary_email;     // Primary email
	private String secondary_email;   // Secondary email
	private String headOfDepartment; // Head of department
	private String userType;         // User type (e.g., regular member)
	private String typeId;           // Type ID for member categorization
	private String status;// Status of the member (active/inactive)
    private boolean verified;
	private boolean blocked;
	private boolean expired;
	private LocalDate createdDate;

	public Member() {
		// TODO Auto-generated constructor stub
	}

	public Member(String surname, String firstname, String dob, String age, String gender, String street_number, String address, String city, String state, String zip, String country, String primary_phone, String secondary_phone, String primary_email, String secondary_email, String headOfDepartment, String userType, String typeId, String status) {
		this.surname = surname;
		this.firstname = firstname;
		this.dob = dob;
		this.age = age;
		this.gender = gender;
		this.street_number = street_number;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.country = country;
		this.primary_phone = primary_phone;
		this.secondary_phone = secondary_phone;
		this.primary_email = primary_email;
		this.secondary_email = secondary_email;
		this.headOfDepartment = headOfDepartment;
		this.userType = userType;
		this.typeId = typeId;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getStreet_number() {
		return street_number;
	}

	public void setStreet_number(String street_number) {
		this.street_number = street_number;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPrimary_phone() {
		return primary_phone;
	}

	public void setPrimary_phone(String primary_phone) {
		this.primary_phone = primary_phone;
	}

	public String getSecondary_phone() {
		return secondary_phone;
	}

	public void setSecondary_phone(String secondary_phone) {
		this.secondary_phone = secondary_phone;
	}

	public String getPrimary_email() {
		return primary_email;
	}

	public void setPrimary_email(String primary_email) {
		this.primary_email = primary_email;
	}

	public String getSecondary_email() {
		return secondary_email;
	}

	public void setSecondary_email(String secondary_email) {
		this.secondary_email = secondary_email;
	}

	public String getHeadOfDepartment() {
		return headOfDepartment;
	}

	public void setHeadOfDepartment(String headOfDepartment) {
		this.headOfDepartment = headOfDepartment;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setExpired(boolean expired) {
		this.expired = expired;
	}

	public LocalDate getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDate createdDate) {
		this.createdDate = createdDate;
	}
}
