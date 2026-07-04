package com.dev.delta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.MemberType;
import com.dev.delta.repositories.TypeMemberRepository;

/**
 * TypeMemberService
 * 
 * @author Admin
 *
 */
@Service
public class TypeMemberService {

	/**
	 * TypeMemberRepository
	 */
	@Autowired
	TypeMemberRepository typeMemberRepository;

	/**
	 * saveOrUpdate
	 * 
	 * @param memberType
	 * @return
	 */
	public MemberType saveOrUpdate(MemberType memberType) {

		return typeMemberRepository.save(memberType);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<MemberType> findAll() {
		return typeMemberRepository.findAll();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public MemberType findById(Long id) throws Exception {
		return typeMemberRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * TypeMemberRepository
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		MemberType memberType = findById(id);
		typeMemberRepository.delete(memberType);
	}
}
