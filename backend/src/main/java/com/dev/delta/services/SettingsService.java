package com.dev.delta.services;

import com.dev.delta.entities.UserSetting;
import com.dev.delta.repositories.UserSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Settings;
import com.dev.delta.repositories.SettingsRepository;

/**
 * SettingsService
 * 
 * @author Admin
 *
 */
@Service
public class SettingsService {

	/**
	 * SettingsRepository
	 */
	@Autowired
	SettingsRepository settingsRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param settings
	 * @return
	 */
	public Settings saveOrUpdate(Settings settings) {
		return settingsRepository.save(settings);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Settings> findAll() {
		return settingsRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Settings findById(Long id) throws Exception {
		return settingsRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Settings settings = findById(id);
		settingsRepository.delete(settings);
	}

	/**
	 * changeLang
	 * 
	 * @param lang
	 * @return
	 */
	public boolean changeLang(String lang) {
		settingsRepository.updateSettingsByLang(lang);
		return true;
	}

	@Autowired
	private UserSettingRepository userSettingsRepository;

	public UserSetting saveSettings(UserSetting settings) {
		return userSettingsRepository.save(settings);
	}

	public UserSetting getSettings(Long id) {
		return userSettingsRepository.findById(id).orElse(null);
	}
}
