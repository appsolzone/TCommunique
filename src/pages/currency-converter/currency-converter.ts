import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';


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
  currency = [
    {id: 0, name: 'INR'},
    {id: 1, name: 'USD'},
    {id: 2, name: 'EUR'},
    {id: 3, name: 'JPY'},
    {id: 4, name: 'GBP'},
    {id: 5, name: 'AUD'},
    {id: 6, name: 'CAD'},
    {id: 7, name: 'CHF'},
    {id: 8, name: 'CNH'}
    ];
    set_default_currency:any;
    selected_currency:any;


  constructor(public toastCtrl:ToastController,public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {



    this.storage.get('currency').then((val)=>{

      if(val==null){

        this.set_default_currency = [this.currency[0]];
        this.selected_currency = this.currency[0];
        console.log("set_default_currency",this.set_default_currency);



      }else{

        this.set_default_currency = [this.currency[val.id]];
        console.log("VAL",this.set_default_currency);
       this.selected_currency = this.currency[0];
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrencyConverterPage');
  }

  save(){
    console.log("selected_currency",this.selected_currency);

    this.storage.set('currency',this.selected_currency);

    let t = this.toastCtrl.create({
      message: "Update Successfully",
      position: 'bottom'
    });
    let closedByTimeout = false;
    let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 7000);
    t.onDidDismiss(() => {
      if (closedByTimeout) return;
      clearTimeout(timeoutHandle);
    });
    t.present();
    this.navCtrl.setRoot(HomePage);

  }

}
