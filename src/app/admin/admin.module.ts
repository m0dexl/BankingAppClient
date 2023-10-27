import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [CommonModule, ToastModule, FormsModule],
})
export class AdminModule {}
