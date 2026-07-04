package com.dev.delta.email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailSettingRepository extends JpaRepository<EmailSetting, Long> {

}
