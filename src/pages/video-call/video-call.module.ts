import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoCallPage } from './video-call';

@NgModule({
  declarations: [
    VideoCallPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoCallPage),
  ],
})
export class VideoCallPageModule {}
