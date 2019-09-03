import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the EditEmergencyCallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-emergency-call',
  templateUrl: 'edit-emergency-call.html',
})
export class EditEmergencyCallPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmergencyCallPage');
  }

  submit(){

    this.view.dismiss();
  }

}
