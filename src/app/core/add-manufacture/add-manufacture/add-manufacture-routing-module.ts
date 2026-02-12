import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManufacture } from '../add-manufacture';

const routes: Routes = [
  {
    path:"",
    component:AddManufacture
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddManufatureRoutingModule { }