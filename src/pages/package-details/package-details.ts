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
import { Storage } from '@ionic/storage';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { HomePage } from '../../pages/home/home';





/**
 * Generated class for the PackageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-package-details',
  segment:'page-package-details'
})
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
  similarPackage:any;
  package_pkgImg:any;
  package_duration:any;
  package_pkgTitle:any;
  package_overview:any;

  package_startingPrice:any;
  startingpriceAUD:any;
  startingpriceCAD:any;
  startingpriceCHF:any;
  startingpriceCNH:any;
  startingpriceEUR:any;
  startingpriceGBP:any;
  startingpriceJPY:any;
  startingpriceUSD:any;


  package_sightSeeing:any;
  package_flight:any;
  package_hotel:any;
  package_hotelRating:any;
  package_meal:any;
  package_cab:any;
  package_other:any;
  default_currency:any;
  login_status:any;
  uId:any;
  userReview:any;
  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {
    this.pkgId=navParams.get('pkgId');

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

    this.storage.get('currency').then((val)=>{

      if(val==null){
        this.default_currency = "INR";

      }else{
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);


      }

    });
    this.getPackageDetails(this.pkgId);
    this.get_UserReview();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageDetailsPage');
  }

  customize(){

    if(this.login_status){
      this.navCtrl.push(CustomizePackagePage,{pkgId:this.pkgId,package_details:this.package_details,uId:this.uId});

    }else{
      this.navCtrl.push(SignInPage);
    }

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
      this.startingpriceAUD= data.json().data.package.priceAUD;
      this.startingpriceCAD = data.json().data.package.priceCAD;
      this.startingpriceCHF = data.json().data.package.priceCHF;
      this.startingpriceCNH = data.json().data.package.priceCNH;
      this.startingpriceEUR = data.json().data.package.priceEUR;
      this.startingpriceGBP = data.json().data.package.priceGBP;
      this.startingpriceJPY = data.json().data.package.priceJPY;
      this.startingpriceUSD = data.json().data.package.priceUSD;


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
      this.similarPackage = data.json().data["similarPackage"]

      console.log("itinerary_details",this.itinerary_details,this.similarPackage)


    });
  }

  book(){

    if(this.login_status){
      this.navCtrl.push(BookNowPage,{pkgId:this.pkgId,package_details:this.package_details,uId:this.uId});

    }else{
      this.navCtrl.push(SignInPage);
    }


  }
  goclick(id)
      {
        this.navCtrl.push(PackageDetailsPage,{pkgId:id});
      }

      get_UserReview(){
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
        });
        this.loading.present();
        var url =this.constant.fetch_user_review;
        this.data = this.http.get(url);
        this.data.subscribe(data =>{
          this.userReview = data.json().data;
          this.loading.dismiss();
        });

      }

      home(){
        this.navCtrl.setRoot(HomePage);
      }
}
