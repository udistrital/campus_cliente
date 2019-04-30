import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
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
    private ubicacionesService: UbicacionesService,
    private campusMidService: CampusMidService,
    private programaService: ProgramaAcademicoService,
    private users: UserService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.ente = this.users.getEnte();
  }


  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.campusMidService.get('formacion/formacionacademicaente/?Ente=' + this.ente)
      .subscribe(res => {
        if (res !== null) {
          const data = <Array<any>>res;
          const data_info = <Array<any>>[];
          data.forEach(element => {
            if (element.Titulacion !== null && element.Titulacion !== undefined) {
              this.programaService.get('programa_academico/?query=id:' + element.Titulacion)
                .subscribe(programa => {
                  if (programa !== null) {
                    const programa_info = <any>programa[0];
                    element.Titulacion = programa_info;
                    element.Metodologia = programa_info.Metodologia;
                    element.NivelFormacion = programa_info.NivelFormacion;
                    this.campusMidService.get('organizacion/identificacionente/?Ente=' + programa_info.Institucion)
                      .subscribe(organizacion => {
                        if (organizacion !== null) {
                          const organizacion_info = <any>organizacion;
                          element.NombreUniversidad = organizacion_info.Nombre;
                          this.ubicacionesService.get('lugar/' + organizacion_info.Ubicacion[0].UbicacionEnte.Lugar)
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
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.formacion_academica') + '|' +
                        this.translate.instant('GLOBAL.programa_academico'),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
            }
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
