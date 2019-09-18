import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserReviewPage } from './user-review';
import { StarRatingModule } from 'ionic3-star-rating';


@NgModule({
  declarations: [
    UserReviewPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(UserReviewPage),
  ],
})
export class UserReviewPageModule {}
