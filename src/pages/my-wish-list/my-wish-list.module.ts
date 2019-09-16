import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWishListPage } from './my-wish-list';

@NgModule({
  declarations: [
    MyWishListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWishListPage),
  ],
})
export class MyWishListPageModule {}
