import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PackageDetailsPage } from './package-details';
import { StarRatingModule } from 'ionic3-star-rating';
import { ComponentsExpandableComponent } from "../../components/components-expandable/components-expandable";



@NgModule({
  declarations: [
    PackageDetailsPage,
    ComponentsExpandableComponent
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(PackageDetailsPage),
  ],
})
export class PackageDetailsPageModule {}
