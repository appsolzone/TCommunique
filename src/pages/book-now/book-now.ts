import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

/**
 * Generated class for the BookNowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-book-now',
  segment: 'page-book-now',
})
@Component({
  selector: 'page-book-now',
  templateUrl: 'book-now.html',
})
export class BookNowPage {
  loading:Loading;
  data:Observable<any>;
  pkgId:any;
  package_details:any;

  package_pkgImg:any;
  package_duration:any;
  package_pkgTitle:any;
  package_overview:any;
  package_startingPrice:any;
  package_sightSeeing:any;
  package_flight:any;
  package_hotel:any;
  package_hotelRating:any;
  package_meal:any;
  package_cab:any;
  package_other:any;


  book_price:any;
  book_adult:any;
  book_child:any;
  book_infant:any;
  book_city:any;
  book_phone:any;
  book_startdate:any;
  book_enddate:any;
  book_days:any;
  book_email:any;
  uId:any;

  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {
    this.pkgId=navParams.get('pkgId');
    this.uId = navParams.get('uId');
    this.package_details = navParams.get('package_details');


    console.log("pkgId",this.pkgId);
    console.log("package_details",this.package_details);

      this.package_pkgImg = this.package_details.pkgImg;
      this.package_overview = this.package_details.overview;
      this.package_pkgTitle =  this.package_details.pkgTitle;
      this.package_duration = this.package_details.duration;
      this.package_startingPrice = this.package_details.startingPrice;
      this.package_flight = this.package_details.flight;
      this.package_hotel = this.package_details.hotel;
      this.package_hotelRating = this.package_details.hotelRating;
      this.package_meal = this.package_details.meal;
      this.package_other = this.package_details.other;
      this.package_sightSeeing = this.package_details.sightSeeing;
      this.package_cab = this.package_details.cab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookNowPage');
  }

  book_submit(){

      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      // this.loading.present();
      var url =this.constant.bookPackage;
      let postData = new FormData();

      postData.append('pkgId',this.pkgId);
      postData.append('deptCity',this.book_city);
      postData.append('adult',this.book_adult);
      postData.append('infant',this.book_infant);
      postData.append('startDate',this.book_startdate);
      postData.append('endDate',this.book_enddate);
      postData.append('email',this.book_email);
      postData.append('phone',this.book_phone);
      postData.append('totalPrice',this.book_price);
      postData.append('uId',this.uId);

      this.data = this.http.post(url,postData);
      this.data.subscribe(data =>{

        console.log("DATA_#",(JSON.stringify(data.json())));

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

}
