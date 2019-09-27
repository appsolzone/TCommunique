import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnPropertyGalleryPage } from './own-property-gallery';

@NgModule({
  declarations: [
    OwnPropertyGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnPropertyGalleryPage),
  ],
})
export class OwnPropertyGalleryPageModule {}
