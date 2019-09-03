import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { CustomizePackagePage } from '../../pages/customize-package/customize-package';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { BookNowPage } from '../../pages/book-now/book-now';



/**
 * Generated class for the PackageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-package-details',
  templateUrl: 'package-details.html',
})
export class PackageDetailsPage {
  loading:Loading;
  data:Observable<any>;
  public pkgId:any;
  package_details:any;
  hotel_details:any;
  itinerary_details:any;

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {
    this.pkgId=navParams.get('pkgId');
    this.getPackageDetails(this.pkgId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageDetailsPage');
  }

  customize(){
    this.navCtrl.push(CustomizePackagePage,{pkgId:this.pkgId,package_details:this.package_details});

  }
  getPackageDetails(pkgId){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.get_packageDetails;
    let postData = new FormData();
    postData.append('pkgId',pkgId);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("DATA_#",(JSON.stringify(data.json())));
      this.package_details = data.json().data.package;

      this.package_pkgImg = data.json().data.package.pkgImg;
      this.package_overview = data.json().data.package.overview;
      this.package_pkgTitle =  data.json().data.package.pkgTitle;
      this.package_duration = data.json().data.package.duration;
      this.package_startingPrice = data.json().data.package.startingPrice;
      this.package_flight = data.json().data.package.flight;
      this.package_hotel = data.json().data.package.hotel;
      this.package_hotelRating = data.json().data.package.hotelRating;
      this.package_meal = data.json().data.package.meal;
      this.package_other = data.json().data.package.other;
      this.package_sightSeeing = data.json().data.package.sightSeeing;
      this.package_cab = data.json().data.package.cab;

      console.log(" this.package_pkgImg", this.package_pkgImg)



      this.hotel_details = data.json().data["hotel"];
      this.itinerary_details = data.json().data["itinerary"]

      console.log("itinerary_details",this.itinerary_details)


    });
  }

  book(){

    this.navCtrl.push(BookNowPage,{pkgId:this.pkgId,package_details:this.package_details});

  }

}
