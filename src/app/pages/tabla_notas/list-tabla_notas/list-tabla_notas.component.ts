import { Component, OnInit } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonaService } from '../../../@core/data/persona.service';

@Component({
  selector: 'ngx-list-tabla-notas',
  templateUrl: './list-tabla_notas.component.html',
  styleUrls: ['./list-tabla_notas.component.scss'],
  })
export class ListTablaNotasComponent implements OnInit {
  idioma: any = [];
  periodo = [];
  selectedValueIdioma: any;
  selectedValuePeriodo: any;
  resultados_notas = [];

  constructor(private translate: TranslateService,
     private idiomaService: IdiomaService,
     private personaService: PersonaService,
     private store: Store < IAppState > ,
    private listService: ListService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {;
    });
    this.listService.findPeriodoAcademico();
    this.listService.findIdioma();
    this.loadLists();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
  }

  Filtrar() {
    console.info('boton de filtrar');
    if ( (this.selectedValueIdioma !== undefined && this.selectedValueIdioma !== 0 )
    && (this.selectedValuePeriodo !== undefined && this.selectedValuePeriodo !== 0 ) ) {
      this.BusquedaDatos(`notas_idioma/?query=Idioma:${this.selectedValueIdioma['Id']},Periodo:${this.selectedValuePeriodo['Id']}`);
    }
  }

  ClearFiltro() {
    console.info('boton de limpiar filtro');
    this.selectedValueIdioma = '--Seleccionar--'
    this.selectedValueIdioma = 0;
    this.selectedValuePeriodo = '--Seleccionar--'
    this.selectedValuePeriodo = 0;
    this.resultados_notas = [];
    console.info(this.resultados_notas);
  }

  BusquedaDatos(query) {
    console.info(query);
    if (query) {
      this.idiomaService.get(query).subscribe(res => {
        if (res !== null) {
          this.resultados_notas = <any>res;
          console.info(this.resultados_notas);
          this.CargarPersonas();
        } else {
          Swal({
            type: 'info',
            title: this.translate.instant('GLOBAL.warning'),
            text: `no se encontraron resultados`,
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
  }
}

CargarPersonas() {
  for (let index = 0; index < this.resultados_notas.length; index++) {
    const datos = this.resultados_notas[index];
    this.personaService.get(`persona?query=Ente:${datos.Persona}`)
            .subscribe(res_aspirante => {
              if (res_aspirante !== null) {
                const aspirante = `${res_aspirante[0].PrimerApellido} ${res_aspirante[0].SegundoApellido}
                ${res_aspirante[0].PrimerNombre} ${res_aspirante[0].SegundoNombre}`
                this.resultados_notas[index].Persona = aspirante;
                // if ( index === (this.resultados_notas.length - 1 ) ) {
                //   // this.source.load(data);
                // }
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

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.idioma[0] = list.listIdioma[0];
        this.periodo[0] = list.listPeriodoAcademico[0];
      },
    );
  }


}
