import { Component, OnInit } from '@angular/core';
import { IdiomaService } from '../../../@core/data/idioma.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-list-tabla-notas',
  templateUrl: './list-tabla_notas.component.html',
  styleUrls: ['./list-tabla_notas.component.scss'],
  })
export class ListTablaNotasComponent implements OnInit {

  constructor(private translate: TranslateService,
     private idiomaService: IdiomaService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {;
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
  }

}
