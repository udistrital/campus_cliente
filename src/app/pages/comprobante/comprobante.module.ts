import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ExportAsModule } from 'ngx-export-as';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ThemeModule } from '../../@theme/theme.module';
import { ComprobanteRoutingModule, routedComponents } from './comprobante-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ComprobanteRoutingModule,
    Ng2SmartTableModule,
    ExportAsModule,
    NgxQRCodeModule,
  ],
  providers: [
    ExportAsModule,
    NgxQRCodeModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ComprobanteModule { }
