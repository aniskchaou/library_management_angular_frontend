import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import Circulation from 'src/app/main/models/Circulation';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

@Component({
  selector: 'app-view-circulation',
  templateUrl: './view-circulation.component.html',
  styleUrls: ['./view-circulation.component.css'],
})
export class ViewCirculationComponent extends URLLoader implements OnInit {
  @Input() id;
  circulation;
  circulationI18n;

  constructor(private httpService: HTTPService,private activeModal: NgbActiveModal) {
    super();
  }

  ngOnInit(): void {
    this.viewCirculation(this.id);
    this.getCirculationByLang(CONFIG.getInstance().getLang());
  }

  ngOnChanges(changes: any) {
    this.viewCirculation(this.id);
    this.getCirculationByLang(CONFIG.getInstance().getLang());
  }
  viewCirculation(id: any) {
    if (this.id) {
      this.httpService.getAll(CONFIG.URL_BASE + '/circulation/' + id).subscribe(
        (data) => {
          this.circulation = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
    }
  }

  getCirculationByLang(lang) {
     lang='EN'
    this.httpService
      .getAll(CONFIG.URL_BASE + '/i18n/circulation/' + lang)
      .subscribe(
        (data) => {
          this.circulationI18n = data;
        },
        (err: HttpErrorResponse) => {
          super.show('Error', err.message, 'warning');
        }
      );
  }

  closeModal(): void {
    this.activeModal.dismiss(); // Close the modal using NgbActiveModal
  }


}
