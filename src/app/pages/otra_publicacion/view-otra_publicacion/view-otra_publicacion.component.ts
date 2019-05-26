import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { OtraPublicacion } from './../../../@core/data/models/otra_publicacion';
import { TipoOtraPublicacion } from './../../../@core/data/models/tipo_otra_publicacion';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-view-otra-publicacion',
  templateUrl: './view-otra_publicacion.component.html',
  styleUrls: ['./view-otra_publicacion.component.scss'],
})
export class ViewOtraPublicacionComponent implements OnInit {
  ente: number;
  info_otra_publicacion: any;
  data: Array<any>;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private produccionService: ProduccionAcademicaService,
    private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.info_otra_publicacion = <any>[];
    this.produccionService.get('otra_publicacion/?query=Persona:' + this.ente +
      '&limit=0')
      .subscribe(res => {
        this.data = <Array<OtraPublicacion>>res;
        this.data.forEach(element => {
        this.produccionService.get('tipo_otra_publicacion/' + element.Tipo.Id)
          .subscribe(res2 => {
            if (res2 !== null) {
              element.Tipo = <TipoOtraPublicacion>res2;
              this.info_otra_publicacion.push(<OtraPublicacion>element);
            }
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.cargar') + '-' +
                  this.translate.instant('GLOBAL.otra_publicacion') + '|' +
                  this.translate.instant('GLOBAL.tipo_otra_publicacion'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
          });
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.otra_publicacion'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
