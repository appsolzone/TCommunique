import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the HotelSearchGoibiboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-hotel-search-goibibo',
  segment:'page-hotel-search-goibibo'
})
@Component({
  selector: 'page-hotel-search-goibibo',
  templateUrl: 'hotel-search-goibibo.html',
})
export class HotelSearchGoibiboPage {

  public onHotelSearchForm: FormGroup;


  public userData={city:'',checkInDate:'',checkOutDate:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private _fb: FormBuilder,private toast:ToastController)
  {

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad HotelSearchGoibiboPage');
  }

  ngOnInit()
  {
    this.onHotelSearchForm = this._fb.group({
      city: ['', Validators.compose([
        Validators.required])],
      checkInDate: ['', Validators.compose([
        Validators.required])],
        checkOutDate: ['', Validators.compose([
          Validators.required])]
    });
  }

  submit()
  {
    let toast = this.toast.create({
      message: 'Comming soon...',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  home()
  {
    this.navCtrl.setRoot(HomePage);
  }

}
