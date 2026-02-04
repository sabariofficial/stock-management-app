import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNav } from '../side-nav';

const routes: Routes = [
  {
      path:'',
      component:SideNav
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavRoutingModule { }
