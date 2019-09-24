import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusSearchListPage } from './bus-search-list';

@NgModule({
  declarations: [
    BusSearchListPage,
  ],
  imports: [
    IonicPageModule.forChild(BusSearchListPage),
  ],
})
export class BusSearchListPageModule {}
