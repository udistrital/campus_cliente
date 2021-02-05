import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { EventoService } from '../../../@core/data/evento.service'
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { UtilidadesService } from '../../../@core/utils/utilidades.service';
import { ProgramaOikosService } from '../../../@core/data/programa_oikos.service';
import { InscripcionService } from '../../../@core/data/inscripcion.service';
import { UserService } from '../../../@core/data/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Inscripcion } from '../../../@core/data/models/inscripcion';
import { IMAGENES } from './imagenes';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-posgrado',
  templateUrl: './posgrado.component.html',
  styleUrls: ['./posgrado.component.scss'],
})
export class PosgradoComponent implements OnInit, OnChanges {

  @Input('inscripcion_id')
  set name(inscripcion_id: number) {
    this.inscripcion_id = inscripcion_id;
    console.info('Posgrado ins: ' + this.inscripcion_id)
    if (this.inscripcion_id === 0 || this.inscripcion_id.toString() === '0') {
      this.selectedValue = undefined;
      window.localStorage.setItem('programa', this.selectedValue);
    }
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0 && this.inscripcion_id.toString() !== ''
      && this.inscripcion_id.toString() !== '0') {
      this.getInfoInscripcion();
    }
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  inscripcion_id: number;
  info_persona_id: number;
  info_ente_id: number;
  estado_inscripcion: number;
  info_info_persona: any;
  datos_persona: any;
  inscripcion: Inscripcion;
  step = 0;
  cambioTab = 0;
  nForms: number;

  percentage_info: number = 0;
  percentage_acad: number = 0;
  percentage_expe: number = 0;
  percentage_proy: number = 0;
  percentage_prod: number = 0;
  percentage_desc: number = 0;
  percentage_docu: number = 0;
  percentage_total: number = 0;

  total: boolean = false;

  percentage_tab_info = [];
  percentage_tab_expe = [];
  percentage_tab_acad = [];
  percentage_tab_proy = [];
  percentage_tab_prod = [];
  percentage_tab_desc = [];
  percentage_tab_docu = [];
  posgrados = [];

  show_info = false;
  show_profile = false;
  show_acad = false;
  show_expe = false;
  show_proy = false;
  show_prod = false;
  show_desc = false;
  show_docu = false;

