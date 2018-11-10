import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {

  notificaciones: any;
  constructor(private http: Http) {
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
