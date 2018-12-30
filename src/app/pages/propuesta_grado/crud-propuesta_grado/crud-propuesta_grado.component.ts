import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { PropuestaGrado } from './../../../@core/data/models/propuesta_grado';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { FORM_PROPUESTA_GRADO } from './form-propuesta_grado';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-crud-propuesta-grado',
  templateUrl: './crud-propuesta_grado.component.html',
  styleUrls: ['./crud-propuesta_grado.component.scss'],
})
export class CrudPropuestaGradoComponent implements OnInit {
  config: ToasterConfig;
  propuesta_grado_id: number;
  prop_id: number;
  admision_id: number;
  ENTE_id: number;
  filesUp: any;
  FormatoProyecto: any;

  @Input('propuesta_grado_id')
  set name(propuesta_grado_id: number) {
    this.propuesta_grado_id = propuesta_grado_id;
    this.buscarID_prop();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_propuesta_grado: PropuestaGrado;
  formPropuestaGrado: any;
  regPropuestaGrado: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(
    private translate: TranslateService,
    private autenticationService: ImplicitAutenticationService,
    private documentoService: DocumentoService,
    private nuxeoService: NuxeoService,
    private admisionesService: AdmisionesService,
    private store: Store < IAppState > ,
    private listService: ListService,
    private ente_id: UserService,
    private toasterService: ToasterService) {
    this.formPropuestaGrado = FORM_PROPUESTA_GRADO;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.listService.findGrupoInvestigacion();
    this.listService.findTipoProyecto();
    this.listService.findLineaInvestigacion();
    this.loading = false;
    this.loadLists();
   }

  construirForm() {
    this.formPropuestaGrado.titulo = this.translate.instant('GLOBAL.propuesta_grado');
    this.formPropuestaGrado.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formPropuestaGrado.campos.length; i++) {
      this.formPropuestaGrado.campos[i].label = this.translate.instant('GLOBAL.' + this.formPropuestaGrado.campos[i].label_i18n);
      this.formPropuestaGrado.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formPropuestaGrado.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formPropuestaGrado.campos.length; index++) {
      const element = this.formPropuestaGrado.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  public buscarID_prop(): void {
    this.ENTE_id = this.ente_id.getEnte();
    this.admisionesService.get('admision/?query=Aspirante:' + this.ENTE_id)
        .subscribe(res_ente => {
          this.admision_id = res_ente[0].Id;
          if (res_ente[0].Aspirante === this.ente_id.getEnte() ) {
          this.admisionesService.get('propuesta/?query=Admision:' + this.admision_id)
              .subscribe(res => {
                const tempo = <any>res[0].Id
                this.prop_id = tempo;
                this.loadPropuestaGrado();
              });
          }else {
            this.showToast('info', 'updated', 'Regargar pagina');
            Swal({
              type: 'warning',
              title: this.translate.instant('GLOBAL.warning'),
              text: this.translate.instant('GLOBAL.error_carga_datos'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          }
        });
  }


  public loadPropuestaGrado(): void {
    if (this.prop_id !== undefined && this.prop_id !== 0 &&
      this.prop_id.toString() !== '') {
      this.admisionesService.get('propuesta/?query=id:' + this.prop_id)
        .subscribe(res => {
          if (res !== null) {
            const temp = <PropuestaGrado>res[0];
            const files = []
            if (temp.FormatoProyecto + '' !== '0') {
              files.push({ Id: temp.FormatoProyecto, key: 'FormatoProyecto' });
            }
            this.nuxeoService.getDocumentoById$(files, this.documentoService)
              .subscribe(response => {
                const filesResponse = <any>response;
                if (Object.keys(filesResponse).length === files.length) {
                  this.info_propuesta_grado = <PropuestaGrado>res[0];
                  this.info_propuesta_grado.TipoProyecto = temp.TipoProyecto;
                  this.FormatoProyecto = this.info_propuesta_grado.FormatoProyecto;
                  this.info_propuesta_grado.LineaInvestigacion = temp.LineaInvestigacion;
                  this.info_propuesta_grado.FormatoProyecto = filesResponse['FormatoProyecto'] + '';
                }
              },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
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
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
    } else  {
      this.info_propuesta_grado = undefined;
      this.clean = !this.clean;
    }
  }

  updatePropuestaGrado(propuestaGrado: any): void {

    const opt: any = {
      title: this.translate.instant('GLOBAL.actualizar'),
      text: this.translate.instant('GLOBAL.actualizar') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_propuesta_grado = <any>propuestaGrado;
        const files = [];
        if (this.info_propuesta_grado.FormatoProyecto !== undefined) {
          files.push({ file: this.info_propuesta_grado.FormatoProyecto, documento: this.FormatoProyecto, key: 'FormatoProyecto' });
        }
        if (files.length !== 0) {
          this.nuxeoService.updateDocument$(files, this.documentoService)
              .subscribe(response => {
                if (Object.keys(response).length === files.length) {
                  const documentos_actualizados = <any>response;
                  this.info_propuesta_grado.FormatoProyecto = this.FormatoProyecto;
                  this.admisionesService.put('propuesta', this.info_propuesta_grado, this.info_propuesta_grado.Id)
                  .subscribe(res => {
                    if (documentos_actualizados['FormatoProyecto'] !== undefined) {
                      this.info_propuesta_grado.FormatoProyecto = documentos_actualizados['FormatoProyecto'].url + '';
                    }
                    this.loadPropuestaGrado();
                    this.eventChange.emit(true);
                    this.showToast('info', 'updated', 'PropuestaGrado updated');
                  },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
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
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });

        } else {
          this.info_propuesta_grado.FormatoProyecto = this.FormatoProyecto;
          this.admisionesService.put('propuesta', this.info_propuesta_grado, this.prop_id)
                  .subscribe(res => {
                    this.eventChange.emit(true);
                    this.loadPropuestaGrado();
                    this.showToast('info', 'updated', 'PropuestaGrado updated');
                  },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                    });
                  });
        }
      }
    });
  }

  createPropuestaGrado(propuestaGrado: any): void {
    const opt: any = {
      title:  this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('GLOBAL.create_propuesta'),
      icon: 'warning',
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        const files = []
        this.info_propuesta_grado = <PropuestaGrado>propuestaGrado;

        if (this.info_propuesta_grado.FormatoProyecto !== undefined) {
          files.push({
            nombre: this.autenticationService.getPayload().sub, key: 'FormatoProyecto',
            file: this.info_propuesta_grado.FormatoProyecto, IdDocumento: 2});
        }

        this.nuxeoService.getDocumentos$(files, this.documentoService)
            .subscribe(response => {
              if (Object.keys(response).length === files.length) {
                this.filesUp = <any>response;
                if (this.filesUp['FormatoProyecto'] !== undefined) {
                  this.info_propuesta_grado.FormatoProyecto = this.filesUp['FormatoProyecto'].Id;
                }
                this.admisionesService.post('propuesta', this.info_propuesta_grado)
                .subscribe(res => {
                  const r = <any>res
                    if (r !== null && r.Type !== 'error') {
                      this.info_propuesta_grado = <PropuestaGrado>res;
                      this.eventChange.emit(true);
                      this.showToast('info', this.translate.instant('GLOBAL.crear'),
                      this.translate.instant('GLOBAL.propuesta') + ' ' + this.translate.instant('GLOBAL.confirmarCrear'));
                    } else {
                      this.showToast('error', this.translate.instant('GLOBAL.error'),
                      this.translate.instant('GLOBAL.error'));
                    }
                },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
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
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
            })
      }
    });
  }

  ngOnInit() {
    this.buscarID_prop();
  }

  validarForm(event) {
    const propuesta = {
      Nombre: event.data.PropuestaGrado.Nombre,
      Resumen: event.data.PropuestaGrado.Resumen,
      GrupoInvestigacion: event.data.PropuestaGrado.GrupoInvestigacion,
      LineaInvestigacion: event.data.PropuestaGrado.LineaInvestigacion,
      FormatoProyecto: event.data.PropuestaGrado.FormatoProyecto.file,
      Admision: {
        Id: this.admision_id,
      },
      TipoProyecto: event.data.PropuestaGrado.TipoProyecto,
    }
    if (event.valid) {
      if (this.info_propuesta_grado === undefined) {
        this.createPropuestaGrado(propuesta);
      } else {
        this.updatePropuestaGrado(propuesta);
      }
    }
  }

  setPercentage(event) {
    this.percentage = event;
    this.result.emit(this.percentage);
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.formPropuestaGrado.campos[this.getIndexForm('GrupoInvestigacion')].opciones = list.listGrupoInvestigacion[0];
        this.formPropuestaGrado.campos[this.getIndexForm('LineaInvestigacion')].opciones = list.listLineaInvestigacion[0];
        this.formPropuestaGrado.campos[this.getIndexForm('TipoProyecto')].opciones = list.listTipoProyecto[0];
      },
    );
  }

}