  info_contacto: boolean;
  info_persona: boolean;
  info_caracteristica: boolean;
  info_inscripcion: any;
  loading: boolean;
  button_politica: boolean = true;
  programa_seleccionado: any;
  selectedValue: any;
  imagenes: any;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private evento: EventoService,
    private campusMidService: CampusMidService,
    private inscripcionService: InscripcionService,
    private userService: UserService,
    private programaService: ProgramaOikosService) {
    this.imagenes = IMAGENES;
    this.translate = translate;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.loadInfoPostgrados();
    this.total = true;
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0 && this.inscripcion_id.toString() !== ''
      && this.inscripcion_id.toString() !== '0') {
      this.getInfoInscripcion();
    } else {
      const ENTE = this.userService.getEnte();
      if (ENTE !== 0 && ENTE !== undefined && ENTE.toString() !== '' && ENTE.toString() !== 'NaN') {
        this.info_ente_id = <number>ENTE;
      } else {
        this.info_ente_id = undefined;
        const opt: any = {
          title: this.translate.instant('GLOBAL.aspirante'),
          text: this.translate.instant('GLOBAL.nuevo_aspirante'),
          icon: 'warning',
          buttons: true,
        };
        Swal(opt);
      }
    }
  }

  setPercentage_info(number, tab) {
    this.percentage_tab_info[tab] = (number * 100) / 3;
    this.percentage_info = Math.round(UtilidadesService.getSumArray(this.percentage_tab_info));
    this.setPercentage_total();
  }

  setPercentage_acad(number, tab) {
    this.percentage_tab_acad[tab] = (number * 100) / 2;
    this.percentage_acad = Math.round(UtilidadesService.getSumArray(this.percentage_tab_acad));
    this.setPercentage_total();
  }

  setPercentage_expe(number, tab) {
    this.percentage_tab_expe[tab] = (number * 100) / 1;
    this.percentage_expe = Math.round(UtilidadesService.getSumArray(this.percentage_tab_expe));
    this.setPercentage_total();
  }

  setPercentage_proy(number, tab) {
    this.percentage_tab_proy[tab] = (number * 100) / 1;
    this.percentage_proy = Math.round(UtilidadesService.getSumArray(this.percentage_tab_proy));
    this.setPercentage_total();
  }

  setPercentage_desc(number, tab) {
    this.percentage_tab_desc[tab] = (number * 100) / 1;
    this.percentage_desc = Math.round(UtilidadesService.getSumArray(this.percentage_tab_desc));
    this.setPercentage_total();
  }

  setPercentage_docu(number, tab) {
    this.percentage_tab_docu[tab] = (number * 100) / 1;
    this.percentage_docu = Math.round(UtilidadesService.getSumArray(this.percentage_tab_docu));
    this.setPercentage_total();
  }

  setPercentage_prod(number, tab) {
    this.percentage_tab_prod[tab] = (number * 100) / 1;
    this.percentage_prod = Math.round(UtilidadesService.getSumArray(this.percentage_tab_prod));
    this.percentage_prod = (this.percentage_prod * 100) / this.percentage_prod;
    this.setPercentage_total();
  }

  setPercentage_total() {
    this.percentage_total = Math.round(UtilidadesService.getSumArray(this.percentage_tab_info)) / 4;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_acad)) / 4;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_docu)) / 4;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_proy)) / 4;
    if (this.info_inscripcion !== undefined && this.info_inscripcion !== null) {
      if (this.info_inscripcion.EstadoInscripcionId.Id > 1) {
        this.percentage_total = 100;
      }
      if (this.percentage_total >= 100) {
        if (this.info_inscripcion.EstadoInscripcionId.Id === 1) {
          this.total = false;
        }
      }
    }
  }

  traerInfoPersona(event, tab) {
    this.setPercentage_info(event, tab);
    if (event !== 0) this.getInfoInscripcion();
  }

  loadInfoPostgrados() {
    this.evento.get('calendario_evento?query=TipoEventoId.Nombre:Inscripción,Activo:true&limit=0')
    .subscribe(resEvento => {
      if (resEvento !== null && JSON.stringify(resEvento) !== '[{}]') {
        const eventos = <Array<any>>resEvento;
        const hoy = formatDate(new Date(), 'yyyy/MM/dd', 'en');
        eventos.forEach(elemEvento => {
          const inicio = formatDate(elemEvento.FechaInicio, 'yyyy/MM/dd', 'en');
          const fin = formatDate(elemEvento.FechaFin, 'yyyy/MM/dd', 'en');
          if ((inicio < hoy) && (hoy < fin)) {
            this.evento.get('tipo_evento?query=Id:' + elemEvento.TipoEventoId.Id)
            .subscribe(resTipEvento => {
              if (resTipEvento !== null && JSON.stringify(resTipEvento) !== '[{}]') {
                const tipo = <any>resTipEvento[0];
                this.programaService.get('dependencia/?query=Id:' + tipo.DependenciaId)
                .subscribe(res => {
                  const r = <any>res[0];
                  if (res !== null && JSON.stringify(res) !== '[{}]') {
                    this.posgrados.push(r);
                  }
                },
                  (error: HttpErrorResponse) => {
                    Swal({
                      type: 'error',
                      title: error.status + '',
                      text: this.translate.instant('ERROR.' + error.status),
                      footer: this.translate.instant('GLOBAL.cargar') + '-' +
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
                    this.translate.instant('GLOBAL.tipo_evento'),
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
            this.translate.instant('GLOBAL.evento'),
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      });
  }

  getInfoInscripcion() {
    if (this.inscripcion_id !== undefined && this.inscripcion_id !== 0 && this.inscripcion_id.toString() !== ''
      && this.inscripcion_id.toString() !== '0') {
      this.loading = true;
      this.inscripcionService.get('inscripcion/' + this.inscripcion_id)
        .subscribe(inscripcion => {
          this.info_inscripcion = <any>inscripcion;
          if (inscripcion !== null  && this.info_inscripcion.Type !== 'error') {
            this.estado_inscripcion = this.info_inscripcion.EstadoInscripcionId.Id;
            if (this.info_inscripcion.EstadoInscripcionId.Id > 1) {
              this.total = true;
            }
            this.programaService.get('dependencia/' + this.info_inscripcion.ProgramaAcademicoId)
              .subscribe(res_programa => {
                const programa_admision = <any>res_programa;
                if (res_programa !== null && programa_admision.Type !== 'error') {
                  this.selectedValue = programa_admision;
                  this.posgrados.push(programa_admision);
                  this.info_ente_id = this.info_inscripcion.PersonaId;
                  this.loading = false;
                }
              },
                (error: HttpErrorResponse) => {
                  Swal({
                    type: 'error',
                    title: error.status + '',
                    text: this.translate.instant('ERROR.' + error.status),
                    footer: this.translate.instant('GLOBAL.cargar') + '-' +
                      this.translate.instant('GLOBAL.admision') + '|' +
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
                this.translate.instant('GLOBAL.admision'),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  perfil_editar(event): void {
    switch (event) {
      case 'info_contacto':
        this.show_info = true;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = true;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_proy = false;
        this.show_desc = false;
        this.show_docu = false;
        this.show_prod = false;
        break;
      case 'info_caracteristica':
        const ENTE = this.userService.getEnte();
        if (ENTE !== 0 && ENTE !== undefined && ENTE.toString() !== '' && ENTE.toString() !== 'NaN' && this.info_ente_id === undefined) {
          this.info_ente_id = <number>ENTE;
          this.inscripcionService.get('inscripcion/?query=PersonaId:' + this.info_ente_id)
            .subscribe(inscripcion => {
              this.info_inscripcion = <any>inscripcion[0];
              if (inscripcion !== null  && this.info_inscripcion.Type !== 'error') {
                this.inscripcion_id = this.info_inscripcion.Id;
                this.getInfoInscripcion();
              }
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

        this.show_info = true;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.info_caracteristica = true;
        this.info_persona = false;
        this.show_proy = false;
        this.show_docu = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'info_persona':
        this.show_info = true;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.info_persona = true;
        this.show_desc = false;
        this.show_docu = false;
        this.show_proy = false;
        this.show_prod = false;
        break;
      case 'experiencia_laboral':
        this.show_info = false;
        this.show_profile = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_acad = false;
        this.show_docu = false;
        this.show_expe = true;
        this.info_persona = false;
        this.show_proy = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'formacion_academica':
        this.show_info = false;
        this.show_docu = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_profile = false;
        this.show_acad = true;
        this.info_persona = false;
        this.show_expe = false;
        this.show_proy = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'produccion_academica':
        this.show_info = false;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.show_docu = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_desc = false;
        this.show_proy = false;
        this.show_prod = true;
        break;
      case 'documento_programa':
        this.show_info = false;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.show_docu = true;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_desc = false;
        this.show_proy = false;
        this.show_prod = false;
        break;
      case 'descuento_matricula':
        this.show_info = false;
        this.show_profile = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.show_docu = false;
        this.info_caracteristica = false;
        this.info_persona = false;
        this.show_desc = true;
        this.show_proy = false;
        this.show_prod = false;
        break;
      case 'propuesta_grado':
        this.show_info = false;
        this.show_profile = false;
        this.show_docu = false;
        this.show_acad = false;
        this.show_expe = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_proy = true;
        this.info_persona = false;
        this.show_desc = false;
        this.show_prod = false;
        break;
      case 'perfil':
        this.show_info = false;
        this.show_profile = true;
        this.show_acad = false;
        this.info_contacto = false;
        this.show_docu = false;
        this.info_caracteristica = false;
        this.show_desc = false;
        this.show_expe = false;
        this.show_proy = false;
        this.show_prod = false;
        this.show_desc = false;
        break;
      default:
        this.show_info = false;
        this.show_docu = false;
        this.show_profile = false;
        this.show_acad = false;
        this.info_contacto = false;
        this.info_caracteristica = false;
        this.show_desc = false;
        this.show_expe = false;
        this.show_proy = false;
        this.show_prod = false;
        this.show_desc = false;
        break;
    }
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.info_persona')) {
      if (this.info_persona)
        this.perfil_editar('info_persona');
    } else if (event.tabTitle === this.translate.instant('GLOBAL.info_caracteristica')) {
      this.perfil_editar('info_caracteristica');
    } else if (event.tabTitle === this.translate.instant('GLOBAL.informacion_contacto')) {
      this.perfil_editar('info_contacto');
    }
  }

  ngOnInit() {
    if (this.info_ente_id !== 0 && this.info_ente_id !== undefined && this.info_ente_id.toString() !== '' &&
      this.info_ente_id.toString() !== 'NaN' && this.inscripcion_id === undefined) {
      this.info_ente_id = <number>this.userService.getEnte();
      this.inscripcionService.get('inscripcion/?query=PersonaId:' + this.info_ente_id)
      .subscribe(inscripcion => {
        this.info_inscripcion = <any>inscripcion[0];
        if (Object.keys(inscripcion).length !==  0  && this.info_inscripcion.Type !== 'error') {
          this.inscripcion_id = this.info_inscripcion.Id;
          this.getInfoInscripcion();
        } else {
          const opt: any = {
            title: this.translate.instant('GLOBAL.aspirante'),
            text: this.translate.instant('GLOBAL.nuevo_programa'),
            icon: 'warning',
            buttons: true,
          };
          Swal(opt);
        }
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
  }

  ngOnChanges() {
  }

  pruebita() {
    window.localStorage.setItem('programa', this.selectedValue.Id);
  }

  inscribirse() {
    this.datosMidPersona();
  }

  datosMidPersona() {
    this.campusMidService.get('persona/consultar_persona/' + this.info_ente_id)
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.datos_persona = r;
          this.info_inscripcion.EstadoInscripcionId.Id = 2;
          this.updateEstadoAdmision();
        }
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

  updateEstadoAdmision() {
    const opt: any = {
      title: this.translate.instant('GLOBAL.inscribirse'),
      text: this.translate.instant('GLOBAL.inscribirse') + '?',
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
          this.inscripcionService.put('inscripcion', this.info_inscripcion)
            .subscribe(res_ins => {
              const r_ins = <any>res_ins;
              if (res_ins !== null && r_ins.Type !== 'error') {
                this.loading = false;
                this.total = true;
                this.captureScreen();
              }
            },
              (error: HttpErrorResponse) => {
                Swal({
                  type: 'error',
                  title: error.status + '',
                  text: this.translate.instant('ERROR.' + error.status),
                  footer: this.translate.instant('GLOBAL.actualizar') + '-' +
                    this.translate.instant('GLOBAL.admision'),
                  confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
                });
              });
        }
      });
  }

  public captureScreen() {
    this.loading = true;
    const data1 = document.getElementById('info_basica');
    const data2 = document.getElementById('formacion_academica');
    const data3 = document.getElementById('experiencia_laboral');
    const data4 = document.getElementById('produccion_academica');
    const data5 = document.getElementById('documento_programa');
    const data6 = document.getElementById('descuento_matricula');
    const data7 = document.getElementById('propuesta_grado');
    html2canvas(data1).then(canvas => {
      const imgWidth = 50;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = this.imagenes.escudo;
      const contentDataURL = canvas.toDataURL('image/png');

      html2canvas(data2).then(canvas2 => {
        const imgWidth2 = 50;
        const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;
        const contentDataURL2 = canvas2.toDataURL('image/png');

        html2canvas(data3).then(canvas3 => {
          const imgWidth3 = 50;
          const imgHeight3 = (canvas3.height * imgWidth3) / canvas3.width;
          const contentDataURL3 = canvas3.toDataURL('image/png');

          html2canvas(data4).then(canvas4 => {
            const imgWidth4 = 50;
            const imgHeight4 = (canvas4.height * imgWidth4) / canvas4.width;
            const contentDataURL4 = canvas4.toDataURL('image/png');

            html2canvas(data5).then(canvas5 => {
              const imgWidth5 = 50;
              const imgHeight5 = (canvas5.height * imgWidth5) / canvas5.width;
              const contentDataURL5 = canvas5.toDataURL('image/png');

              html2canvas(data6).then(canvas6 => {
                const imgWidth6 = 50;
                const imgHeight6 = (canvas6.height * imgWidth6) / canvas6.width;
                const contentDataURL6 = canvas6.toDataURL('image/png');

                html2canvas(data7).then(canvas7 => {
                  const imgWidth7 = 50;
                  const imgHeight7 = (canvas7.height * imgWidth7) / canvas7.width;
                  const contentDataURL7 = canvas7.toDataURL('image/png');
                  const pdf = new jsPDF('p', 'mm', 'letter');

                  pdf.setFontSize(20);
                  pdf.addImage(imgData, 'PNG', 10, 10, 92, 35);
                  pdf.text(`Comprobante de inscripción`, 65, 55);
                  pdf.setFontSize(12);

                  pdf.text(`Nombres: ${this.datos_persona['PrimerNombre']} ${this.datos_persona['SegundoNombre']}`, 15, 68);
                  pdf.text(`Apellidos: ${this.datos_persona['PrimerApellido']} ${this.datos_persona['SegundoApellido']}`, 15, 75);
                  pdf.text('Documento de identificación: ' + this.datos_persona['TipoIdentificacion']['CodigoAbreviacion'] + ' ' +
                    this.datos_persona['NumeroIdentificacion'],
                    15, 82);
                  pdf.text(`Fecha de inscripción: ${formatDate(new Date(), 'yyyy-MM-dd', 'en')}`, 15, 89);
                  pdf.text(`Programa académico: ${this.selectedValue.Nombre}`, 15, 96);

                  pdf.text(`Formulario: `, 15, 103);
                  pdf.addImage(contentDataURL, 'PNG', 18, 108, imgWidth, imgHeight);
                  pdf.addImage(contentDataURL2, 'PNG', 82, 108, imgWidth2, imgHeight2);
                  pdf.addImage(contentDataURL3, 'PNG', 147, 108, imgWidth3, imgHeight3);
                  pdf.addImage(contentDataURL4, 'PNG', 18, 148, imgWidth4, imgHeight4);
                  pdf.addImage(contentDataURL5, 'PNG', 82, 148, imgWidth5, imgHeight5);
                  pdf.addImage(contentDataURL6, 'PNG', 147, 148, imgWidth6, imgHeight6);
                  pdf.addImage(contentDataURL7, 'PNG', 82, 188, imgWidth7, imgHeight7);
                  pdf.setFontSize(9);
                  pdf.text(`Universidad Distrital Francisco José de Caldas`, 78, 256);
                  pdf.text(`Carrera 7 # 40B - 53 - Bogotá D.C. - Colombia`, 78, 262);
                  pdf.text(`Teléfono (Colombia) : +57 3 323-9300`, 83, 267);

                  const nombre_archivo = `${this.datos_persona['PrimerNombre']}_${this.datos_persona['PrimerApellido']}_` +
                    `${this.datos_persona['NumeroIdentificacion']}`;

                  this.loading = false;
                  pdf.save(`${nombre_archivo}.pdf`);
                  this.eventChange.emit(true);
                  this.router.navigate(['/pages/procesos_admisiones/estado_admision']);
                });
              });
            });
          });
        });
      });
    });
  }
}
