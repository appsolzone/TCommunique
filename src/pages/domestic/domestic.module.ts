import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DomesticPage } from './domestic';

@NgModule({
  declarations: [
    DomesticPage,
  ],
  imports: [
    IonicPageModule.forChild(DomesticPage),
  ],
})
export class DomesticPageModule {}
