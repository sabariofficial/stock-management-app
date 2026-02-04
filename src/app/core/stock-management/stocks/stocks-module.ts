import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing-module';
import { StockManagement } from '../stock-management';


@NgModule({
  declarations: [StockManagement],
  imports: [
    CommonModule,
    StocksRoutingModule
  ]
})
export class StocksModule { }
