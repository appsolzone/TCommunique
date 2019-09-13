import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelSearchPage } from './hotel-search';
import { StarRatingModule } from 'ionic3-star-rating';



@NgModule({
  declarations: [
    HotelSearchPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(HotelSearchPage),
  ],
})
export class HotelSearchPageModule {}
