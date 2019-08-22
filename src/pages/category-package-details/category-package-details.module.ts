import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPackageDetailsPage } from './category-package-details';

@NgModule({
  declarations: [
    CategoryPackageDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPackageDetailsPage),
  ],
})
export class CategoryPackageDetailsPageModule {}
