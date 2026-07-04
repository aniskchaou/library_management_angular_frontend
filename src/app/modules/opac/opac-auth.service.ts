import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import CONFIG from 'src/app/main/urls/urls';
import Member from 'src/app/main/models/Member';

const STORAGE_KEY_EMAIL = 'opac_reader_email';
const STORAGE_KEY_NAME  = 'opac_reader_name';
const STORAGE_KEY_ID    = 'opac_reader_id';
const STORAGE_KEY_PWD   = 'opac_reader_pwd';

@Injectable({ providedIn: 'root' })
export class OpacAuthService {

  private _member = new BehaviorSubject<Member | null>(this._restore());
  member$ = this._member.asObservable();

  constructor(private http: HttpClient) {}

  get member(): Member | null { return this._member.getValue(); }
  get isLoggedIn(): boolean   { return !!this._member.getValue(); }

  /** Authenticate as a library member.
   *  Uses Basic Auth to call /member/all, then locates the record by email. */
  login(email: string, password: string): Observable<Member> {
    const header = new HttpHeaders({
      Authorization: 'Basic ' + btoa(email + ':' + password),
    });
    return this.http
      .get<Member[]>(CONFIG.URL_BASE + '/member/all', { headers: header })
      .pipe(
        map(members => {
          const found = members.find(
            m => (m.email || '').toLowerCase() === email.toLowerCase()
          );
          if (!found) throw new Error('Member not found');
          this._persist(found, password);
          this._member.next(found);
          return found;
        })
      );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY_EMAIL);
    localStorage.removeItem(STORAGE_KEY_NAME);
    localStorage.removeItem(STORAGE_KEY_ID);
    localStorage.removeItem(STORAGE_KEY_PWD);
    this._member.next(null);
  }

  /** Returns Basic-Auth header for the current reader session. */
  get authHeader(): HttpHeaders {
    const email = localStorage.getItem(STORAGE_KEY_EMAIL) || '';
    const pwd   = localStorage.getItem(STORAGE_KEY_PWD)   || '';
    return new HttpHeaders({
      Authorization:  'Basic ' + btoa(email + ':' + pwd),
      'Content-Type': 'application/json',
    });
  }

  private _persist(m: Member, pwd: string): void {
    localStorage.setItem(STORAGE_KEY_EMAIL, m.email || '');
    localStorage.setItem(STORAGE_KEY_NAME,  `${m.firstname} ${m.surname}`);
    localStorage.setItem(STORAGE_KEY_ID,    String(m.id));
    localStorage.setItem(STORAGE_KEY_PWD,   pwd);
  }

  private _restore(): Member | null {
    const id = localStorage.getItem(STORAGE_KEY_ID);
    if (!id) return null;
    // Lightweight stub so components can display the name without a round-trip
    return {
      id:        Number(id),
      email:     localStorage.getItem(STORAGE_KEY_EMAIL) || '',
      firstname: (localStorage.getItem(STORAGE_KEY_NAME) || '').split(' ')[0],
      surname:   (localStorage.getItem(STORAGE_KEY_NAME) || '').split(' ').slice(1).join(' '),
    } as Member;
  }
}
