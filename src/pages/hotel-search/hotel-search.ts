import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular';



/**
 * Generated class for the HotelSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-hotel-search',
  segment: 'page-hotel-search',
})
@Component({
  selector: 'page-hotel-search',
  templateUrl: 'hotel-search.html',
})
export class HotelSearchPage {

  outletPriceLevel:number[]=[1,2,3,4]
  hello:number[]=[1]


  constructor(public events: Events,public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {


  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelSearchPage');
  }

  rangeChange(change){
    console.log(change.value);

  }

  onModelChange(rating){
    console.log("Log",rating.value);
  }


}
