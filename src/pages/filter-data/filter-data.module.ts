import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterDataPage } from './filter-data';

@NgModule({
  declarations: [
    FilterDataPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterDataPage),
  ],
})
export class FilterDataPageModule {}
