import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookNowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-book-now',
  segment: 'page-book-now',
})
@Component({
  selector: 'page-book-now',
  templateUrl: 'book-now.html',
})
export class BookNowPage {
  pkgId:any;
  package_details:any;

  package_pkgImg:any;
  package_duration:any;
  package_pkgTitle:any;
  package_overview:any;
  package_startingPrice:any;
  package_sightSeeing:any;
  package_flight:any;
  package_hotel:any;
  package_hotelRating:any;
  package_meal:any;
  package_cab:any;
  package_other:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pkgId=navParams.get('pkgId');
    this.package_details = navParams.get('package_details');

    console.log("pkgId",this.pkgId);
    console.log("package_details",this.package_details);

      this.package_pkgImg = this.package_details.pkgImg;
      this.package_overview = this.package_details.overview;
      this.package_pkgTitle =  this.package_details.pkgTitle;
      this.package_duration = this.package_details.duration;
      this.package_startingPrice = this.package_details.startingPrice;
      this.package_flight = this.package_details.flight;
      this.package_hotel = this.package_details.hotel;
      this.package_hotelRating = this.package_details.hotelRating;
      this.package_meal = this.package_details.meal;
      this.package_other = this.package_details.other;
      this.package_sightSeeing = this.package_details.sightSeeing;
      this.package_cab = this.package_details.cab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookNowPage');
  }

}
