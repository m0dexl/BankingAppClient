import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeePanelComponent],
  imports: [CommonModule, ToastModule, FormsModule],
})
export class EmployeeModule {}
