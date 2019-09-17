import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusSearchPage } from './bus-search';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    BusSearchPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(BusSearchPage),
  ],
})
export class BusSearchPageModule {}
