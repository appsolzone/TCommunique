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

  oneway_flight_booking_info:any;
  return_flight_booking_info:any;
  tripType:any;

  constructor(public toastCtrl:ToastController,private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public view:ViewController)
  {

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad HotelBookingRequestPage');

    console.log(this.navParams.get('tabType'));

    this.tripType=this.navParams.get('tabType');

    if(this.tripType=='oneway')
    {
      this.oneway_flight_booking_info=this.navParams.get('onewayData');

      console.log(this.oneway_flight_booking_info);
    }
    else
    {
      this.oneway_flight_booking_info=this.navParams.get('onewayData');
      this.return_flight_booking_info=this.navParams.get('returnData');
      console.log(this.oneway_flight_booking_info);
      console.log(this.return_flight_booking_info);
    }
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
      postData.append('outboundOrigin',this.oneway_flight_booking_info.origin);
      postData.append('outboundDestination',this.oneway_flight_booking_info.destination);
      postData.append('outboundDate',this.oneway_flight_booking_info.depdate);
      postData.append('outboundTime',this.oneway_flight_booking_info.deptime);
      postData.append('outboundFlightNo',this.oneway_flight_booking_info.flightcode);
    }
    else
    {
      postData.append('outboundOrigin',this.oneway_flight_booking_info.origin);
      postData.append('outboundDestination',this.oneway_flight_booking_info.destination);
      postData.append('outboundDate',this.oneway_flight_booking_info.depdate);
      postData.append('outboundTime',this.oneway_flight_booking_info.deptime);
      postData.append('outboundFlightNo',this.oneway_flight_booking_info.flightno);

      postData.append('inboundOrigin',this.return_flight_booking_info.destination);
      postData.append('inboundDestination',this.return_flight_booking_info.origin);
      postData.append('inboundDate',this.return_flight_booking_info.arrdate);
      postData.append('inboundTime',this.return_flight_booking_info.arrtime);
      postData.append('inboundFlightNo',this.return_flight_booking_info.flightno);
    }

    postData.append('class',this.oneway_flight_booking_info.seatingclass);
    postData.append('adult',this.adult);
    postData.append('child',this.child);
    postData.append('infant',this.infant);
    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{


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
