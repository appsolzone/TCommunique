import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomizePackagePage } from '../../pages/customize-package/customize-package';


/**
 * Generated class for the CategoryPackageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-package-details',
  templateUrl: 'category-package-details.html',
})
export class CategoryPackageDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPackageDetailsPage');
  }

  goclick(){
    this.navCtrl.push(CustomizePackagePage);
  }

}
