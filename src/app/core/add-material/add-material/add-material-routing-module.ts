import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMaterial } from '../add-material';

const routes: Routes = [
  {
    path:"",
    component:AddMaterial
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMaterialRoutingModule { }
