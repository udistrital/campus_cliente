import { TipoProduccionAcademica } from './../../../@core/data/models/tipo_produccion_academica';
import { NuxeoService } from '../../../@core/utils/nuxeo.service';
import { DocumentoService } from '../../../@core/data/documento.service';
import { EstadoAutorProduccion } from './../../../@core/data/models/estado_autor_produccion';
import { SubTipoProduccionAcademica } from './../../../@core/data/models/subtipo_produccion_academica';
import { UserService } from '../../../@core/data/users.service';
import { PersonaService } from '../../../@core/data/persona.service';
import { ProduccionAcademicaPost } from './../../../@core/data/models/produccion_academica';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduccionAcademicaService } from '../../../@core/data/produccion_academica.service';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { FORM_produccion_academica } from './form-produccion_academica';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { HttpErrorResponse } from '@angular/common/http';
import { MetadatoSubtipoProduccion } from '../../../@core/data/models/metadato_subtipo_produccion';
import { Persona } from '../../../@core/data/models/persona';
// import { p } from '@angular/core/src/render3';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-crud-produccion-academica',
  templateUrl: './crud-produccion_academica.component.html',
  styleUrls: ['./crud-produccion_academica.component.scss'],
})
export class CrudProduccionAcademicaComponent implements OnInit {
  config: ToasterConfig;
  produccion_academica_selected: ProduccionAcademicaPost;
  tipoProduccionAcademica: TipoProduccionAcademica;
  SubtipoProduccionId: SubTipoProduccionAcademica;

  @Input('produccion_academica_selected')
  set name(produccion_academica_selected: ProduccionAcademicaPost) {
    this.produccion_academica_selected = produccion_academica_selected;
    this.loadProduccionAcademica();
  }

  @Output() eventChange = new EventEmitter();

  info_produccion_academica: ProduccionAcademicaPost;
  tiposProduccionAcademica: Array<TipoProduccionAcademica>;
  estadosAutor: Array<EstadoAutorProduccion>;
  subtiposProduccionAcademica: Array<SubTipoProduccionAcademica>;
  subtiposProduccionAcademicaFiltrados: Array<SubTipoProduccionAcademica>;
  personas: Array<Persona>;
  source_authors: Array<any> = [];
  userData: Persona;
  autorSeleccionado: Persona;
  formProduccionAcademica: any;
  regProduccionAcademica: any;
  clean: boolean;
  formConstruido: boolean;
  creandoAutor: boolean;
  editando: boolean;
  settings_authors: any;
  source: LocalDataSource = new LocalDataSource();
  Metadatos: any[];

  constructor(private translate: TranslateService,
    private produccionAcademicaService: ProduccionAcademicaService,
    private user: UserService,
    private nuxeoService: NuxeoService,
    private documentoService: DocumentoService,
    private personaService: PersonaService,
    private toasterService: ToasterService,
    private campusMidService: CampusMidService) {
    this.formProduccionAcademica = JSON.parse(JSON.stringify(FORM_produccion_academica));
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptions();
    this.settings_authors = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        edit: false,
        add: true,
        delete: true,
        columnTitle: '',
        position: 'right',
      },
      mode: 'external',
      columns: {
        Nombre: {
          title: this.translate.instant('GLOBAL.autor'),
          width: '60%',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        EstadoAutorProduccionId: {
          title: this.translate.instant('GLOBAL.estado_autor'),
          width: '30%',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
        },
      },
    };
  }

  construirForm() {
    this.formProduccionAcademica.titulo = this.translate.instant('GLOBAL.produccion_academica');
    this.formProduccionAcademica.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formProduccionAcademica.campos.length; i++) {
      this.formProduccionAcademica.campos[i].label = this.translate.instant('GLOBAL.' + this.formProduccionAcademica.campos[i].label_i18n);
      this.formProduccionAcademica.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formProduccionAcademica.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptions(): void {
    this.loadEstadosAutor()
    .then(() => {
      Promise.all([
        // this.loadEstadosAutor(),
        this.loadOptionsTipoProduccionAcademica(),
        this.loadOptionsSubTipoProduccionAcademica(),
        this.loadAutores(),
        this.loadUserData(),
      ]).
        then(() => {

        })
        .catch(error => {
          if (!error.status) {
            error.status = 409;
          }
          Swal({
             type: 'error',
             title: error.status + '',
             text: this.translate.instant('ERROR.' + error.status),
             confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
           });
        });
    })
    .catch(error => {
      if (!error.status) {
        error.status = 409;
      }
      Swal({
         type: 'error',
         title: error.status + '',
         text: this.translate.instant('ERROR.' + error.status),
         confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
       });
    });
  }

  loadUserData(): Promise<any> {
    this.source_authors = [];
    this.source.load(this.source_authors);
    return new Promise((resolve, reject) => {
        this.personaService.get('persona/?query=Id:' + this.user.getEnte())
        .subscribe(res => {
          // if (res !== null) {
          if (Object.keys(res[0]).length > 0) {
            this.userData = <Persona>res[0];
            this.userData['PuedeBorrar'] = false;
            /*
            this.userData['EstadoAutorProduccion'] = {
              Id: 1,
              Nombre: 'Autor principal',
            };
            */
            this.userData['Nombre'] = this.getFullAuthorName(this.userData);
            this.autorSeleccionado = JSON.parse(JSON.stringify(this.userData));
            this.agregarAutor(false, 1);
            // this.source_authors.push(this.userData);
            // this.source.load(this.source_authors);
            this.autorSeleccionado = undefined;
            resolve(true);
          } else {
            this.tiposProduccionAcademica = [];
            reject({status: 404});
          }
        }, (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  getFullAuthorName(p: Persona): string {
    return p.PrimerNombre + ' ' + p.SegundoNombre + ' ' + p.PrimerApellido + ' ' + p.SegundoApellido;
  }

  loadAutores(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.personaService.get('persona/?limit=0')
        .subscribe(res => {
          // if (res !== null) {
          if (Object.keys(res[0]).length > 0) {
            this.personas = <Array<Persona>>res;
            this.personas.forEach( (persona: Persona) => {
              persona['Nombre'] = this.getFullAuthorName(persona);
            });
            resolve(true);
          } else {
            this.personas = [];
            reject({status: 404});
          }
        }, (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  loadEstadosAutor(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.produccionAcademicaService.get('estado_autor_produccion/?limit=0')
        .subscribe(res => {
          // if (res !== null) {
          if (Object.keys(res[0]).length > 0) {
            this.estadosAutor = <Array<EstadoAutorProduccion>>res;
            resolve(true);
          } else {
            this.estadosAutor = [];
            reject({status: 404});
          }
        }, (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  loadOptionsTipoProduccionAcademica(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.produccionAcademicaService.get('tipo_produccion/?limit=0')
        .subscribe(res => {
          // if (res !== null) {
          if (Object.keys(res[0]).length > 0) {
            this.tiposProduccionAcademica = <Array<TipoProduccionAcademica>>res;
            resolve(true);
          } else {
            this.tiposProduccionAcademica = [];
            reject({status: 404});
          }
        }, (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  loadOptionsSubTipoProduccionAcademica(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.produccionAcademicaService.get('subtipo_produccion/?limit=0')
        .subscribe (res => {
          if (res !== null) {
            this.subtiposProduccionAcademica = <Array<SubTipoProduccionAcademica>>res;
            resolve(true);
          } else {
            this.subtiposProduccionAcademica = [];
            reject({status: 404});
          }
        }, (error: HttpErrorResponse) => {
          reject(error);
        });
    });
  }

  filterSubTypes(tipoProduccionAcademica: TipoProduccionAcademica) {
    this.SubtipoProduccionId = undefined;
    this.formConstruido = false;
    this.subtiposProduccionAcademicaFiltrados = this.subtiposProduccionAcademica.filter(subTipo => subTipo.TipoProduccionId.Id === tipoProduccionAcademica.Id);
  }

  // fillform2(){
  //   // this.formProduccionAcademica.campos, this.info_produccion_academica.Metadatos, this.nuxeoService, this.documentoService
  //   const filesToGet = [];
  //   this.formProduccionAcademica.campos.forEach(campo => {
  //     this.info_produccion_academica.Metadatos.forEach( metadato => {
  //         // const field = JSON.parse(datoAdicional.DatoAdicionalSubtipoProduccion.TipoDatoAdicional.FormDefiniton);
  //         if (campo.nombre === metadato.MetadatoSubtipoProduccionId.Id.toString()) {
  //           campo.valor = metadato.Valor;
  //           if (campo.etiqueta === 'file') {
  //             campo.idFile = parseInt(metadato.Valor, 10);
  //             filesToGet.push({Id: campo.idFile, key: campo.nombre});
  //           }
  //         };
  //     });
  //   });
  //   console.info("LONGITUD: " + filesToGet.length); //Contenido campos
  //   if (filesToGet.length !== 0) {
  //     // new Promise((resolve, reject) => {
  //     this.nuxeoService.getDocumentoById$(filesToGet, this.documentoService)
  //       .subscribe(response => {
  //         console.info("ENTRA");
  //         const filesResponse = <any>response;
  //         console.info("ENTRA: " + Object.keys(filesResponse).length + " " + filesToGet.length);
  //         if (Object.keys(filesResponse).length === filesToGet.length) {
  //           this.formProduccionAcademica.campos.forEach(campo => {
  //             if (campo.etiqueta === 'file') {
  //               console.info("NUXEO " + JSON.stringify(filesResponse));
  //               campo.url = filesResponse[campo.nombre] + '';
  //               campo.urlTemp = filesResponse[campo.nombre] + '';
  //               console.info(JSON.stringify(campo));
  //               //return campos;
  //             }
  //           });
  //         }
  //       console.info(JSON.stringify(this.formProduccionAcademica.campos));
  //       // this.formProduccionAcademica.campos=campos;
  //       // this.eventChange.emit(true);
  //       // resolve(true);
  //       },
  //       (error: HttpErrorResponse) => {
  //         Swal({
  //           type: 'error',
  //           title: error.status + '',
  //           text: this.translate.instant('ERROR.' + error.status),
  //           confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
  //         });
  //         // reject(error);
  //       });
  //     // });
  //   }
  // }

  // loadSubTipoFormFields2(subtipoProduccionAcademica: SubTipoProduccionAcademica){
  //   this.formProduccionAcademica = JSON.parse(JSON.stringify(FORM_produccion_academica));
  //   const query = `query=SubtipoProduccionId:${subtipoProduccionAcademica.Id}`;
  //   this.produccionAcademicaService.get(`metadato_subtipo_produccion/?limit=0&${query}`)
  //       .subscribe(res => {
  //         if (res !== null) {
  //           (<Array<MetadatoSubtipoProduccion>>res).forEach(metadato => {
  //             if (Object.keys(metadato).length > 0) {
  //               const field = JSON.parse(metadato.TipoMetadatoId.FormDefinition);
  //               field.nombre = metadato.Id.toString();
  //               this.formProduccionAcademica.campos.push(field);
  //             }
  //           });
  //             this.fillform2();
  //           this.construirForm();
  //           this.formConstruido = true;
  //           //resolve(true);
  //         }
  //       }, (error: HttpErrorResponse) => {
  //         Swal({
  //           type: 'error',
  //           title: error.status + '',
  //           text: this.translate.instant('ERROR.' + error.status),
  //           confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
  //         });
  //         // reject(error);
  //       });
  // }

  loadSubTipoFormFields(subtipoProduccionAcademica: SubTipoProduccionAcademica, callback: Function) {
    this.formProduccionAcademica = JSON.parse(JSON.stringify(FORM_produccion_academica));
    this.construirForm();
    this.formConstruido = false;
    const query = `query=SubtipoProduccionId:${subtipoProduccionAcademica.Id}`;
    // return new Promise((resolve, reject) => {
    this.produccionAcademicaService.get(`metadato_subtipo_produccion/?limit=0&${query}`)
        .subscribe(res => {
          if (res !== null) {
            (<Array<MetadatoSubtipoProduccion>>res).forEach(metadato => {
              if (Object.keys(metadato).length > 0) {
                const field = JSON.parse(metadato.TipoMetadatoId.FormDefinition);
                field.nombre = metadato.Id.toString();
                this.formProduccionAcademica.campos.push(field);
              }
            });
            if (callback !== undefined) {
              callback(this.formProduccionAcademica.campos, this.info_produccion_academica.Metadatos, this.nuxeoService, this.documentoService);
            } else {
              this.formProduccionAcademica.campos.forEach(campo => {
                      campo.valor = null;
              });
            }
            this.construirForm();
            this.formConstruido = true;
          }
        }, (error: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error.status + '',
            text: this.translate.instant('ERROR.' + error.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  /*
  loadOptionsCiudadPublicacion(): void {
    let ciudadPublicacion: Array<any> = [];
      this.ubicacionesService.get('lugar/?query=TipoLugar.Id:2')
        .subscribe(res => {
          if (res !== null) {
            ciudadPublicacion = <Array<Lugar>>res;
          }
          this.formProduccionAcademica.campos[this.getIndexForm('Ubicacion')].opciones = ciudadPublicacion;
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
  */

  /*
  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formProduccionAcademica.campos.length; index++) {
      const element = this.formProduccionAcademica.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }
  */

  public loadProduccionAcademica(): void {
    if (this.produccion_academica_selected !== undefined ) {
      /*
      this.produccionAcademicaService.get('produccion_academica/?query=id:' + this.produccion_academica_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_produccion_academica = <ProduccionAcademicaPost>res[0];
          }
        });
      */
      this.info_produccion_academica = JSON.parse(JSON.stringify(this.produccion_academica_selected));
      this.source_authors = this.info_produccion_academica.Autores;
      this.source.load(this.source_authors);
      this.Metadatos = [];
      // console.info(JSON.stringify(this.info_produccion_academica.SubtipoProduccionId));
      console.info(JSON.stringify(this.info_produccion_academica.Metadatos));
      // console.info("Informacion callback"));
      // this.formProduccionAcademica =promesa JSON.parse(JSON.stringify(FORM_produccion_academica));
      const fillForm = function(campos, Metadatos, nuxeoService, documentoService){
        // this.formProduccionAcademica.campos, this.info_produccion_academica.Metadatos, this.nuxeoService, this.documentoService
        const filesToGet = [];
        campos.forEach(campo => {
          Metadatos.forEach( metadato => {
              // const field = JSON.parse(datoAdicional.DatoAdicionalSubtipoProduccion.TipoDatoAdicional.FormDefiniton);
              if (campo.nombre === metadato.MetadatoSubtipoProduccionId.Id.toString()) {
                campo.valor = metadato.Valor;
                if (campo.etiqueta === 'file') {
                  campo.idFile = parseInt(metadato.Valor, 10);
                  filesToGet.push({Id: campo.idFile, key: campo.nombre});
                }
              };
          });
        });
        if (filesToGet.length !== 0) {
          nuxeoService.getDocumentoById$(filesToGet, documentoService)
            .subscribe(response => {
              const filesResponse = <any>response;
              if (Object.keys(filesResponse).length === filesToGet.length) {
                campos.forEach(campo => {
                  if (campo.etiqueta === 'file') {
                    campo.url = filesResponse[campo.nombre] + '';
                    campo.urlTemp = filesResponse[campo.nombre] + '';
                  }
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
        }
        // construirForm();
        // this.formConstruido = true;
        // this.editando = true;
      }
      this.loadSubTipoFormFields(this.info_produccion_academica.SubtipoProduccionId, fillForm);
      // this.loadSubTipoFormFields2(this.info_produccion_academica.SubtipoProduccionId);
      this.construirForm();
      this.formConstruido = true;
      this.editando = true;
    } else  {
      this.info_produccion_academica = new ProduccionAcademicaPost();
      this.clean = !this.clean;
      this.editando = false;
      this.formConstruido = false;
      this.loadUserData();
      this.Metadatos = [];
    }
  }

  updateProduccionAcademica(ProduccionAcademica: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.actualizar'),
      text: this.translate.instant('GLOBAL.seguro_continuar_actualizar_produccion'),
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_produccion_academica = <ProduccionAcademicaPost>ProduccionAcademica;
        this.campusMidService.put('produccion_academica/' + this.info_produccion_academica.Id, this.info_produccion_academica)
        .subscribe((res: any) => {
          if (res.Type === 'error') {
            Swal({
              type: 'error',
              title: res.Code,
              text: this.translate.instant('ERROR.' + res.Code),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
            this.showToast('error', 'Error', this.translate.instant('GLOBAL.produccion_no_actualizada'));
          } else {
            this.info_produccion_academica = <ProduccionAcademicaPost>res;

            this.eventChange.emit(true);
            this.showToast('success', this.translate.instant('GLOBAL.actualizar'), this.translate.instant('GLOBAL.produccion_actualizada'));
          }
        });
      }
    });
  }

  createProduccionAcademica(ProduccionAcademica: any): void {
    const opt: any = {
      title: this.translate.instant('GLOBAL.registrar'),
      text: this.translate.instant('GLOBAL.seguro_continuar_registrar_produccion'),
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willCreate) => {
      if (willCreate.value) {
        this.info_produccion_academica = <ProduccionAcademicaPost>ProduccionAcademica;
        // this.info_produccion_academica.Persona = this.user.PersonaId();
        /*this.produccionAcademicaService.post('produccion_academica', this.info_produccion_academica)
          .subscribe(res => {
            this.info_produccion_academica = <ProduccionAcademica>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'ProduccionAcademica created');
          });
          */
        this.campusMidService.post('produccion_academica', this.info_produccion_academica)
        .subscribe((res: any) => {
          if (res.Type === 'error') {
            Swal({
              type: 'error',
               title: res.Code,
              text: this.translate.instant('ERROR.' + res.Code),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
            this.showToast('error', 'error', this.translate.instant('GLOBAL.produccion_no_creada'));
          } else {
            this.info_produccion_academica = <ProduccionAcademicaPost>res;
            this.eventChange.emit(true);
            this.showToast('success', this.translate.instant('GLOBAL.crear'), this.translate.instant('GLOBAL.produccion_creada'));
          }
        });
      }
    });
  }

  agregarAutor(mostrarError: boolean, estadoAutor: number): void {
    if (this.source_authors.find( author => author.Persona === this.autorSeleccionado.Id) ) {
      if (mostrarError) {
        Swal({
          type: 'error',
          title: 'ERROR',
          text: this.translate.instant('GLOBAL.error_autor_ya_existe'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      }
    } else {
      this.source_authors.push({
        Nombre: this.getFullAuthorName(this.autorSeleccionado),
        Persona: this.autorSeleccionado.Id,
        // EstadoAutorProduccion: this.estadosAutor.filter(estado => estado.Id === 3)[0],
        EstadoAutorProduccionId: this.estadosAutor.filter(estado => estado.Id === estadoAutor)[0],
        // PuedeBorrar: true,
        PuedeBorrar: estadoAutor !== 1,
      });
      this.autorSeleccionado = undefined;
      this.creandoAutor = false;
      this.source.load(this.source_authors);
    }
  }

  ngOnInit() {
    this.loadProduccionAcademica();
  }

  onDeleteAuthor(event): void {
    if (event.data.PuedeBorrar) {
      this.source_authors.splice(this.source_authors.indexOf(event.data), this.source_authors.indexOf(event.data));
      this.source.load(this.source_authors);
    } else {
      Swal({
        type: 'error',
        title: 'ERROR',
        text: this.translate.instant('GLOBAL.error_autor_borrar'),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    }
  }

  uploadFilesToMetadaData(files, metadatos) {
    return new Promise((resolve, reject) => {
      files.forEach((file) => {
        file.Id = file.nombre;
        file.IdDocumento = 3;
        file.nombre = 'soporte_' + file.Id + '_prod_' + this.userData.Id;
        file.key = file.Id;
       });
      this.nuxeoService.getDocumentos$(files, this.documentoService)
        .subscribe(response => {
          if (Object.keys(response).length === files.length) {
            files.forEach((file) => {
              metadatos.push({
                MetadatoSubtipoProduccionId: {'Id': Number(file.Id)},
                Valor: response[file.Id].Id + '', // Se castea el valor del string
              });
            });
            resolve(true);
          }
        }, error => {
          reject(error);
        });
    });
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_produccion_academica.Titulo === undefined ||
      this.info_produccion_academica.Fecha === undefined ||
      this.info_produccion_academica.Resumen === undefined) {
        Swal({
          type: 'warning',
          title: 'ERROR',
          text: this.translate.instant('GLOBAL.alerta_llenar_campos_datos_basicos'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      } else {
        const promises = [];
        if (event.data.ProduccionAcademica) {
          // Subir archivos y verificar los
          console.info(event.data.ProduccionAcademica);
          // const tempMetadatos = JSON.parse(JSON.stringify(event.data.ProduccionAcademica));
          const tempMetadatos = event.data.ProduccionAcademica;
          const keys = Object.keys(tempMetadatos);
          const metadatos = [];
          const filesToUpload = [];
          for (let i = 0; i < keys.length; i++) {
            if (tempMetadatos[keys[i]] !== undefined && tempMetadatos[keys[i]] !== null) {
              if (tempMetadatos[keys[i]].nombre) {
                // Archivo se debe subir a nuxeo
                if (tempMetadatos[keys[i]].file !== undefined) {
                  filesToUpload.push(tempMetadatos[keys[i]]);
                }
              } else {
                metadatos.push({
                  MetadatoSubtipoProduccionId: {'Id': parseInt(keys[i], 10)},
                  Valor: tempMetadatos[keys[i]],
                });
              }
            }
          }
          if (filesToUpload.length > 0) {
            // console.info(filesToUpload.length);
            promises.push(this.uploadFilesToMetadaData(filesToUpload, metadatos));
          }
          this.info_produccion_academica.Metadatos = metadatos;
        } else {
          this.info_produccion_academica.Metadatos = [];
          // console.log('NO ENCUENTRA DATA');
        }
        this.info_produccion_academica.Autores = JSON.parse(JSON.stringify(this.source_authors));
        Promise.all(promises)
          .then(() => {
            // console.info("promesas cumplidas subir produccion");
            // console.info("metadatos", this.info_produccion_academica.Metadatos);
            if ( this.produccion_academica_selected === undefined ) {
              this.createProduccionAcademica(this.info_produccion_academica);
            } else {
              this.updateProduccionAcademica(this.info_produccion_academica);
            }
            this.clean = !this.clean;
            this.editando = false;
            this.formConstruido = false;
            this.loadUserData();
            this.Metadatos = [];
          })
          .catch(error => {
            // console.log("error subiendo archivos", error);
            Swal({
              type: 'error',
              title: 'ERROR',
              text: this.translate.instant('GLOBAL.error_subir_documento'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
      }
    }
  }

  onCreateAuthor(event): void {
    if (!this.editando) {
      this.creandoAutor = !this.creandoAutor;
    } else {
      Swal({
        type: 'error',
        title: 'ERROR',
        text: this.translate.instant('GLOBAL.error_no_puede_editar_autores'),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
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
