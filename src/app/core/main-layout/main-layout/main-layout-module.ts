import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing-module';
import { MainLayout } from '../main-layout';
import { SideNav } from '../../side-nav/side-nav';


@NgModule({
  declarations: [MainLayout,SideNav],
  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
