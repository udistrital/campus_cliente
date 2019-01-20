import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AdmisionesService } from '../../@core/data/admisiones.service';
import { CampusMidService } from '../../@core/data/campus_mid.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'detalle-admision',
  templateUrl: './detalle-admision.component.html',
  styleUrls: ['./detalle-admision.component.scss']
})
export class DetalleAdmisionComponent implements OnInit {

  Aspirante = [];
  Persona = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private admisionesService: AdmisionesService,
    // private campusMidService: CampusMidService,
    private translate: TranslateService,
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.CargarDatos();
   }

  ngOnInit() {
  }

  CargarDatos(): void {
    this.activatedRoute.params.subscribe( params => {
      console.info(params['id'])
      //this.heroe= this.heroesService.gerHeroe(params['id']);
      this.admisionesService.get(`admision/?query=Id:${params['id']}`).subscribe(res => {
        if (res !== null) {
          this.Aspirante = <any>res[0];
          console.info(this.Aspirante);
          // this.campusMidService.get(`persona/ConsultaPersona/?id=3`)
          //           .subscribe(res_aspirante => {
          //             if (res_aspirante !== null) {
          //               // this.Persona = <any>res_aspirante[0];
          //               // console.info(this.Persona);
          //             }
          //           },
          //           (error_aspirante: HttpErrorResponse) => {
          //             Swal({
          //               type: 'error',
          //               title: error_aspirante.status + '',
          //               text: this.translate.instant('ERROR.' + error_aspirante.status),
          //               confirmButtonText: this.translate.instant('GLOBAL.aceptar'),
          //             });
          //           });
        } else {
          Swal({
            type: 'error',
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
    })
  }

}
