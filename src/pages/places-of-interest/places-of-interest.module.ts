import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacesOfInterestPage } from './places-of-interest';

@NgModule({
  declarations: [
    PlacesOfInterestPage,
  ],
  imports: [
    IonicPageModule.forChild(PlacesOfInterestPage),
  ],
})
export class PlacesOfInterestPageModule {}
