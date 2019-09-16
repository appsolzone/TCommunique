import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { CustomizePackagePage } from '../../pages/customize-package/customize-package';
import { PackageDetailsPage } from '../../pages/package-details/package-details';
import { FilterPage } from '../../pages/filter/filter';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MyWishListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-my-wish-list',
  segment: 'page-my-wish-list',
})
@Component({
  selector: 'page-my-wish-list',
  templateUrl: 'my-wish-list.html',
})
export class MyWishListPage {
  uId:any;
  default_currency:any;
  loading:Loading;
  data:Observable<any>;
  wishlistData:any

  constructor(public navCtrl: NavController,public storage:Storage, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {


    this.storage.get('currency').then((val)=>{

      if(val==null){
        this.default_currency = "INR";

      }else{
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);


      }

    });
    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
      this.get_WishList(this.uId);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyWishListPage');
  }

  get_WishList(u_Id){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.viewWishList;
    let postData = new FormData();

    console.log("uId",u_Id);
    postData.append('uId',u_Id);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("WishList",(JSON.stringify(data.json())));
      this.wishlistData = data.json().data;

    });

  }

  goclick(pkgId){
    console.log("Data",pkgId);
    this.navCtrl.push(PackageDetailsPage,{pkgId:pkgId});

  }

}
