import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionService } from '../../../@core/data/ubicacion.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-formacion-academica',
  templateUrl: './view-formacion_academica.component.html',
  styleUrls: ['./view-formacion_academica.component.scss'],
})
export class ViewFormacionAcademicaComponent implements OnInit {
  info_formacion_academica_id: number;
  organizacion: any;
  ente: number;

  @Input('persona_id')
  set info(info: number) {
    this.ente = info;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  info_formacion_academica: any;

  constructor(
    private translate: TranslateService,
    private ubicacionesService: UbicacionService,
    private campusMidService: CampusMidService,
    private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }


  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.campusMidService.get('formacion_academica/?Ente=' + this.ente)
      .subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          const data_info = <Array<any>>[];
          data.forEach(element => {
            this.campusMidService.get('organizacion/' + element.Institucion.Id)
              .subscribe(organizacion => {
                        if (organizacion !== null) {
                          const organizacion_info = <any>organizacion;
                          element.NombreUniversidad = organizacion_info.Nombre;
                          this.ubicacionesService.get('lugar/' + organizacion_info.Ubicacion.UbicacionEnte.Lugar)
                            .subscribe(pais => {
                              if (pais !== null) {
                                const pais_info = <any>pais;
                                element.PaisUniversidad = pais_info.Nombre;
                                data_info.push(element);
                                this.info_formacion_academica = <any>data_info;
                              }
                            },
                              (error: HttpErrorResponse) => {
                                Swal({
                                  type: 'error',
                                  title: error.status + '',
                                  text: this.translate.instant('ERROR.' + error.status),
                                  footer: this.translate.instant('GLOBAL.cargar') + '-' +
                                    this.translate.instant('GLOBAL.formacion_academica') + '|' +
                                    this.translate.instant('GLOBAL.pais_universidad'),
                                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                                });
                              });
                        }
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.formacion_academica') + '|' +
                      this.translate.instant('GLOBAL.nombre_universidad'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          });
        }
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.formacion_academica'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  ngOnInit() {
  }
}
