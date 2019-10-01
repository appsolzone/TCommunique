import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThemeChangePage } from './theme-change';

@NgModule({
  declarations: [
    ThemeChangePage,
  ],
  imports: [
    IonicPageModule.forChild(ThemeChangePage),
  ],
})
export class ThemeChangePageModule {}
