package com.dev.delta;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.dev.delta.repositories.PaymentRepository;
import com.dev.delta.services.MemberService;

/**
 * MemberServiceTest
 * 
 * @author Admin
 *
 */
@SpringBootTest
class MemberServiceTest {

	@InjectMocks
	MemberService memberService;

	@Mock
	PaymentRepository memberRepository;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	/**
	 * getAllMembersTest
	 */
	/*
	 * @Test public void getAllMembersTest() { List<Member> list = new
	 * ArrayList<Member>(); Member member1 = new Member(1L, "Student"); Member
	 * member2 = new Member(2L, "Admin"); Member member3 = new Member(3L,
	 * "Librarian");
	 * 
	 * list.add(member1); list.add(member2); list.add(member3);
	 * 
	 * when(memberRepository.findAll()).thenReturn(list);
	 * 
	 * // test List<Member> memberList = (List<Member>) paymentService.findAll();
	 * 
	 * assertEquals(3, memberList.size()); verify(memberRepository,
	 * times(1)).findAll(); }
	 */

	/**
	 * getMemberByIdTest
	 * 
	 * @throws Exception
	 */
	/*
	 * @Test public void getMemberByIdTest() throws Exception {
	 * 
	 * when(memberRepository.findById(1L)).thenReturn(Optional.of(new Member(1L,
	 * "admin")));
	 * 
	 * Member member = paymentService.findById(1L);
	 * 
	 * assertEquals("admin", member.getName());
	 * 
	 * }
	 */

	/**
	 * saveMemberTest
	 */
	/*
	 * @Test public void saveMemberTest() { Member member1 = new Member(1L,
	 * "admin"); paymentService.saveOrUpdate(member1); verify(memberRepository,
	 * times(1)).save(member1); }
	 */

}
