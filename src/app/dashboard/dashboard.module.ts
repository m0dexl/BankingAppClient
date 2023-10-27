import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [DashboardContentComponent],
  imports: [CommonModule, FormsModule, ToastModule],
})
export class DashboardModule {}
