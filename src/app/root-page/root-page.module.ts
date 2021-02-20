import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootPageRoutingModule } from './root-page-routing.module';
import { RootPageComponent } from './root-page/root-page.component';


@NgModule({
  declarations: [RootPageComponent],
  imports: [
    CommonModule,
    RootPageRoutingModule
  ]
})
export class RootPageModule { }
