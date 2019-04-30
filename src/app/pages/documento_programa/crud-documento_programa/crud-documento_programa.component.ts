import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoPrograma } from './../../../@core/data/models/documento_programa';
import { SoporteDocumentoPrograma } from './../../../@core/data/models/soporte_documento_programa';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoProgramaService } from '../../../@core/data/documentos_programa.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { FORM_DOCUMENTO_PROGRAMA } from './form-documento_programa';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '../../../@core/data/users.service';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-crud-documento-programa',
  templateUrl: './crud-documento_programa.component.html',
  styleUrls: ['./crud-documento_programa.component.scss'],
})
export class CrudDocumentoProgramaComponent implements OnInit {
  config: ToasterConfig;
  documento_programa_id: number;
  filesUp: any;
  Soporte: any;
  estado: number;

  @Input('documento_programa_id')
  set name(documento_programa_id: number) {
    this.documento_programa_id = documento_programa_id;
    this.loadDocumentoPrograma();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_documento_programa: any;
  formDocumentoPrograma: any;
  regDocumentoPrograma: any;
  clean: boolean;
  loading: boolean;
  percentage: number;

  constructor(
    private translate: TranslateService,
    private autenticationService: ImplicitAutenticationService,
    private documentoService: DocumentoService,
    private documentoProgramaService: DocumentoProgramaService,
    private nuxeoService: NuxeoService,
    private user: UserService,
    private toasterService: ToasterService) {
    this.formDocumentoPrograma = FORM_DOCUMENTO_PROGRAMA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsTipodocumentoprograma();
    this.loading = false;
  }

  construirForm() {
    // this.formDocumentoPrograma.titulo = this.translate.instant('GLOBAL.documento_programa');
    this.formDocumentoPrograma.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formDocumentoPrograma.campos.length; i++) {
      this.formDocumentoPrograma.campos[i].label = this.translate.instant('GLOBAL.' + this.formDocumentoPrograma.campos[i].label_i18n);
      this.formDocumentoPrograma.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formDocumentoPrograma.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formDocumentoPrograma.campos.length; index++) {
      const element = this.formDocumentoPrograma.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  loadOptionsTipodocumentoprograma(): void {
    let tipodocumentoprograma: Array<any> = [];
    this.documentoProgramaService.get('documento_programa/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          tipodocumentoprograma = <Array<DocumentoPrograma>>res;
        }
        this.formDocumentoPrograma.campos[this.getIndexForm('DocumentoPrograma')].opciones = tipodocumentoprograma;
      },
        (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            footer: this.translate.instant('GLOBAL.cargar') + '-' +
              this.translate.instant('GLOBAL.documento_programa') + '|' +
              this.translate.instant('GLOBAL.tipo_documento_programa'),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public loadDocumentoPrograma(): void {
    this.loading = true;
    if (this.documento_programa_id !== undefined &&
      this.documento_programa_id !== 0 &&
      this.documento_programa_id.toString() !== '') {
      this.documentoProgramaService.get('soporte_documento_programa/?query=id:' + this.documento_programa_id)
        .subscribe(res => {
          if (res !== null) {
            const temp = <SoporteDocumentoPrograma>res[0];
            const files = []
            if (temp.Documento + '' !== '0') {
              files.push({ Id: temp.Documento, key: 'SoporteDocumentoPrograma' });
            }
            this.nuxeoService.getDocumentoById$(files, this.documentoService)
              .subscribe(response => {
                const filesResponse = <any>response;
                // if ( (Object.keys(filesResponse).length !== 0) && (filesResponse['SoporteDocumentoPrograma'] !== undefined) ) {
                if (Object.keys(filesResponse).length === files.length) {
                  this.info_documento_programa = <any>res// temp;
                  this.Soporte = this.info_documento_programa.Soporte;
                  this.info_documento_programa.Soporte = filesResponse['SoporteDocumentoPrograma'] + '';
                }
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.documento_programa') + '|' +
                      this.translate.instant('GLOBAL.soporte_documento'),
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
                this.translate.instant('GLOBAL.documento_programa'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_documento_programa = undefined;
      this.clean = !this.clean;
      this.loading = false;
    }
  }

  updateDocumentoPrograma(soporteDocumentoPrograma: any): void {
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
          this.loading = true;
          this.info_documento_programa = <any>soporteDocumentoPrograma;
          const files = [];
          if (this.info_documento_programa.Soporte.file !== undefined) {
            files.push({ file: this.info_documento_programa.Soporte.file, documento: this.Soporte, key: 'SoporteDocumentoPrograma' });
            // console.info ('FILES: ' + JSON.stringify(files) + 'Longitud:' + files.length);
          }
          if (files.length !== 0) {
            this.nuxeoService.updateDocument$(files, this.documentoService)
              .subscribe(response => {
                if (Object.keys(response).length === files.length) {
                  const documentos_actualizados = <any>response;
                  this.documentoProgramaService.put('soporte_documento_programa', this.info_documento_programa)
                    .subscribe(res => {
                      if (documentos_actualizados['SoporteDocumentoPrograma'] !== undefined) {
                        this.info_documento_programa.Soporte = documentos_actualizados['SoporteDocumentoPrograma'].url + '';
                      }
                      this.loadDocumentoPrograma();
                      this.loading = false;
                      this.eventChange.emit(true);
                      this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                        this.translate.instant('GLOBAL.documento_programa') + ' ' +
                        this.translate.instant('GLOBAL.confirmarActualizar'));
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                            this.translate.instant('GLOBAL.documento_programa'),
                          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                        });
                      });
                }
              },
                (error: HttpErrorResponse) => {
                  this.loading = false;
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                      this.translate.instant('GLOBAL.documento_programa') + '|' +
                      this.translate.instant('GLOBAL.soporte_documento'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          } else {
            this.info_documento_programa.Soporte = this.Soporte;
            this.documentoProgramaService.put('soporte_documento_programa', this.info_documento_programa)
              .subscribe(res => {
                this.eventChange.emit(true);
                this.loadDocumentoPrograma();
                this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                  this.translate.instant('GLOBAL.documento_programa') + ' ' +
                  this.translate.instant('GLOBAL.confirmarActualizar'));
              },
                (error: HttpErrorResponse) => {
                  this.loading = false;
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                      this.translate.instant('GLOBAL.documento_programa'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          }
        }
      });
  }

  crearNuevoDocumentoPrograma(documentoPrograma: any): void {
    this.info_documento_programa = <SoporteDocumentoPrograma>documentoPrograma;
    // const documentoProgramaDocumento = this.info_documento_programa.DocumentoPrograma.Id;
    this.documentoProgramaService.get('soporte_documento_programa/?query=ente:' + this.user.getEnte())
      .subscribe(res => {
        if (res !== null) {
          if (Object.keys(res).length !== 0) {


          /** const temp = res[0];
            if (tipoDescuento === 1 && temp.TipoDescuentoMatricula.Id !== 1) {
              this.createDescuentoMatricula(descuentoMatricula);
            } else if (tipoDescuento !== 1 && temp.TipoDescuentoMatricula.Id === 1) {
              this.createDescuentoMatricula(descuentoMatricula);
            } else {
              Swal({
                type: 'error',
                title: this.translate.instant('GLOBAL.documento_programa') + '',
                text: this.translate.instant('ERROR.repetir_documentos'),
                footer: this.translate.instant('GLOBAL.crear') + '-' +
                  this.translate.instant('GLOBAL.documentos_programa'),
                confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
              });
              this.eventChange.emit(true);
              this.clean = !this.clean;
            }*/
          }
        } else {
          this.createDocumentoPrograma(documentoPrograma);
        }
      });
    this.eventChange.emit(true);
  }

  createDocumentoPrograma(documentoPrograma: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.crear'),
      text: this.translate.instant('GLOBAL.crear') + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      cancelButtonText: this.translate.instant('GLOBAL.cancelar'),
    };
    Swal(opt)
      .then((willDelete) => {
        this.loading = true;
        if (willDelete.value) {
          const files = []
          this.info_documento_programa = <SoporteDocumentoPrograma>documentoPrograma;
          this.info_documento_programa.Ente = this.user.getEnte();
          if (this.info_documento_programa.Soporte.file !== undefined) {
            files.push({
              nombre: this.autenticationService.getPayload().sub, key: 'SoporteDocumentoPrograma',
              file: this.info_documento_programa.Soporte.file, IdDocumento: 6,
            });
          }
          this.nuxeoService.getDocumentos$(files, this.documentoService)
            .subscribe(response => {
              if (Object.keys(response).length === files.length) {
                const filesUp = <any>response;
                if (filesUp['SoporteDocumentoPrograma'] !== undefined) {
                  this.info_documento_programa.Enlace = filesUp['SoporteDocumentoPrograma'].Id;
                }
                this.documentoProgramaService.post('soporte_documento_programa', this.info_documento_programa)
                  .subscribe(res => {
                    const r = <any>res
                    if (r !== null && r.Type !== 'error') {
                      this.eventChange.emit(true);
                      this.showToast('info', this.translate.instant('GLOBAL.crear'),
                        this.translate.instant('GLOBAL.documento_programa') + ' ' +
                        this.translate.instant('GLOBAL.confirmarCrear'));
                      this.clean = !this.clean;
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
                        footer: this.translate.instant('GLOBAL.crear') + '-' +
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
                  footer: this.translate.instant('GLOBAL.crear') + '-' +
                    this.translate.instant('GLOBAL.documento_programa') + '|' +
                    this.translate.instant('GLOBAL.soporte_documento'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
    this.loadDocumentoPrograma();
  }

  ngOnInit() {
    this.loadDocumentoPrograma();
  }

  setPercentage(event) {
    this.percentage = event;
    this.result.emit(this.percentage);
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_documento_programa === undefined) {
        this.crearNuevoDocumentoPrograma(event.data.DocumentoPrograma)
        this.loadDocumentoPrograma();
      } else {
        this.updateDocumentoPrograma(event.data.DocumentoPrograma);
        this.loadDocumentoPrograma();
      }
    }
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
}
