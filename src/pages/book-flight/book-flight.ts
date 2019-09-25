import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams,LoadingController,Loading,ModalController,ViewController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

/**
 * Generated class for the BookFlightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-book-flight',
  segment:'page-book-flight'
})
@Component({
  selector: 'page-book-flight',
  templateUrl: 'book-flight.html',
})
export class BookFlightPage {

  loading:Loading;
  data:Observable<any>;

  infant:any;
  child:any;
  adult:any;
  noofrooms:any;
  checkIn:any;
  checkOut:any;
  hotelId:any;
  roomType:any;
  uId:any;

  flight_booking_info:any;
  tripType:any;

  constructor(public toastCtrl:ToastController,private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public view:ViewController)
  {

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad HotelBookingRequestPage');

    console.log(this.navParams.get('data'));
    console.log(this.navParams.get('tabType'));

    this.flight_booking_info=this.navParams.get('data');
    this.tripType=this.navParams.get('tabType');
    this.uId=this.navParams.get('uId');
  }

  submit()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();

    var url =this.constant.bookFlight;

    let postData = new FormData();
    postData.append('uId',this.uId);
    postData.append('tripType',this.tripType);

    if(this.tripType=='oneway')
    {
      postData.append('outboundOrigin',this.flight_booking_info.origin);
      postData.append('outboundDestination',this.flight_booking_info.destination);
      postData.append('outboundDate',this.flight_booking_info.depdate);
      postData.append('outboundTime',this.flight_booking_info.deptime);
      postData.append('outboundFlightNo',this.flight_booking_info.flightcode);
    }
    else
    {
      postData.append('outboundOrigin',this.flight_booking_info.origin);
      postData.append('outboundDestination',this.flight_booking_info.destination);
      postData.append('outboundDate',this.flight_booking_info.depdate);
      postData.append('outboundTime',this.flight_booking_info.deptime);
      postData.append('outboundFlightNo',this.flight_booking_info.flightno);

      postData.append('inboundOrigin',this.flight_booking_info.destination);
      postData.append('inboundDestination',this.flight_booking_info.origin);
      postData.append('inboundDate',this.flight_booking_info.arrdate);
      postData.append('inboundTime',this.flight_booking_info.arrtime);
      postData.append('inboundFlightNo',this.flight_booking_info.flightno);
    }

    postData.append('class',this.flight_booking_info.seatingclass);
    postData.append('adult',this.adult);
    postData.append('child',this.child);
    postData.append('infant',this.infant);
    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log('uId : '+this.uId);
      console.log('tripType : '+this.tripType);
      console.log('outboundOrigin : '+this.flight_booking_info.origin);
      console.log('outboundDestination : '+this.flight_booking_info.destination);
      console.log('outboundDate : '+this.flight_booking_info.depdate);
      console.log('outboundTime : '+this.flight_booking_info.deptime);
      console.log('outboundFlightNo : '+this.flight_booking_info.flightno);
      console.log('inboundOrigin : '+this.flight_booking_info.destination);
      console.log('inboundDestination : '+this.flight_booking_info.origin);
      console.log('inboundDate : '+this.flight_booking_info.arrdate);
      console.log('inboundTime : '+this.flight_booking_info.arrtime);
      console.log('inboundFlightNo : '+this.flight_booking_info.flightno);
      console.log('class : '+this.flight_booking_info.seatingclass);
      console.log('adult : '+this.adult);
      console.log('child : '+this.child);
      console.log('infant : '+this.infant);

      this.loading.dismiss();
      console.log("DATA",data.json());

      let toast = this.toastCtrl.create({
        message: 'Flight book successfully done.',
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
