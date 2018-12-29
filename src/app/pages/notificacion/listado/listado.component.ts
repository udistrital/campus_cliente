import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';
import { NotificacionesService } from '../../../@core/utils/notificaciones.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})

export class ListadoComponent {

  baseUrl: string = 'https://api.cdnjs.com/libraries';
  queryUrl: string = '?search=';

  searchTerm$ = new Subject<string>();

  notificaciones: any;
  constructor(private http: Http,
    private notificacionesService: NotificacionesService,
  ) {

    this.notificaciones = [];

    this.searchTerm$
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(query => this.searchEntries(query)),
      ).subscribe(response => {
        console.info(response);
      })

    this.notificacionesService.messages.subscribe(response => {
      this.notificacionesService.addMessage(response);
    });

    this.notificacionesService.arrayMessages.subscribe(response => {
      this.notificaciones = response;
    });

  }

  searchEntries(term) {
    return this.http
      .get(this.baseUrl + this.queryUrl + term)
      .map(res => res.json());
  }

}
