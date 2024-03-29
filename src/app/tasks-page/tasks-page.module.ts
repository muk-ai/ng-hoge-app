import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageComponent } from './tasks-page/tasks-page.component';

@NgModule({
  declarations: [TasksPageComponent],
  imports: [CommonModule, TasksPageRoutingModule, ReactiveFormsModule],
})
export class TasksPageModule {}
