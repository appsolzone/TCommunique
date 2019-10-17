import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightSearchPage } from './flight-search';
import { FlightExpandableComponent } from "../../components/flight-expandable/flight-expandable";




@NgModule({
  declarations: [
    FlightSearchPage,
    FlightExpandableComponent
    ],
  imports: [
    IonicPageModule.forChild(FlightSearchPage),

  ],
})
export class FlightSearchPageModule {}
