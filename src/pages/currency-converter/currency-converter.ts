import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CurrencyConverterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-currency-converter',
  segment: 'page-currency-converter',
})
@Component({
  selector: 'page-currency-converter',
  templateUrl: 'currency-converter.html',
})
export class CurrencyConverterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrencyConverterPage');
  }

}
