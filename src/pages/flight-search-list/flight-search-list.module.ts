import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightSearchListPage } from './flight-search-list';

@NgModule({
  declarations: [
    FlightSearchListPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightSearchListPage),
  ],
})
export class FlightSearchListPageModule {}
