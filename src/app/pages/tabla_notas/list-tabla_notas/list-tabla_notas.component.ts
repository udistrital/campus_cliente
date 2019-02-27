import { Component, OnInit } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private translate: TranslateService,
     private idiomaService: IdiomaService,
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
  }

  BusquedaDatos(query) {
    console.info(query);
    if (query) {
      this.idiomaService.get(query).subscribe(res => {
        if (res !== null) {
          console.info(res)
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

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.idioma[0] = list.listIdioma[0];
        this.periodo[0] = list.listPeriodoAcademico[0];
      },
    );
  }


}
