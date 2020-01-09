import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'ngx-met',
  templateUrl: './mtm.component.html',
  styleUrls: ['./mtm.component.scss'],
})
export class MTMComponent implements OnInit {
  opcion: string;

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  activar1() {
    this.opcion = 'programa';
  }

  activar2() {
    this.opcion = 'aspirante';
  }

  activar3() {
    this.opcion = 'egresado';
  }

  activar5() {
    this.opcion = 'estructura';
  }

  activar6() {
    this.opcion = 'metodologia';
  }

  activar7() {
    this.opcion = 'investigacion';
  }

  activar8() {
    this.opcion = 'inscripcion';
  }

  activar9() {
    this.opcion = 'informacion';
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
    this.opcion = 'programa';
  }
}
