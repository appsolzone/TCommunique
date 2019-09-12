import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPackageDetailsPage } from './category-package-details';
import { StarRatingModule } from 'ionic3-star-rating';


@NgModule({
  declarations: [
    CategoryPackageDetailsPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(CategoryPackageDetailsPage),
  ],
})
export class CategoryPackageDetailsPageModule {}
