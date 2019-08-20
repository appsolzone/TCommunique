import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarBookingPage } from './car-booking';

@NgModule({
  declarations: [
    CarBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(CarBookingPage),
  ],
})
export class CarBookingPageModule {}
