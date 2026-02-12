import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing-module';
import { Manufacturing } from '../manufacturing';
import { AgGridAngular } from "ag-grid-angular";


@NgModule({
  declarations: [Manufacturing],
  imports: [
    CommonModule,
    ManufactureRoutingModule,
    AgGridAngular
]
})
export class ManufactureModule { }
