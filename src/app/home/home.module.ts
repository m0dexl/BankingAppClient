import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home-content/home-content.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
