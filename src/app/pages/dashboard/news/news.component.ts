import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-news',
  styleUrls: ['./news.component.scss'],
  templateUrl: './news.component.html',
})

export class NewsComponent {
  currentTheme: string;
  themeSubscription: any;
  news: any;

  constructor(private themeService: NbThemeService,
    private router: Router,
    private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
      });

      this.news = [{
        img: 'assets/images/Logo-MET.png',
        url: '/pages/programas_virtuales/met',
        title: 'met',
        height: 215,
        width: 253,
      }, {
        img: 'assets/images/Logo-MTM-cab.png',
        url: '/pages/programas_virtuales/mtm',
        title: 'mtm',
        height: 195,
        width: 300,
      }, {
        img: 'assets/images/Logo-EET.png',
        url: '/pages/programas_virtuales/eet',
        title: 'eet',
        height: 215,
        width: 253,
      }];
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  enviar_programa(url: string) {
    console.info(url);
    this.router.navigate([url]);
  }
}
