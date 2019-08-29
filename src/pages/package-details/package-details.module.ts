import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PackageDetailsPage } from './package-details';

@NgModule({
  declarations: [
    PackageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PackageDetailsPage),
  ],
})
export class PackageDetailsPageModule {}
