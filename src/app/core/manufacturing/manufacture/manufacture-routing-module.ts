import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Manufacturing } from '../manufacturing';

const routes: Routes = [
  {
      path:'',
      component:Manufacturing
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureRoutingModule { }
