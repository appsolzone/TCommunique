import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyPlacesPage } from './nearby-places';

@NgModule({
  declarations: [
    NearbyPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyPlacesPage),
  ],
})
export class NearbyPlacesPageModule {}
