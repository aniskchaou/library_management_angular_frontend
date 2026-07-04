package com.dev.delta.repositories;

import com.dev.delta.entities.Notice;
import com.dev.delta.entities.NoticeTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeTemplateRepository extends JpaRepository<NoticeTemplate, Long> {
}
