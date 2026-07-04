import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Settings from 'src/app/main/models/Settings';

/**
 * Demo-mode login — no backend call, no form.
 * Shows clickable profile cards so visitors can explore the app instantly.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.demo.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent extends URLLoader implements OnInit {
  /* Keep these so any stray template binding doesn't explode */
  username = '';
  password = '';
  invalidLogin = false;
  errorMessage = '';
  @Output() reloadMenu = new EventEmitter();
  settings$: Settings;
  menuI18n: Settings;
  buttonLoginClicked = false;
  retrievedImage: string = null;
  hidePassword = true;

  demoProfiles = [
    {
      label: 'Admin',
      role: 'Full system access',
      username: 'admin',
      password: 'admin',
      icon: 'admin_panel_settings',
      color: '#3f51b5',
      description: 'Catalog · Members · Analytics · Settings · Reports',
      route: '/dashboard',
      isMember: false,
    },
    {
      label: 'Head Librarian',
      role: 'Staff view',
      username: 'librarian',
      password: 'demo',
      icon: 'local_library',
      color: '#009688',
      description: 'Books · Circulations · Acquisitions · Notices',
      route: '/dashboard',
      isMember: false,
    },
    {
      label: 'Student Member',
      role: 'Alice Johnson',
      username: 'alice@library.demo',
      password: 'demo',
      icon: 'school',
      color: '#e91e63',
      description: 'OPAC search · Book requests · Member portal',
      route: '/member-portal',
      isMember: true,
      memberId: '1',
      memberName: 'Alice Johnson',
      memberType: 'Student',
    },
  ];

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {}

  loginAs(profile: any): void {
    localStorage.clear();
    localStorage.setItem('username', profile.username);
    localStorage.setItem('password', profile.password);
    if (profile.isMember) {
      localStorage.setItem('mp_member_id', profile.memberId);
      localStorage.setItem('mp_member_name', profile.memberName);
      localStorage.setItem('mp_member_email', profile.username);
      localStorage.setItem('mp_member_type', profile.memberType);
    }
    this.router.navigate([profile.route]);
  }

  /* Stub — never called in demo mode */
  doLogin(form?: any): void {}
}
