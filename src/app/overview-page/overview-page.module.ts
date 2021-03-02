import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewPageRoutingModule } from './overview-page-routing.module';
import { OverviewPageComponent } from './overview-page/overview-page.component';


@NgModule({
  declarations: [OverviewPageComponent],
  imports: [
    CommonModule,
    OverviewPageRoutingModule
  ]
})
export class OverviewPageModule { }
