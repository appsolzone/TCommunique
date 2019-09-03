import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyCallingPage } from './emergency-calling';

@NgModule({
  declarations: [
    EmergencyCallingPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyCallingPage),
  ],
})
export class EmergencyCallingPageModule {}
