import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular';
import { IonicPage, NavController,ToastController, NavParams,ActionSheetController ,LoadingController,Loading} from 'ionic-angular';
import { Camera, CameraOptions ,PictureSourceType } from '@ionic-native/camera';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';




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
  loading:Loading;
  data:Observable<any>;
  searchData:any;
  defaultvalue:any;
  default_currency:any;


  constructor(public events: Events,public toastCtrl:ToastController,private storage: Storage,public actionSheetCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams,public camera:Camera,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,private formBuilder: FormBuilder) {

    this.storage.get('currency').then((val)=>{

      if(val==null){
        this.default_currency = "INR";

      }else{
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);


      }

    });
    this.defaultvalue = 1000;
    this.getHotel(this.defaultvalue);

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelSearchPage',this.defaultvalue);
  }

  rangeChange(change){
    console.log(change.value);
    this.getHotel(change.value);

  }

  getHotel(price){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.hotelsearch;
    let postData = new FormData();

    console.log("price",price);
    postData.append('price',price);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      // this.loading.dismiss();
      console.log("price_Data",(JSON.stringify(data.json())));
      this.searchData = data.json().data;

    });
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }


}
