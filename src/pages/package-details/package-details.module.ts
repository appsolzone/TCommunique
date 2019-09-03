import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PackageDetailsPage } from './package-details';
import { StarRatingModule } from 'ionic3-star-rating';


@NgModule({
  declarations: [
    PackageDetailsPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(PackageDetailsPage),
  ],
})
export class PackageDetailsPageModule {}
