import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelSearchPage } from './hotel-search';
import { IonicRatingModule } from "ionic-rating";



@NgModule({
  declarations: [
    HotelSearchPage,
  ],
  imports: [
    IonicRatingModule,
    IonicPageModule.forChild(HotelSearchPage),
  ],
})
export class HotelSearchPageModule {}
