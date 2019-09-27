import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ToastController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {SignInPage} from '../../pages/sign-in/sign-in';
import {HotelBookingRequestPage} from '../../pages/hotel-booking-request/hotel-booking-request';
import {OwnPropertyGalleryPage} from '../../pages/own-property-gallery/own-property-gallery';





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
  loading:Loading;
  data:Observable<any>;
  login_status:any;

  hotelsearchResult:any;

  constructor(public modal:ModalController,public toastCtrl:ToastController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {

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
        this.login_status = false;
      }
      else
      {
      this.uId = val.uId;
      this.login_status=true;
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

    console.log("Hello",this.checkIn,this.checkOut,this.searchData.hotelId);

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.checkAvailability;
    let postData = new FormData();
    postData.append('hotelId',this.searchData.hotelId);
    postData.append('checkIn',this.checkIn);
    postData.append('checkOut',this.checkOut);


    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{
      this.loading.dismiss();

      console.log("Available Dates",(JSON.stringify(data.json())));
      if(data.json().status=="200"){

        this.hotelsearchResult = data.json().data['availableRoom'];


      }else{

    let t = this.toastCtrl.create({
      message: data.json().msg,
      position: 'bottom'
    });
    let closedByTimeout = false;
    let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 7000);
    t.onDidDismiss(() => {
      if (closedByTimeout) return;
      clearTimeout(timeoutHandle);

    });
    t.present();

      }

    });

  }

  bookhotel(item){


    console.log("item",item);
    if(this.login_status){

      let myModal = this.modal.create(HotelBookingRequestPage, {hotelId:this.searchData.hotelId,checkIn:this.checkIn,checkOut:this.checkOut,roomType:item.roomType,uId:this.uId});

      myModal.onDidDismiss(data =>
        {

        });
      myModal.present();

    }else{
      this.navCtrl.push(SignInPage);
    }

  }

  openGallery(){

    let myModal = this.modal.create(OwnPropertyGalleryPage, {hotelId:this.searchData.hotelId});

      myModal.onDidDismiss(data =>
        {

        });
      myModal.present();


  }



}
