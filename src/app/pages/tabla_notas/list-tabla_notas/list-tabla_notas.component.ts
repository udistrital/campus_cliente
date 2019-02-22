import { Component, OnInit } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { IAppState } from '../../../@core/store/app.state';
import { Store } from '@ngrx/store';
import { ListService } from '../../../@core/store/services/list.service';

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

  public loadLists() {
    this.store.select((state) => state).subscribe(
      (list) => {
        this.idioma[0] = list.listIdioma[0];
        this.periodo[0] = list.listPeriodoAcademico[0];
      },
    );
  }


}
