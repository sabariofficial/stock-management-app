import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing-module';
import { MainLayout } from '../main-layout';
import { SideNav } from '../../side-nav/side-nav';
import { Header } from '../../header/header';


@NgModule({
  declarations: [MainLayout,SideNav, Header],
  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
