import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZincDetailsRoutingModule } from './zinc-details-routing-module';
import { ZincDetails } from '../zinc-details';


@NgModule({
  declarations: [ZincDetails],
  imports: [
    CommonModule,
    ZincDetailsRoutingModule
  ]
})
export class ZincDetailsModule { }
