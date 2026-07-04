package com.dev.delta.email;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class EmailSetting {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String auth;
	String enableTLS;
	String host;
	String port;
	String email;
	String password;

	public EmailSetting() {
		// TODO Auto-generated constructor stub
	}

	public EmailSetting(String auth, String enableTLS, String host, String port, String email, String password) {
		super();
		this.auth = auth;
		this.enableTLS = enableTLS;
		this.host = host;
		this.port = port;
		this.email = email;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

	public String getEnableTLS() {
		return enableTLS;
	}

	public void setEnableTLS(String enableTLS) {
		this.enableTLS = enableTLS;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "EmailSetting [id=" + id + ", auth=" + auth + ", enableTLS=" + enableTLS + ", host=" + host + ", port="
				+ port + ", email=" + email + ", password=" + password + "]";
	}

}
