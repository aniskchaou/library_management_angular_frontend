import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrls: ['./member-register.component.css'],
  standalone: false,
})
export class MemberRegisterComponent {
  step = 1; // 1 = personal, 2 = contact, 3 = account

  form = {
    firstname: '', surname: '', dob: '', gender: '', status: 'ACTIVE',
    primary_email: '', primary_phone: '', secondary_email: '', secondary_phone: '',
    address: '', city: '', state: '', zip: '', country: '',
    memberPassword: '', confirmPassword: '', userType: 'STANDARD',
  };

  submitting = false;
  success    = false;
  error      = '';
  memberId: number | null = null;

  memberTypes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<any[]>(CONFIG.URL_BASE + '/typemember/all').subscribe({
      next: t => this.memberTypes = t || [], error: () => {},
    });
  }

  nextStep(): void {
    if (this.step === 1 && (!this.form.firstname || !this.form.surname)) {
      this.error = 'First name and surname are required.'; return;
    }
    if (this.step === 2 && !this.form.primary_email) {
      this.error = 'Email is required.'; return;
    }
    this.error = '';
    this.step = Math.min(this.step + 1, 3);
  }

  prevStep(): void { this.step = Math.max(this.step - 1, 1); }

  submit(): void {
    if (!this.form.memberPassword) { this.error = 'Password is required.'; return; }
    if (this.form.memberPassword !== this.form.confirmPassword) { this.error = 'Passwords do not match.'; return; }
    this.error = '';
    this.submitting = true;

    const payload = { ...this.form };
    delete (payload as any).confirmPassword;

    this.http.post<any>(CONFIG.URL_BASE + '/member/create', payload).subscribe({
      next: r => {
        this.success  = true;
        this.memberId = r?.id || null;
        this.submitting = false;
      },
      error: e => {
        this.error = e?.error?.message || e?.error || 'Registration failed. Please try again.';
        this.submitting = false;
      },
    });
  }

  goLogin(): void { this.router.navigate(['/opac-account']); }
}
