import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresaComponent } from './empresa.component';
import { ElegirComponent } from './elegir/elegir.component';

const routes: Routes = [
  { path: '', component: EmpresaComponent },
  { path: 'elegir', component: ElegirComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
