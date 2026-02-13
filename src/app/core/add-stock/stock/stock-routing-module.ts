import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStock } from '../add-stock';

const routes: Routes = [
  {
    path: '',
    component:AddStock
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStockRoutingModule { }
