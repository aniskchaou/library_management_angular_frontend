package com.dev.delta.repositories;


import com.dev.delta.entities.UserSetting;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingRepository extends CrudRepository<UserSetting, Long> {
}
