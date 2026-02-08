import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Materials } from '../materials';

const routes: Routes = [
  {
    path:'',
    component:Materials
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
