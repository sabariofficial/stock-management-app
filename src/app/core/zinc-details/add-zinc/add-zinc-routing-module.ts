import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddZinc } from './add-zinc';

const routes: Routes = [
  {
    path:'',
    component:AddZinc
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddZincRoutingModule { }
