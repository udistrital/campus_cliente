import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GENERAL } from './../../app-config';

const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
    }),
}

const path = GENERAL.ENTORNO.ADMISIONES_SERVICE;

@Injectable()
export class AdmisionService {

  private user_1$ = new Subject<[object]>();
  public user_1: any;

  constructor(private http: HttpClient) {
    if (window.localStorage.getItem('ente') !== null && window.localStorage.getItem('id_token') !== undefined) {
      const payload = parseInt(window.localStorage.getItem('ente'), 10);
      this.http.get(path + 'admision/?query=Aspirante:' + payload, httpOptions)
        .subscribe(res => {
          if (res !== null) {
            this.user_1 = res[0];
            this.user_1$.next(this.user_1);
            window.localStorage.setItem('admi_id', res[0].Id);
          }
        });
        setTimeout(() => {
          const payload_2 = parseInt(window.localStorage.getItem('admi_id'), 10);
          this.http.get(path + 'propuesta/?query=Admision:' + payload_2, httpOptions)
            .subscribe(res => {
              if (res !== null) {
                this.user_1 = res[0];
                this.user_1$.next(this.user_1);
                window.localStorage.setItem('prop_id', res[0].Id);
              }
            });
        }, 1000 / 60);
    }
  }

  public getAdmision_id(): number {
    return parseInt(window.localStorage.getItem('admi_id'), 10);
  }

  public getProp_id(): number {
    return parseInt(window.localStorage.getItem('prop_id'), 10);
  }


  public getUser() {
    return this.user_1$.asObservable();
  }
}
