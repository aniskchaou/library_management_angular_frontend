import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import SettingsMessage from 'src/app/main/messages/SettingsMessage';
import { AuthentificationService } from 'src/app/main/security/authentification.service';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { HostListener } from '@angular/core';
import { User } from 'src/app/modules/shared/view-user-profile/view-user-profile.component';
import { UploadAppLogoComponent } from 'src/app/modules/shared/upload-app-logo/upload-app-logo.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadProfilePhotoComponent } from 'src/app/modules/shared/upload-profile-photo/upload-profile-photo.component';
import { ToastrService } from 'ngx-toastr';
import { EditPasswordComponent } from 'src/app/modules/shared/edit-password/edit-password.component';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent extends URLLoader implements OnInit {
  currentLang='EN'
  @Input() menuI18n;
  searchInput: string;
  user = localStorage.getItem('username');
  sysLang;
  userObject: User;
  retrievedImage: string;
  notifications: Notification[];
  //retrievedLogoImage: string;
  
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private httpService: HTTPService,
    private settingsMessage: SettingsMessage,
    //private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    super();
    //this.getDashboardByLang(CONFIG.getInstance().getLang());
    // this.getMenuByLang(CONFIG.getInstance().getLang());
    //this.getCategoryByLang(CONFIG.getInstance().getLang());
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.logout();
  }

  setDefaultImage(event: Event) {
  (event.target as HTMLImageElement).src = 'https://i.pinimg.com/474x/d4/d3/c0/d4d3c02f855019b7357b6c46da2124da.jpg'; // Replace with your default image URL
}


  ngOnInit(): void {
    
    this.retrievedImage=CONFIG.URL_BASE+'/users/get/' +localStorage.getItem('username') +'/'+localStorage.getItem('username')+'_profile.png';
    this.sysLang = CONFIG.getInstance().getLang();
    this.httpService.menuI18n$.subscribe((data) => {
      this.menuI18n = data;
    });

    this.httpService
    .getAll(CONFIG.URL_BASE + '/users/username/'+localStorage.getItem('username'))
    .subscribe(
      (data:User) => {
        this.userObject = data;
      },
      (err: HttpErrorResponse) => {
        console.log(err)
      }
    );
    this.generateDummyNotifications()
  }

  changeLang(lang) {
   this.toastr.info("The current version supports only the English language. Other languages will be added in the next versions.")
   /*  this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/settings/updatelang/' + lang,
        localStorage.getItem('username'),
        localStorage.getItem('password')
      )
      .subscribe(
        (data) => {
          CONFIG.getInstance().setLang(lang);
          super.show(
            'Information',
            this.settingsMessage.editConfirmation[lang],
            'info'
          );
          this.getDashboardByLang(
            CONFIG.getInstance().getLang(),
            localStorage.getItem('username'),
            localStorage.getItem('password')
          );
          this.getMenuByLang(
            CONFIG.getInstance().getLang(),
            localStorage.getItem('username'),
            localStorage.getItem('password')
          );
          this.getCategoryByLang(
            CONFIG.getInstance().getLang(),
            localStorage.getItem('username'),
            localStorage.getItem('password')
          );
          this.logout();
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      ); */
  }

  getDashboardByLang(lang, username, password) {
    this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/i18n/dashboard/EN',
        username,
        password
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.httpService.dashboardI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }

  getMenuByLang(lang, username, password) {
    this.httpService
      .getAllLang(CONFIG.URL_BASE + '/i18n/menu/EN', username, password)
      .subscribe(
        (data) => {
          console.log(data);
          this.httpService.menuI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
          //this.reload = true;
        }
      );
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
  reloadPage() {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  getCategoryByLang(lang, username, password) {
    this.httpService
      .getAllLang(
        CONFIG.URL_BASE + '/i18n/category/EN',
        username,
        password
      )
      .subscribe(
        (data) => {
          this.httpService.categoryI18n.next(data);
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  toggleFullScreen() {
    const elem = document.documentElement as HTMLElement;  // Get the document's root element
  
    if (!document.fullscreenElement) {
      // Request full-screen (modern method)
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) { // Safari
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) { // IE11
        (elem as any).msRequestFullscreen();
      }
    } else {
      // Exit full-screen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) { // Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { // IE11
        (document as any).msExitFullscreen();
      }
    }
  }

   openLogoDialog(): void {
    const modalRef = this.modalService.open(UploadAppLogoComponent);
    modalRef.componentInstance.department = {};

    modalRef.result.then(result => {
      if (result) {
     
      }
    }).catch(error => console.log(error));
  } 

  openPasswordDialog(): void {
    const modalRef = this.modalService.open(EditPasswordComponent);
    modalRef.componentInstance.department = {};

    modalRef.result.then(result => {
      if (result) {
     
      }
    }).catch(error => console.log(error));
  } 
  
  openProfilePhotoDialog(): void {
    const modalRef = this.modalService.open(UploadProfilePhotoComponent);
    modalRef.componentInstance.department = {};

    modalRef.result.then(result => {
      if (result) {
     
      }
    }).catch(error => console.log(error));
  } 








  private generateDummyNotifications() {
   /*  this.notifications = [
      {
        id: 1,
        content: 'A new book has been added to the library: "The Great Gatsby".',
        date: new Date().toISOString(),
        type: 'info',
      },
      {
        id: 2,
        content: 'Your book "1984" is due tomorrow. Please return it on time.',
        date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        type: 'warning',
      },
      {
        id: 3,
        content: 'You have successfully renewed your membership.',
        date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        type: 'success',
      },
      {
        id: 4,
        content: 'An error occurred while trying to fetch new books. Please try again later.',
        date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
        type: 'error',
      },
    ]; */

    this.httpService
      .getAll(CONFIG.URL_BASE + '/notification/')
      .subscribe(
        (data:Notification[]) => {
          this.notifications = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  onNotificationClick() {
    // You can perform any action here, such as marking notifications as read, etc.
    this.httpService
      .getAll(CONFIG.URL_BASE + '/notification/')
      .subscribe(
        (data:Notification[]) => {
          this.notifications = data;
        },
        (err: HttpErrorResponse) => {}
      );
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }
}
// notification.model.ts
export interface Notification {
  id: number;
  content: string;
  date: string; // ISO date string
  type: 'info' | 'warning' | 'success' | 'error'; // Define types of notifications
}
