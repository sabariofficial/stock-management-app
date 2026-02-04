import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZincDetails } from '../zinc-details';

const routes: Routes = [
  {
    path:'',
    component:ZincDetails
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZincDetailsRoutingModule { }
