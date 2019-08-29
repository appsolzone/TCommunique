import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomizePackagePage } from '../../pages/customize-package/customize-package';

/**
 * Generated class for the PackageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-package-details',
  templateUrl: 'package-details.html',
})
export class PackageDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageDetailsPage');
  }

  customize(){
    this.navCtrl.push(CustomizePackagePage);

  }

}
