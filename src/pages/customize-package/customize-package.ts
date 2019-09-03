import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

/**
 * Generated class for the CustomizePackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-customize-package',
  segment: 'page-customize-package',
})
@Component({
  selector: 'page-customize-package',
  templateUrl: 'customize-package.html',
})


export class CustomizePackagePage {

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


  cust_note:any;
  cust_adult:any;
  cust_child:any;
  cust_infant:any;
  cust_city:any;
  cust_phone:any;
  cust_startdate:any;
  cust_enddate:any;
  cust_days:any;
  cust_email:any;


  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {

    this.pkgId=navParams.get('pkgId');
    this.package_details = navParams.get('package_details');

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
    console.log('ionViewDidLoad CustomizePackagePage');
  }

  cust_submit(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.customizePackage;
    let postData = new FormData();

    postData.append('pkgId',this.pkgId);
    postData.append('deptCity',this.cust_city);
    postData.append('adult',this.cust_adult);
    postData.append('infant',this.cust_infant);
    postData.append('startDate',this.cust_startdate);
    postData.append('endDate',this.cust_enddate);
    postData.append('email',this.cust_email);
    postData.append('phone',this.cust_phone);
    postData.append('totalPrice',this.cust_note);

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
