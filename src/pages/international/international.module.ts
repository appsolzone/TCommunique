import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InternationalPage } from './international';

@NgModule({
  declarations: [
    InternationalPage,
  ],
  imports: [
    IonicPageModule.forChild(InternationalPage),
  ],
})
export class InternationalPageModule {}
