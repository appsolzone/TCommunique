import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignInPage } from '../../pages/sign-in/sign-in';


/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-language',
	segment: 'page-language'
})
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {
  ClickablePic: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  }
  check(a)
  {
    this.ClickablePic=a;
  console.log(this.ClickablePic);
  this.navCtrl.push(SignInPage);



  }


}
