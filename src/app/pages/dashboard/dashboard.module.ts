import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  imports: [
    ThemeModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    CarouselComponent,
    NewsComponent,
  ],
})
export class DashboardModule { }
