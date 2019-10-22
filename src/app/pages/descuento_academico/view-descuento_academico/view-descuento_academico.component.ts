import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { SolicitudDescuento } from '../../../@core/data/models/solicitud_descuento';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
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
  inscripcion: number;
  periodo: number;
  programa: number;
  info_descuento: any;
  info_temp: any;
  data: Array<any>;
  solicituddescuento: SolicitudDescuento;
  documentosSoporte = [];

  @Input('persona_id')
  set info(info: number) {
    this.persona = info;
  }

  @Input('inscripcion_id')
  set info2(info2: number) {
    this.inscripcion = info2;
    if (this.inscripcion !== undefined && this.inscripcion !== 0 && this.inscripcion.toString() !== '') {
      this.loadData();
    }
  }

  @Output('url_editar') url_editar: EventEmitter<boolean> = new EventEmitter();

  constructor(private translate: TranslateService,
    private mid: CampusMidService,
    private documentoService: DocumentoService,
    private nuxeoService: NuxeoService,
    private sanitization: DomSanitizer,
    private inscripciones: InscripcionService) {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      });
  }

  public cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitization.bypassSecurityTrustUrl(oldURL);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.inscripciones.get('inscripcion/' + this.inscripcion)
      .subscribe(dato_inscripcion => {
        const inscripciondata = <any>dato_inscripcion;
        this.programa = inscripciondata.ProgramaAcademicoId;
        this.periodo = inscripciondata.PeriodoId;
        this.mid.get('descuento_academico/descuentopersonaperiododependencia/?PersonaId=' + this.persona +
          '&DependenciaId=' + this.programa + '&PeriodoId=' + this.periodo)
          .subscribe(descuentos => {
            if (descuentos !== null) {
              this.data = <Array<any>>descuentos;
              const soportes = [];

              for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].DocumentoId + '' !== '0') {
                  soportes.push({ Id: this.data[i].DocumentoId, key: 'DocumentoDes' + i });
                }
              }

              this.nuxeoService.getDocumentoById$(soportes, this.documentoService)
                .subscribe(response => {
                  this.documentosSoporte = <Array<any>>response;

                  if (Object.values(this.documentosSoporte).length === this.data.length) {
                    let contador = 0;
                    this.info_descuento = <any>[];

                    this.data.forEach(element => {
                      element.DocumentoId = this.cleanURL(this.documentosSoporte['DocumentoDes' + contador] + '');
                      contador++;
                      this.info_descuento.push(element);
                    });
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
                        this.translate.instant('GLOBAL.documento_programa'),
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
