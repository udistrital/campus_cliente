import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Libro } from './../../../@core/data/models/libro';
import { Lugar } from './../../../@core/data/models/lugar';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-view-libro',
  templateUrl: './view-libro.component.html',
  styleUrls: ['./view-libro.component.scss'],
})
export class ViewLibroComponent implements OnInit {
  ente: number;
  info_libro: any;
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
    private ubicacionesService: UbicacionesService,
    private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.info_libro = <any>[];
    this.produccionService.get('libro/?query=Persona:' + this.ente +
      '&limit=0')
      .subscribe(res => {
        this.data = <Array<Libro>>res;
        this.data.forEach(element => {
          this.ubicacionesService.get('lugar/' + element.Ubicacion)
            .subscribe(res2 => {
              if (res2 !== null) {
                element.Ubicacion = <Lugar>res2;
                this.info_libro.push(<Libro>element);
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                    this.translate.instant('GLOBAL.libro') + '|' +
                    this.translate.instant('GLOBAL.ubicacion'),
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
              this.translate.instant('GLOBAL.libros'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
