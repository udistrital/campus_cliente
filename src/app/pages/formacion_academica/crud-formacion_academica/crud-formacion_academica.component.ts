import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lugar } from './../../../@core/data/models/lugar';
// import { InfoFormacionAcademica } from './../../../@core/data/models/info_formacion_academica';
import { FORM_FORMACION_ACADEMICA } from './form-formacion_academica';
import { UbicacionesService } from '../../../@core/data/ubicaciones.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { Organizacion } from '../../../@core/data/models/organizacion';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { DocumentoService } from '../../../@core/data/documento.service';

@Component({
  selector: 'ngx-crud-formacion-academica',
  templateUrl: './crud-formacion_academica.component.html',
  styleUrls: ['./crud-formacion_academica.component.scss'],
})
export class CrudFormacionAcademicaComponent implements OnInit {
  config: ToasterConfig;
  info_formacion_academica_id: number;
  organizacion: any;
  ente: number;
  SoporteDocumento: any;
  filesUp: any;

  @Input('info_formacion_academica_id')
  set name(info_formacion_academica_id: number) {
    this.info_formacion_academica_id = info_formacion_academica_id;
    this.loadInfoFormacionAcademica();
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  info_formacion_academica: any;
  formInfoFormacionAcademica: any;
  regInfoFormacionAcademica: any;
  clean: boolean;
  loading: boolean;
  percentage: number;
  paisSelecccionado: any;

  constructor(
    private translate: TranslateService,
    private ubicacionesService: UbicacionesService,
    private campusMidService: CampusMidService,
    private programaService: ProgramaAcademicoService,
    private autenticationService: ImplicitAutenticationService,
    private documentoService: DocumentoService,
    private nuxeoService: NuxeoService,
    private users: UserService,
    private toasterService: ToasterService) {
    this.formInfoFormacionAcademica = FORM_FORMACION_ACADEMICA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsPais();
    this.ente = this.users.getEnte();
    this.loading = false;
  }

  construirForm() {
    // this.formInfoFormacionAcademica.titulo = this.translate.instant('GLOBAL.formacion_academica');
    this.formInfoFormacionAcademica.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formInfoFormacionAcademica.campos.length; i++) {
      this.formInfoFormacionAcademica.campos[i].label = this.translate.instant('GLOBAL.' + this.formInfoFormacionAcademica.campos[i].label_i18n);
      this.formInfoFormacionAcademica.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formInfoFormacionAcademica.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getPais(event) {
    this.paisSelecccionado = event.valor;
    this.loadOptionsPaisUniversidad();
  }

  loadOptionsPais(): void {
    let paisNacimiento: Array<any> = [];
    this.ubicacionesService.get('lugar/?query=TipoLugar.Nombre:PAIS&limit=0')
      .subscribe(res => {
        if (res !== null) {
          paisNacimiento = <Array<Lugar>>res;
        }
        this.formInfoFormacionAcademica.campos[this.getIndexForm('Pais')].opciones = paisNacimiento;
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

  loadInfoPostgrados(institucion) {
    this.programaService.get('/programa_academico/?query=Institucion:' + institucion + '&limit=0')
      .subscribe(res => {
        if (res !== null) {
          const r = <any>res;
          this.formInfoFormacionAcademica.campos[this.getIndexForm('ProgramaAcademico')].opciones = r;
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

  loadOptionsPaisUniversidad(): void {
    let consultaHijos: Array<any> = [];
    const ciudadUniversidad: Array<any> = [];
    if (this.paisSelecccionado) {
      this.ubicacionesService.get('relacion_lugares/?query=LugarPadre.Id:' + this.paisSelecccionado.Id)
        .subscribe(res => {
          if (res !== null) {
            consultaHijos = <Array<Lugar>>res;
            for (let i = 0; i < consultaHijos.length; i++) {
              ciudadUniversidad.push(consultaHijos[i].LugarHijo);
            }
          }
          this.formInfoFormacionAcademica.campos[this.getIndexForm('CiudadUniversidad')].opciones = ciudadUniversidad;
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
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formInfoFormacionAcademica.campos.length; index++) {
      const element = this.formInfoFormacionAcademica.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  addUbicacionOrganizacion(ubicacion: any): void {
    this.campusMidService.post('persona/RegistrarUbicaciones', ubicacion).subscribe(res => {
      const r = res as any;
      if (res !== null && r.Type === 'error') {
        this.showToast('error', 'error',
          'Ocurrio un error agregando la ubicación');
      }
    },
      (error: HttpErrorResponse) => {
        Swal({
          type: 'error',
          title: error.status + '',
          text: this.translate.instant('ERROR.' + error.status),
          footer: this.translate.instant('GLOBAL.crear') + '-' +
            this.translate.instant('GLOBAL.formacion_academica') + '|' +
            this.translate.instant('GLOBAL.pais_universidad'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
  }

  createOrganizacion(org: any, exp: any): void {
    this.campusMidService.post('organizacion', org).subscribe(res => {
      const identificacion = <any>res;
      if (identificacion !== null && identificacion.Type !== 'error') {
        exp.Organizacion = identificacion.Body.Ente.Id;
        const ubicacion = {
          Ente: identificacion.Body.Ente.Id,
          Lugar: org.Pais,
          TipoRelacionUbicacionEnte: 3,
          Atributos: [{
            AtributoUbicacion: 1,
            Valor: org.Direccion,
          }],
        };
        this.addUbicacionOrganizacion(ubicacion);
        if (this.info_formacion_academica === undefined) {
          this.createInfoFormacionAcademica(exp);
        } else {
          this.updateInfoFormacionAcademica(exp);
        }
      }
    },
      (error: HttpErrorResponse) => {
        Swal({
          type: 'error',
          title: error.status + '',
          text: this.translate.instant('ERROR.' + error.status),
          footer: this.translate.instant('GLOBAL.crear') + '-' +
            this.translate.instant('GLOBAL.formacion_academica') + '|' +
            this.translate.instant('GLOBAL.nombre_universidad'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
  }

  searchDoc(data) {
    const nit = typeof data === 'string' ? data : data.data.Nit;
    this.campusMidService.get('organizacion/identificacion/?id=' + nit + '&tipoid=5')
      .subscribe(res => {
        const init = this.getIndexForm('Nit');
        const inombre = this.getIndexForm('NombreEmpresa');
        const idir = this.getIndexForm('Direccion');
        const itel = this.getIndexForm('Telefono');
        const icorreo = this.getIndexForm('Correo');
        const ipais = this.getIndexForm('Pais');
        this.organizacion = new Organizacion();
        if (res !== null) {
          this.organizacion = <Organizacion>res;
        } else {
          this.organizacion.NumeroIdentificacion = nit;
          [this.formInfoFormacionAcademica.campos[inombre],
          this.formInfoFormacionAcademica.campos[idir],
          this.formInfoFormacionAcademica.campos[icorreo],
          this.formInfoFormacionAcademica.campos[ipais],
          this.formInfoFormacionAcademica.campos[itel]]
            .forEach(element => {
              element.valor = null;
            });
        }
        this.loadInfoPostgrados(this.organizacion.Ente.Id);
        this.formInfoFormacionAcademica.campos[init].valor = this.organizacion.NumeroIdentificacion;
        this.formInfoFormacionAcademica.campos[inombre].valor = this.organizacion.Nombre;
        if (this.organizacion.Ubicacion) {
          this.organizacion.Ubicacion.forEach(element => {
            // identificadores del tipo de relacion y atributo para formulario
            if (element.AtributoUbicacion.Id === 1 && element.UbicacionEnte.TipoRelacionUbicacionEnte.Id === 3) {
              this.formInfoFormacionAcademica.campos[idir].valor = element.Valor;
              this.formInfoFormacionAcademica.campos[ipais].opciones.forEach(e => {
                if (e.Id === element.UbicacionEnte.Lugar) {
                  this.formInfoFormacionAcademica.campos[ipais].valor = e;
                }
              });
            }
          });
        } else {
          this.formInfoFormacionAcademica.campos[idir].valor = null;
          this.formInfoFormacionAcademica.campos[ipais].valor = null;
        }
        if (this.organizacion.Contacto) {
          this.organizacion.Contacto.forEach(element => {
            if (element.TipoContacto.Id === 1) {
              this.formInfoFormacionAcademica.campos[itel].valor = element.Valor;
            }
            if (element.TipoContacto.Id === 3) {
              this.formInfoFormacionAcademica.campos[icorreo].valor = element.Valor;
            }
          });
        } else {
          this.formInfoFormacionAcademica.campos[itel].valor = null;
          this.formInfoFormacionAcademica.campos[icorreo].valor = null;
        }
        [this.formInfoFormacionAcademica.campos[inombre],
        this.formInfoFormacionAcademica.campos[idir],
        this.formInfoFormacionAcademica.campos[icorreo],
        this.formInfoFormacionAcademica.campos[ipais],
        this.formInfoFormacionAcademica.campos[itel]]
          .forEach(element => {
            element.deshabilitar = element.valor ? true : false
          });
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

  public loadInfoFormacionAcademica(): void {
    this.loading = true;
    if (this.info_formacion_academica_id !== undefined &&
      this.info_formacion_academica_id !== 0 &&
      this.info_formacion_academica_id.toString() !== '') {
      this.campusMidService.get('formacion/formacionacademica/?id=' + this.users.getEnte() + '&idformacion=' +
        this.info_formacion_academica_id)
        .subscribe(res => {
          if (res !== null) {
            const temp = <any>res;
            const files = []
            if (temp.Documento + '' !== '0') {
              files.push({ Id: temp.Documento, key: 'Documento' });
            }
            this.nuxeoService.getDocumentoById$(files, this.documentoService)
              .subscribe(response => {
                const filesResponse = <any>response;
                if (Object.keys(filesResponse).length === files.length) {
                  this.programaService.get('programa_academico/?query=id:' + temp.Titulacion)
                    .subscribe(programa => {
                      if (programa !== null) {
                        const programa_info = <any>programa[0];
                        temp.ProgramaAcademico = programa_info;
                        this.campusMidService.get('organizacion/identificacionente/?Ente=' + programa_info.Institucion)
                          .subscribe(organizacion => {
                            if (organizacion !== null) {
                              const organizacion_info = <any>organizacion;
                              this.searchDoc(organizacion_info.NumeroIdentificacion);
                              this.SoporteDocumento = temp.Documento;
                              temp.Documento = filesResponse['Documento'] + '';
                              this.info_formacion_academica = temp;
                              this.loading = false;
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
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.formacion_academica') + '|' +
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
                this.translate.instant('GLOBAL.formacion_academica'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    } else {
      this.info_formacion_academica = undefined
      this.clean = !this.clean;
      this.SoporteDocumento = [];
      this.loading = false;
    }
  }

  updateInfoFormacionAcademica(infoFormacionAcademica: any): void {
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
          this.info_formacion_academica = <any>infoFormacionAcademica;
          const files = [];
          if (this.info_formacion_academica.Documento.file !== undefined) {
            files.push({ file: this.info_formacion_academica.Documento.file, documento: this.SoporteDocumento, key: 'Documento' });
          }
          if (files.length !== 0) {
            this.nuxeoService.updateDocument$(files, this.documentoService)
              .subscribe(response => {
                if (Object.keys(response).length === files.length) {
                  const documentos_actualizados = <any>response;
                  this.info_formacion_academica.Documento = this.SoporteDocumento;
                  this.info_formacion_academica.Id = this.info_formacion_academica_id;
                  this.campusMidService.put('/formacion/formacionacademica/' +
                    this.info_formacion_academica_id, this.info_formacion_academica)
                    .subscribe(res => {
                      if (documentos_actualizados['Documento'] !== undefined) {
                        this.info_formacion_academica.Documento = documentos_actualizados['Documento'].url + '';
                      }
                      this.loading = false;
                      this.eventChange.emit(true);
                      this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                        this.translate.instant('GLOBAL.formacion_academica') + ' ' +
                        this.translate.instant('GLOBAL.confirmarActualizar'));
                      this.info_formacion_academica_id = 0;
                      this.loadInfoFormacionAcademica();
                    },
                      (error: HttpErrorResponse) => {
                        Swal({
                          type: 'error',
                          title: error.status + '',
                          text: this.translate.instant('ERROR.' + error.status),
                          footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                            this.translate.instant('GLOBAL.formacion_academica'),
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
                      this.translate.instant('GLOBAL.formacion_academica') + '|' +
                      this.translate.instant('GLOBAL.soporte_documento'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          } else {
            this.info_formacion_academica.Documento = this.SoporteDocumento;
            this.info_formacion_academica.Id = this.info_formacion_academica_id;
            this.campusMidService.put('/formacion/formacionacademica/' +
              this.info_formacion_academica_id, this.info_formacion_academica)
              .subscribe(res => {
                this.loading = false;
                this.eventChange.emit(true);
                this.showToast('info', this.translate.instant('GLOBAL.actualizar'),
                  this.translate.instant('GLOBAL.formacion_academica') + ' ' +
                  this.translate.instant('GLOBAL.confirmarActualizar'));
                this.info_formacion_academica_id = 0;
                this.loadInfoFormacionAcademica();
              },
                (error: HttpErrorResponse) => {
                  this.loading = false;
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                      this.translate.instant('GLOBAL.formacion_academica'),
                    confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                  });
                });
          }
        }
      });
  }

  createInfoFormacionAcademica(infoFormacionAcademica: any): void {
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
          this.info_formacion_academica = <any>infoFormacionAcademica;
          if (this.info_formacion_academica.Documento.file !== undefined) {
            files.push({
              nombre: this.autenticationService.getPayload().sub, key: 'Documento',
              file: this.info_formacion_academica.Documento.file, IdDocumento: 3,
            });
          }
          this.nuxeoService.getDocumentos$(files, this.documentoService)
            .subscribe(response => {
              if (Object.keys(response).length === files.length) {
                this.filesUp = <any>response;
                if (this.filesUp['Documento'] !== undefined) {
                  this.info_formacion_academica.Documento = this.filesUp['Documento'].Id;
                }
                this.campusMidService.post('formacion/formacionacademica', this.info_formacion_academica)
                  .subscribe(res => {
                    const r = <any>res;
                    if (r !== null && r.Type !== 'error') {
                      this.loading = false;
                      this.eventChange.emit(true);
                      this.showToast('info', this.translate.instant('GLOBAL.crear'),
                        this.translate.instant('GLOBAL.formacion_academica') + ' ' +
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
                          this.translate.instant('GLOBAL.formacion_academica'),
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
                    this.translate.instant('GLOBAL.formacion_academica') + '|' +
                    this.translate.instant('GLOBAL.soporte_documento'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  ngOnInit() {
    this.loadInfoFormacionAcademica();
  }

  setPercentage(event) {
    this.percentage = event;
    this.result.emit(this.percentage);
  }

  validarForm(event) {
    if (event.valid) {
      const formacion = {
        Ente: { Id: this.ente },
        ProgramaAcademico: event.data.InfoFormacionAcademica.ProgramaAcademico,
        FechaInicio: event.data.InfoFormacionAcademica.FechaInicio,
        FechaFinalizacion: event.data.InfoFormacionAcademica.FechaFinalizacion,
        TituloTrabajoGrado: event.data.InfoFormacionAcademica.TituloTrabajoGrado,
        DescripcionTrabajoGrado: event.data.InfoFormacionAcademica.DescripcionTrabajoGrado,
        Documento: event.data.InfoFormacionAcademica.Documento,
      }
      const organizacion = this.organizacion.Ente ? this.organizacion.Ente.Id : null;

      const org = {
        NumeroIdentificacion: event.data.InfoFormacionAcademica.Nit,
        Direccion: event.data.InfoFormacionAcademica.Direccion,
        Pais: event.data.InfoFormacionAcademica.Pais,
        Nombre: event.data.InfoFormacionAcademica.NombreEmpresa,
        TipoOrganizacion: event.data.InfoFormacionAcademica.TipoOrganizacion,
        TipoIdentificacion: {
          Id: 5, // tipo nit
        },
        Contacto: [],
        // "FechaExpedicion": "string"
      }

      if (event.data.InfoFormacionAcademica.Telefono) {
        org.Contacto.push({
          TipoContacto: { Id: 1 }, // corresponde al tipo telefono
          Valor: event.data.InfoFormacionAcademica.Telefono,
        });
      }
      if (event.data.InfoFormacionAcademica.Correo) {
        org.Contacto.push({
          TipoContacto: { Id: 3 }, // corresponde al tipo correo
          Valor: event.data.InfoFormacionAcademica.Correo,
        });
      }

      if (this.info_formacion_academica === undefined) {
        if (organizacion !== null) {
          this.createInfoFormacionAcademica(formacion);
        } else {
          this.createOrganizacion(org, formacion);
        }
      } else {
        if (this.organizacion.Ente) {
          this.updateInfoFormacionAcademica(formacion);
        } else {
          this.createOrganizacion(org, formacion);
        }
      }
      this.result.emit(event);
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
