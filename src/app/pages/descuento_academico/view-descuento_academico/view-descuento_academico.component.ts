import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DescuentoAcademicoService } from '../../../@core/data/descuento_academico.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { SolicitudDescuento } from '../../../@core/data/models/solicitud_descuento';
import { DescuentoDependencia } from '../../../@core/data/models/descuento_dependencia';
import { TipoDescuento } from '../../../@core/data/models/tipo_descuento';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-view-descuento-academico',
  templateUrl: './view-descuento_academico.component.html',
  styleUrls: ['./view-descuento_academico.component.scss'],
})
export class ViewDescuentoAcademicoComponent implements OnInit {
  persona: number;
  admision: number;
  periodo: number;
  programa: number;
  info_descuento: any;
  info_temp: any;
  data: Array<any>;
  solicituddescuento: SolicitudDescuento;

  @Input('persona_id')
  set info(info: number) {
    this.persona = info;
    this.loadData();
  }

  @Input('inscripcion_id')
  set info2(info2: number) {
    this.admision = info2;
    this.loadData();
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(private translate: TranslateService,
    private descuento: DescuentoAcademicoService,
    private admisiones: InscripcionService) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      });
      this.persona = 12;
      this.admision = 5;
      this.loadData();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.admisiones.get('admision/' + this.admision)
      .subscribe(dato_admision => {
        const admisiondata = <any>dato_admision;
        this.programa = admisiondata.ProgramaAcademico;
        this.periodo = admisiondata.Periodo.Id;
        this.descuento.get('descuentos_dependencia/?query=DependenciaId:' + this.programa +
          ',PeriodoId:' + this.periodo + '&limit=0')
          .subscribe(descuentos => {
            const descuentosdependencia = <Array<any>>descuentos;
            this.data = [];
            descuentosdependencia.forEach(element => {
              this.descuento.get('solicitud_descuento/?query=DescuentosDependenciaId:' + element.Id)
                .subscribe(solicitud => {
                  this.solicituddescuento = <any>solicitud[0];
                  if (this.solicituddescuento !== null) {
                    const id_aux = this.solicituddescuento;
                    this.descuento.get('tipo_descuento/' + element.TipoDescuentoId.Id)
                      .subscribe(tipo => {
                        this.info_temp = <SolicitudDescuento>this.solicituddescuento;
                        this.info_temp = id_aux;
                        this.info_temp.DescuentoDependencia = <DescuentoDependencia>element;
                        this.info_temp.DescuentoDependencia.TipoDescuento = <TipoDescuento>tipo;
                        this.data.push(this.info_temp);
                        console.info(JSON.stringify(this.data));
                        this.info_descuento = this.data;
                      },
                        (error: HttpErrorResponse) => {
                          Swal({
                            type: 'error',
                            title: error.status + '',
                            text: this.translate.instant('ERROR.' + error.status),
                            footer: this.translate.instant('GLOBAL.cargar') + '-' +
                              this.translate.instant('GLOBAL.tipo_descuento_matricula'),
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
                        this.translate.instant('GLOBAL.descuento_matricula'),
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
                  this.translate.instant('GLOBAL.descuentos_dependencia'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            });
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.admision'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
      });
  }

  ngOnInit() {
  }
}
