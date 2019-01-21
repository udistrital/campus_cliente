import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AdmisionesService } from '../../@core/data/admisiones.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CampusMidService } from '../../@core/data/campus_mid.service';

@Component({
  selector: 'detalle-admision',
  templateUrl: './detalle-admision.component.html',
  styleUrls: ['./detalle-admision.component.scss']
})
export class DetalleAdmisionComponent implements OnInit {

  Aspirante = [];
  Persona = [];

  constructor(
    private campusMidService: CampusMidService,
    private translate: TranslateService,
    private activatedRoute:ActivatedRoute,
    private admisionesService: AdmisionesService,
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.CargarDatosAspirante();
   }

  ngOnInit() {
  }

  public CargarDatosAspirante(): void {
    this.activatedRoute.params.subscribe( params => {
      console.info(params['id'])
      //this.heroe= this.heroesService.gerHeroe(params['id']);
      this.admisionesService.get(`admision/?query=Id:${params['id']}`).subscribe(res => {
        if (res !== null) {
          this.Aspirante = <any>res[0];
          console.info(this.Aspirante);
          this.CargarDatosMid();
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
    this.campusMidService.get(`persona/ConsultaPersona/?id=${this.Aspirante['Aspirante']}`).subscribe(res_aspirante => {
      if (res_aspirante !== null) {
        this.Persona = <any>res_aspirante;
        console.info(this.Persona);
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
  }

}
