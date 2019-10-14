import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams,LoadingController,Loading,ModalController,ViewController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from "@angular/forms";
/**
 * Generated class for the HotelBookingRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-hotel-booking-request',
  segment:'page-hotel-booking-request'
})
@Component({
  selector: 'page-hotel-booking-request',
  templateUrl: 'hotel-booking-request.html',
})
export class HotelBookingRequestPage {
  loading:Loading;
  data:Observable<any>;
  public searchit: FormGroup;

  infant:any;
  child:any;
  adult:any;
  noofrooms:any;
  checkIn:any;
  checkOut:any;
  hotelId:any;
  roomType:any;
  uId:any;
  book_email:any;
  book_phone:any;

  constructor(public fb:FormBuilder,public toastCtrl:ToastController,private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public view:ViewController) {

    this.checkOut=navParams.get('checkOut');
    this.checkIn=navParams.get('checkIn');
    this.hotelId=navParams.get('hotelId');
    this.roomType = navParams.get('roomType');
    this.uId = navParams.get('uId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelBookingRequestPage');
  }

  ngOnInit() {
    let MobilePattern = "[7-9]{1}[0-9]{9}";

    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.searchit = this.fb.group({
             email: ['', Validators.compose([
              Validators.required,Validators.pattern(EMAILPATTERN)])],
                  mob: ['', Validators.compose([
                    Validators.required,Validators.pattern(MobilePattern)])]


      });
    }

  submit(){



    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.bookHotel;
    let postData = new FormData();
    postData.append('uId',this.uId);
    postData.append('hotelId',this.hotelId);
    postData.append('roomType',this.roomType);
    postData.append('checkIn',this.checkIn);
    postData.append('checkOut',this.checkOut);
    postData.append('noOfRooms',this.noofrooms);
    postData.append('adult',this.adult);
    postData.append('child',this.child);
    postData.append('infant',this.infant);
    postData.append('email',this.book_email);
    postData.append('phone',this.book_phone);
    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("DATA",data.json());
      this.view.dismiss();
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


    });


}

closeModal() {
  this.navCtrl.pop();
}

}
