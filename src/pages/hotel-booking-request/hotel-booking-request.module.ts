import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelBookingRequestPage } from './hotel-booking-request';

@NgModule({
  declarations: [
    HotelBookingRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelBookingRequestPage),
  ],
})
export class HotelBookingRequestPageModule {}
