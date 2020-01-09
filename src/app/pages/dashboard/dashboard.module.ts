import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { SolarComponent } from './solar/solar.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { TeamComponent } from './team/team.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    CarouselComponent,
    NewsComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    KittenComponent,
    SecurityCamerasComponent,
    SolarComponent,
    StatusCardComponent,
    TeamComponent,
    TemperatureComponent,
    TemperatureDraggerComponent,
    TrafficComponent,
    TrafficChartComponent,
    WeatherComponent,
  ],
})
export class DashboardModule { }
