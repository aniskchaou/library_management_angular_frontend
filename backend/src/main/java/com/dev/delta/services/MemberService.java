package com.dev.delta.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.dev.delta.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.Member;
import com.dev.delta.repositories.MemberRepository;

/**
 * MemberService
 * 
 * @author Admin
 *
 */
@Service
public class MemberService {

	/**
	 * PaymentRepository
	 */
	@Autowired
	MemberRepository memberRepository;

	public long count() {

		return memberRepository.count();
	}

	/**
	 * saveOrUpdate
	 * 
	 * @param member
	 * @return
	 */
	public Member saveOrUpdate(Member member) {
		return memberRepository.save(member);
	}

	/**
	 * findAll
	 * 
	 * @return
	 */
	public Iterable<Member> findAll() {
		return memberRepository.findAll();
	}

	public Iterable<String> findStatus() {
		return memberRepository.getStatus();
	}

	public Iterable<String> findUserType() {
		return memberRepository.getUserType();
	}

	/**
	 * findById
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Member findById(Long id) throws Exception {
		return memberRepository.findById(id).orElseThrow(() -> new Exception("not Found"));
	}

	/**
	 * delete
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void delete(Long id) throws Exception {
		Member member = findById(id);
		memberRepository.delete(member);
	}

	public List<Member> filterMemberCriteria(String status, String type_id) throws Exception {
		return memberRepository.filterMemberByCriteria(status, type_id);
	}

	// Method to get the number of members by user type
	public List<Map<String, Object>> getMembersByUserType() {
		return memberRepository.countMembersByUserType().stream()
				.map(result -> Map.of("name", result[0], "value", result[1]))
				.collect(Collectors.toList());
	}

	// Method to get the gender distribution of members
	public List<Map<String, Object>> getMembersByGender() {
		return memberRepository.countMembersByGender().stream()
				.map(result -> Map.of("name", result[0], "value", result[1]))
				.collect(Collectors.toList());
	}

	// Method to get the age distribution of members
	public List<Map<String, Object>> getMembersByAge() {
		return memberRepository.countMembersByAge().stream()
				.map(result -> Map.of("name", result[0], "value", result[1]))
				.collect(Collectors.toList());
	}

	// Get new arrivals
	public List<Member> getNewArrivals() {
		return memberRepository.findNewArrivals();
	}

	// Get unverified accounts
	public List<Member> getUnverifiedAccounts() {
		return memberRepository.findByVerifiedFalse();
	}

	// Get blocked members
	public List<Member> getBlockedMembers() {
		return memberRepository.findByBlockedTrue();
	}

	// Get expired accounts
	public List<Member> getExpiredAccounts() {
		return memberRepository.findByExpiredTrue();
	}

	// Method to get the number of members by city
	public List<Map<String, Object>> getMembersByCity() {
		return memberRepository.countMembersByCity().stream()
				.map(result -> Map.of("name", result[0], "value", result[1]))
				.collect(Collectors.toList());
	}

	// Reactivate a member (sets the status to 'active' and unblocks)
	public Optional<Member> reactivateMember(Long memberId) {
		Optional<Member> member = memberRepository.findById(memberId);
		if (member.isPresent()) {
			Member updatedMember = member.get();
			updatedMember.setStatus("active");
			updatedMember.setBlocked(false);
			updatedMember.setExpired(false);
			memberRepository.save(updatedMember);
		}
		return member;
	}

	// Block a member (sets blocked to true and status to 'inactive')
	public Optional<Member> blockMember(Long memberId) {
		Optional<Member> member = memberRepository.findById(memberId);
		if (member.isPresent()) {
			Member updatedMember = member.get();
			updatedMember.setBlocked(true);
			updatedMember.setStatus("inactive");
			memberRepository.save(updatedMember);
		}
		return member;
	}

	// Verify a member (sets verified to true)
	public Optional<Member> verifyMember(Long memberId) {
		Optional<Member> member = memberRepository.findById(memberId);
		if (member.isPresent()) {
			Member updatedMember = member.get();
			updatedMember.setVerified(true);
			memberRepository.save(updatedMember);
		}
		return member;
	}



}
