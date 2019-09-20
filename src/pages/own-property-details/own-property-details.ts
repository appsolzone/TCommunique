import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';



/**
 * Generated class for the OwnPropertyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-own-property-details',
  segment:'page-own-property-details'
})
@Component({
  selector: 'page-own-property-details',
  templateUrl: 'own-property-details.html',
})
export class OwnPropertyDetailsPage {
  searchData:any;
  uId:any;
  default_currency:any;
  checkIn:any;
  checkOut:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {

    this.searchData = navParams.get('data');

    console.log("searchData",this.searchData);

    this.storage.get('currency').then((val)=>{

      if(val==null){
        this.default_currency = "INR";

      }else{
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);


      }

    });

    this.storage.get('user_login_data').then((val)=>{
      console.log("hsh",val);
      if(val==null)
      {

      }
      else
      {
      this.uId = val.uId;

      }

      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnPropertyDetailsPage');
  }

  home(){
    this.navCtrl.setRoot(HomePage);

  }
  checkAvail(){

    console.log("Hello",this.checkIn,this.checkOut);

  }

}
