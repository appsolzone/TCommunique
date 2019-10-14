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
 * Generated class for the BookBusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-book-bus',
  segment:'page-book-bus'
})
@Component({
  selector: 'page-book-bus',
  templateUrl: 'book-bus.html',
})
export class BookBusPage {


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

  bus_info_data:any;

  public numberList=["1","2","3","4","5","6","7","8","9","10"];

  public seater:any;
  public sleeper:any;

  constructor(public fb:FormBuilder,public toastCtrl:ToastController,private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public view:ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelBookingRequestPage');
    this.bus_info_data=this.navParams.get('data');
    this.uId=this.navParams.get('uId');
    console.log(this.bus_info_data);
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

  submit()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();

    var url =this.constant.bookBus;
    let postData = new FormData();
    postData.append('uId',this.uId);
    postData.append('origin',this.bus_info_data.origin);
    postData.append('destination',this.bus_info_data.destination);
    postData.append('journeyDate',this.bus_info_data.depdate);
    postData.append('journeyTime',this.bus_info_data.DepartureTime);
    postData.append('busOperator',this.bus_info_data.busCompany);
    postData.append('seatType',this.bus_info_data.seat);
    postData.append('adult',this.adult);
    postData.append('child',this.child);
    postData.append('infant',this.infant);
    postData.append('noOfSeater',this.seater);
    postData.append('noOfSleeper',this.sleeper);
    postData.append('email',this.book_email);
    postData.append('phone',this.book_phone);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      this.loading.dismiss();

      console.log(data.json());

      let toast = this.toastCtrl.create({
        message: data.json().msg,
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

      this.view.dismiss('dashBoard');
    });
}

closeModal()
{
  this.view.dismiss();
}
}
