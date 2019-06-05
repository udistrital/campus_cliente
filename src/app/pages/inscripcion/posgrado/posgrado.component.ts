import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CampusMidService } from '../../../@core/data/campus_mid.service';
import { UtilidadesService } from '../../../@core/utils/utilidades.service';
import { ProgramaAcademicoService } from '../../../@core/data/programa_academico.service';
import { AdmisionesService } from '../../../@core/data/admisiones.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Admision } from '../../../@core/data/models/admision';
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

  @Input('admision_id')
  set name(admision_id: number) {
    this.admision_id = admision_id;
    if (this.admision_id !== 0 && this.admision_id !== undefined) {
      this.getInfoInscripcion();
    } else {
      this.info_ente_id = undefined;
      this.loadInfoPostgrados()
    }
  }

  @Output() eventChange = new EventEmitter();
  @Output('result') result: EventEmitter<any> = new EventEmitter();

  admision_id: number;
  info_persona_id: number;
  info_ente_id: number;
  info_info_persona: any;
  datos_persona: any;
  admision: Admision;
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
  button_politica: boolean = true;
  programa_seleccionado: any;
  selectedValue: any;
  imagenes: any;

  constructor(
    private translate: TranslateService,
    private campusMidService: CampusMidService,
    private admisionesService: AdmisionesService,
    private programaService: ProgramaAcademicoService) {
    this.imagenes = IMAGENES;
    this.translate = translate;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.loadInfoPostgrados();
    this.total = true;
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
    this.percentage_total = Math.round(UtilidadesService.getSumArray(this.percentage_tab_info)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_acad)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_docu)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_desc)) / 5;
    this.percentage_total += Math.round(UtilidadesService.getSumArray(this.percentage_tab_proy)) / 5;
    if (this.percentage_total >= 100) {
      this.total = false;
    }
  }

  traerInfoPersona(event, tab) {
    this.setPercentage_info(event, tab);
    if (event !== 0) this.getInfoInscripcion();
  }

  loadInfoPostgrados() {
    this.programaService.get('programa_academico/?query=Institucion:2&limit=0')
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.posgrados = <any>res;
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

  getInfoInscripcion() {
    this.admisionesService.get('admision/' + this.admision_id)
      .subscribe(admision => {
        const info_admision = <any>admision;
        if (admision !== null  && info_admision.Type !== 'error') {
          this.programaService.get('programa_academico/?query=Id:' + info_admision.ProgramaAcademico)
            .subscribe(res_programa => {
              const programa_admision = <any>res_programa[0];
              if (res_programa[0] !== null && programa_admision.Type !== 'error') {
                this.selectedValue = programa_admision;
                this.posgrados.push(programa_admision);
                this.info_ente_id = info_admision.Aspirante;
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
  }

  ngOnChanges() {
  }

  pruebita() {
    window.localStorage.setItem('programa', this.selectedValue.Id);
  }

  Inscribirse() {
    this.DatosMidPersona();
  }

  DatosMidPersona() {
    this.captureScreen();
    this.campusMidService.get(`persona/ConsultaPersona/?id=${this.info_ente_id}`)
      .subscribe(res => {
        const r = <any>res;
        if (res !== null && r.Type !== 'error') {
          this.datos_persona = r;
          this.admision.EstadoAdmision.Id = 2;
          this.UpdateEstadoAdmision();
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

  UpdateEstadoAdmision() {
    this.admisionesService.put('admision', this.admision, this.admision.Id)
      .subscribe(res_ad => {
        const r_ad = <any>res_ad;
        if (res_ad !== null && r_ad.Type !== 'error') {
          this.captureScreen();
        }
      },
        (error_ad: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error_ad.status + '',
            text: this.translate.instant('ERROR.' + error_ad.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });
  }

  public captureScreen() {
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
                  pdf.text(
                    `Documento de identificación: ${this.datos_persona['TipoIdentificacion']['CodigoAbreviacion']} ${this.datos_persona['NumeroDocumento']}`,
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
                    `${this.datos_persona['NumeroDocumento']}`;
                  pdf.save(`${nombre_archivo}.pdf`);
                });
              });
            });
          });
        });
      });
    });
  }
}
