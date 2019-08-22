import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusSearchPage } from './bus-search';

@NgModule({
  declarations: [
    BusSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BusSearchPage),
  ],
})
export class BusSearchPageModule {}
