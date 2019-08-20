import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomizePackagePage } from './customize-package';

@NgModule({
  declarations: [
    CustomizePackagePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomizePackagePage),
  ],
})
export class CustomizePackagePageModule {}
