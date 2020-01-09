import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramasVirtualesComponent } from './programas_virtuales.component';
import { METComponent } from './met/met.component';
import { MTMComponent } from './mtm/mtm.component';
import { EETComponent } from './eet/eet.component';

const routes: Routes = [{
  path: '',
  component: ProgramasVirtualesComponent,
  children: [{
    path: 'met',
    component: METComponent,
  },
  {
    path: 'mtm',
    component: MTMComponent,
  },
  {
    path: 'eet',
    component: EETComponent,
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class ProgramasVirtualesRoutingModule { }

export const routedComponents = [
  ProgramasVirtualesComponent,
  METComponent,
  MTMComponent,
  EETComponent,
];
