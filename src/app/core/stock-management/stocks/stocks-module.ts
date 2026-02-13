import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksRoutingModule } from './stocks-routing-module';
import { StockManagement } from '../stock-management';
import { AgGridAngular } from "ag-grid-angular";


@NgModule({
  declarations: [StockManagement],
  imports: [
    CommonModule,
    StocksRoutingModule,
    AgGridAngular
]
})
export class StocksModule { }
