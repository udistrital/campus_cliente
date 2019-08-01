import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { UbicacionService } from '../../../@core/data/ubicacion.service'
import { ProduccionTecnica } from './../../../@core/data/models/produccion_tecnica';
import { Lugar } from './../../../@core/data/models/lugar';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-produccion-tecnica',
  templateUrl: './view-produccion_tecnica.component.html',
  styleUrls: ['./view-produccion_tecnica.component.scss'],
})
export class ViewProduccionTecnicaComponent implements OnInit {
  ente: number;
  info_produccion_tecnica: any;
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
    private ubicacionesService: UbicacionService,
    private users: UserService) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      });
      this.ente = this.users.getEnte();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.info_produccion_tecnica = <any>[];
    this.produccionService.get('produccion_tecnica/?query=persona:' + this.ente +
    '&limit=0')
    .subscribe(res => {
      this.data = <Array<ProduccionTecnica>>res;
      this.data.forEach(element => {
        this.ubicacionesService.get('lugar/' + element.Ubicacion)
          .subscribe(res2 => {
            if (res2 !== null) {
              element.Ubicacion = <Lugar>res2;
              this.info_produccion_tecnica.push(<ProduccionTecnica>element);
            }
          },
            (error: HttpErrorResponse) => {
              Swal({
                type: 'error',
                title: error.status + '',
                text: this.translate.instant('ERROR.' + error.status),
                footer: this.translate.instant('GLOBAL.cargar') + '-' +
                  this.translate.instant('GLOBAL.produccion_tecnica') + '|' +
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
            this.translate.instant('GLOBAL.produccion_tecnica'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
  }

  ngOnInit() {
  }
}
