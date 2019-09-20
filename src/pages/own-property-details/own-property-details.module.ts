import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnPropertyDetailsPage } from './own-property-details';
import { StarRatingModule } from 'ionic3-star-rating';



@NgModule({
  declarations: [
    OwnPropertyDetailsPage
    ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(OwnPropertyDetailsPage),
  ],
})
export class OwnPropertyDetailsPageModule {}
