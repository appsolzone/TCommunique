import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserReviewPage } from './user-review';

@NgModule({
  declarations: [
    UserReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(UserReviewPage),
  ],
})
export class UserReviewPageModule {}
