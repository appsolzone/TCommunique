import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEmergencyCallPage } from './edit-emergency-call';

@NgModule({
  declarations: [
    EditEmergencyCallPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEmergencyCallPage),
  ],
})
export class EditEmergencyCallPageModule {}
