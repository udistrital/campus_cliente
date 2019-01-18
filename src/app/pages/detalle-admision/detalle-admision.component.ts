import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'detalle-admision',
  templateUrl: './detalle-admision.component.html',
  styleUrls: ['./detalle-admision.component.scss']
})
export class DetalleAdmisionComponent implements OnInit {

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
   }

  ngOnInit() {
  }

}
