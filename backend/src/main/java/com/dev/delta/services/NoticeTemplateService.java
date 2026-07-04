package com.dev.delta.services;

import com.dev.delta.entities.NoticeTemplate;
import com.dev.delta.repositories.NoticeTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NoticeTemplateService {

    @Autowired
    private NoticeTemplateRepository noticeTemplateRepository;

    public List<NoticeTemplate> findAll() {
        return noticeTemplateRepository.findAll();
    }

    public Optional<NoticeTemplate> findById(Long id) {
        return noticeTemplateRepository.findById(id);
    }

    public NoticeTemplate save(NoticeTemplate noticeTemplate) {
        return noticeTemplateRepository.save(noticeTemplate);
    }

    public void deleteById(Long id) {
        noticeTemplateRepository.deleteById(id);
    }
}

