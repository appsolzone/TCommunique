import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritePage } from './favourite';

@NgModule({
  declarations: [
    FavouritePage,
  ],
  imports: [
    IonicPageModule.forChild(FavouritePage),
  ],
})
export class FavouritePageModule {}
