import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { EmployeePanelComponent } from './employee/employee-panel/employee-panel.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeContentComponent },

  { path: 'login', component: LoginComponent },
  { path: 'dashboard/customer/panel', component: DashboardContentComponent },
  { path: 'dashboard/admin/panel', component: AdminPanelComponent },
  { path: 'dashboard/employee/panel', component: EmployeePanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
