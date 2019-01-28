import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AdmisionesService } from '../../@core/data/admisiones.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { OrganizacionService } from '../../@core/data/organizacion.service';
import { IdiomaService } from '../../@core/data/idioma.service';
import { DocumentoService } from '../../@core/data/documento.service';
import { NuxeoService } from '../../@core/utils/nuxeo.service';

@Component({
  selector: 'ngx-detalle-admision',
  templateUrl: './detalle-admision.component.html',
  styleUrls: ['./detalle-admision.component.scss'],
})
export class DetalleAdmisionComponent implements OnInit {

  Aspirante = [];
  Persona = [];
  contacto = [];
  Telefono = [];
  Experiencia = [];
  Formacion = [];
  Idioma = [];
  Propuesta = [];
  Files = [];

  constructor(
    private campusMidService: CampusMidService,
    private documentoService: DocumentoService,
    private nuxeoService: NuxeoService,
    private experienciaService: ExperienciaService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private admisionesService: AdmisionesService,
    private organizacionService: OrganizacionService,
    private idiomaService: IdiomaService,
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.CargarDatosAspirante();
   }

  ngOnInit() {
    // this.CargarDatosAspirante();
  }

  public CargarDatosAspirante(): void {
    this.Files = [];
    this.activatedRoute.params.subscribe( params => {
      // puede traer documento pero aun no se implementan
      this.admisionesService.get(`admision/?query=Id:${params['id']}`)
      .subscribe(res => {
        if (res !== null) {
          this.Aspirante = <any>res[0];
          this.CargarDatosMid();
          this.ExperienciaLaboral();
          this.IdiomaBusqueda();
        } else {
          Swal({
            type: 'info',
            title: this.translate.instant('GLOBAL.warning'),
            text: `datos de la admision no obtenidos`,
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
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
    });
  }

  public CargarDatosMid(): void {
    this.campusMidService.get(`persona/ConsultaPersona/?id=${this.Aspirante['Aspirante']}`)
    .subscribe(res_aspirante => {
      if (res_aspirante !== null) {
        this.Persona = <any>res_aspirante; // puede traer documento
        this.Persona['EstadoCivil'] = this.Persona['EstadoCivil']['Nombre'];
        this.Persona['Genero'] = this.Persona['Genero']['Nombre'];
        this.Persona['TipoIdentificacion'] = this.Persona['TipoIdentificacion']['Nombre'];
        if (this.Persona['Foto'] + '' !== '0') {
          this.Files.push({ Id: this.Persona['Foto'], key: 'Foto' });
        }
        if (this.Persona['SoporteDocumento'] + '' !== '0') {
          this.Files.push({ Id: this.Persona['SoporteDocumento'], key: 'SoporteDocumento' });
        }
        this.FormacionAcad();
      }
    },
    (error_aspirante: HttpErrorResponse) => {
      Swal({
        type: 'error',
        title: error_aspirante.status + '',
        text: this.translate.instant('ERROR.' + error_aspirante.status),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    });
    // datos contacto  persona/DatosContacto/' + this.informacion_contacto_id + '?query=TipoRelacionUbicacionEnte:2
    this.campusMidService.get(`persona/DatosContacto/${this.Aspirante['Aspirante']}`)
    .subscribe(res_contacto => {
      if (res_contacto !== null) {
        this.contacto = <any>res_contacto;
        this.Telefono = this.contacto['ContactoEnte'];
        for (let i = 0; i < this.Telefono.length; i++) {
          this.Telefono[i] =  this.Telefono[i]['Valor'];
        }
      }
    },
    (error_contacto: HttpErrorResponse) => {
      Swal({
        type: 'error',
        title: error_contacto.status + '',
        text: this.translate.instant('ERROR.' + error_contacto.status),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    });
  }

  public ExperienciaLaboral(): void {
    this.experienciaService.get(`experiencia_laboral/?query=Persona:${this.Aspirante['Aspirante']}`)
    .subscribe(res_expe => {
      if (res_expe !== null) {
        this.Experiencia = <any>res_expe;
        for (let i = 0; i < this.Experiencia.length; i++) {
          this.Experiencia[i]['Cargo'] =  this.Experiencia[i]['Cargo']['Nombre'];
          this.Experiencia[i]['TipoDedicacion'] =  this.Experiencia[i]['TipoDedicacion']['Nombre'];
          this.Experiencia[i]['TipoVinculacion'] =  this.Experiencia[i]['TipoVinculacion']['Nombre'];
          this.organizacionService.get(`organizacion/?query=id:${this.Experiencia[i]['Organizacion']}`)
          .subscribe(res_org => {
            if (res_org !== null) {
                this.Experiencia[i]['Organizacion'] =  res_org[0].Nombre;
            }
          },
          (error_org: HttpErrorResponse) => {
            Swal({
              type: 'error',
              title: error_org.status + '',
              text: this.translate.instant('ERROR.' + error_org.status),
              confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
            });
          });
        }
      }
    },
    (error_expe: HttpErrorResponse) => {
      Swal({
        type: 'error',
        title: error_expe.status + '',
        text: this.translate.instant('ERROR.' + error_expe.status),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    });
  }

  public FormacionAcad(): void {
    this.campusMidService.get(`formacion/formacionacademicaente/?Ente=${this.Aspirante['Aspirante']}`)
    .subscribe(res_for => {
      if (res_for !== null) {
        this.Formacion = <any>res_for; // puede traer documento
        this.PropuestaGrado();
        for (let i = 0; i < this.Formacion.length; i++) {
            this.Formacion[i]['Titulacion'] = this.Formacion[i]['Titulacion'][0]['Nombre'];
        }
      }
    },
    (error_for: HttpErrorResponse) => {
      Swal({
        type: 'error',
        title: error_for.status + '',
        text: this.translate.instant('ERROR.' + error_for.status),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    });
  }

  public IdiomaBusqueda(): void {
    this.idiomaService.get(`conocimiento_idioma/?query=persona:${this.Aspirante['Aspirante']}`)
        .subscribe(res_idioma => {
            if (res_idioma !== null) {
                this.Idioma = <any>res_idioma;
                for (let i = 0; i < this.Idioma.length; i++) {
                  // this.Formacion[i]['Institucion'] = this.Formacion[i]['Titulacion'][0]['Institucion'];
                  this.Idioma[i]['ClasificacionNivelIdioma'] = this.Idioma[i]['ClasificacionNivelIdioma']['Nombre'];
                  this.Idioma[i]['Idioma'] = this.Idioma[i]['Idioma']['Nombre'];
                  this.Idioma[i]['NivelEscribe'] = this.Idioma[i]['NivelEscribe']['Nombre'];
                  this.Idioma[i]['NivelEscucha'] = this.Idioma[i]['NivelEscucha']['Nombre'];
                  this.Idioma[i]['NivelHabla'] = this.Idioma[i]['NivelHabla']['Nombre'];
                  this.Idioma[i]['NivelLee'] = this.Idioma[i]['NivelLee']['Nombre'];
              }
            }
        },
        (error_idioma: HttpErrorResponse) => {
          Swal({
            type: 'error',
            title: error_idioma.status + '',
            text: this.translate.instant('ERROR.' + error_idioma.status),
            confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          });
        });

  }

  public PropuestaGrado(): void {
    this.admisionesService.get(`propuesta/?query=Admision:${this.Aspirante['Id']}`)
    .subscribe(res_prop => {
      if (res_prop !== null) {
        this.Propuesta = <any>res_prop[0];
        this.Propuesta['GrupoInvestigacion'] = this.Propuesta['GrupoInvestigacion']['Nombre'];
        this.Propuesta['LineaInvestigacion'] = this.Propuesta['LineaInvestigacion']['Nombre'];
        this.Propuesta['TipoProyecto'] = this.Propuesta['TipoProyecto']['Nombre'];
        if (this.Propuesta['FormatoProyecto'] + '' !== '0') {
          this.Files.push({ Id: this.Propuesta['FormatoProyecto'], key: 'FormatoProyecto' });
        }
        this.Archivos();
      } else {
        Swal({
          type: 'info',
          title: this.translate.instant('GLOBAL.warning'),
          text: `datos de la propuesta no obtenidos`,
          confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
        });
      }
    },
    (error_prop: HttpErrorResponse) => {
      Swal({
        type: 'error',
        title: error_prop.status + '',
        text: this.translate.instant('ERROR.' + error_prop.status),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    });
  }

  public Archivos(): void {
    this.nuxeoService.getDocumentoById$(this.Files, this.documentoService)
    .subscribe(response => {
      const filesResponse = <any>response;
      if ( (Object.keys(filesResponse).length !== 0) && (Object.keys(filesResponse).length === this.Files.length) ) {
        if ((filesResponse['FormatoProyecto'] !== undefined)) {
          this.Propuesta['FormatoProyecto'] = filesResponse['FormatoProyecto'] + '';
        }
        if ((filesResponse['Foto'] !== undefined)) {
          this.Persona['Foto'] = filesResponse['Foto'] + '';
        }
        if ((filesResponse['SoporteDocumento'] !== undefined)) {
          this.Persona['SoporteDocumento'] = filesResponse['SoporteDocumento'] + '';
        }
      }
    },
    (error_2: HttpErrorResponse) => {
      Swal({
        type: 'error',
        title: error_2.status + '',
        text: this.translate.instant('ERROR.' + error_2.status),
        confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
      });
    });
  }

  download(url, title, w, h) {
    const left = (screen.width / 2) - (w / 2);
    const top = (screen.height / 2) - (h / 2);
    window.open(url, title, 'toolbar=no,' +
      'location=no, directories=no, status=no, menubar=no,' +
      'scrollbars=no, resizable=no, copyhistory=no, ' +
      'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  }

}
