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

export class ListadoComponent implements OnInit {

  baseUrl: string = 'https://api.cdnjs.com/libraries';
  queryUrl: string = '?search=';

  searchTerm$ = new Subject<string>();

  notificaciones: any;
  constructor(private http: Http,
    private notificacionesService: NotificacionesService,
  ) {

    this.searchTerm$
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(query => this.searchEntries(query)),
      ).subscribe(response => {
        console.info(response);
      })

    this.notificacionesService.messages.subscribe(msg => {
      console.info('Response from websocket: ' + msg);
    });

    this.notificacionesService.messages.subscribe(msg => {
      console.info('Response from websocket: ' + msg);
    });


  }

  searchEntries(term) {
    return this.http
      .get(this.baseUrl + this.queryUrl + term)
      .map(res => res.json());
  }


  public getNotificacion(): Observable<any> {
    return this.http.get('assets/json/notification.json');
  }

  ngOnInit() {
    this.getNotificacion().subscribe(result => {
      this.notificaciones = JSON.parse(result._body);
      console.info(this.notificaciones);
    });
  }

}
