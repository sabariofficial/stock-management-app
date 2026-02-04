import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing-module';
import { Manufacturing } from '../manufacturing';


@NgModule({
  declarations: [Manufacturing],
  imports: [
    CommonModule,
    ManufactureRoutingModule
  ]
})
export class ManufactureModule { }
