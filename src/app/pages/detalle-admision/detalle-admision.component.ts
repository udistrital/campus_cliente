import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AdmisionesService } from '../../@core/data/admisiones.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { ExperienciaService } from '../../@core/data/experiencia.service';
import { OrganizacionService } from '../../@core/data/organizacion.service';

@Component({
  selector: 'detalle-admision',
  templateUrl: './detalle-admision.component.html',
  styleUrls: ['./detalle-admision.component.scss']
})
export class DetalleAdmisionComponent implements OnInit {

  Aspirante = [];
  Persona = [];
  contacto = [];
  Telefono = [];
  Experiencia = [];
  Formacion = [];

  constructor(
    private campusMidService: CampusMidService,
    private experienciaService: ExperienciaService,
    private translate: TranslateService,
    private activatedRoute:ActivatedRoute,
    private admisionesService: AdmisionesService,
    private organizacionService: OrganizacionService,
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.CargarDatosAspirante();
   }

  ngOnInit() {
    // this.CargarDatosAspirante();
  }

  public CargarDatosAspirante(): void {
    this.activatedRoute.params.subscribe( params => {
      // puede traer documento
      this.admisionesService.get(`admision/?query=Id:${params['id']}`)
      .subscribe(res => {
        if (res !== null) {
          this.Aspirante = <any>res[0];
          console.info(this.Aspirante);
          this.CargarDatosMid();
          this.ExperienciaLaboral();
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
        //console.info(this.Persona);
        this.Persona['EstadoCivil'] = this.Persona['EstadoCivil']['Nombre'];
        this.Persona['Genero'] = this.Persona['Genero']['Nombre'];
        this.Persona['TipoIdentificacion'] = this.Persona['TipoIdentificacion']['Nombre'];
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
        // console.info(this.Experiencia);
        // this.Telefono = this.contacto['ContactoEnte'];
        for (let i = 0; i < this.Experiencia.length; i++) {
          this.Experiencia[i]['Cargo'] =  this.Experiencia[i]['Cargo']['Nombre'];
          this.Experiencia[i]['TipoDedicacion'] =  this.Experiencia[i]['TipoDedicacion']['Nombre'];
          this.Experiencia[i]['TipoVinculacion'] =  this.Experiencia[i]['TipoVinculacion']['Nombre'];
          this.organizacionService.get(`organizacion/?query=id:${this.Experiencia[i]['Organizacion']}`)
          .subscribe(res_org => {
            if (res_org !== null) {
                //console.info(res_org)
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
        console.info(this.Formacion);
        for (let i = 0; i < this.Formacion.length; i++) {
            // this.Formacion[i]['Institucion'] = this.Formacion[i]['Titulacion'][0]['Institucion'];
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

}
