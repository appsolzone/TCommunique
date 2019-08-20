import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomizePackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-customize-package',
  segment: 'page-customize-package',
})
@Component({
  selector: 'page-customize-package',
  templateUrl: 'customize-package.html',
})


export class CustomizePackagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomizePackagePage');
  }

  
}
