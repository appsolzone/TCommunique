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
 * Generated class for the FilterDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-data',
  templateUrl: 'filter-data.html',
})
export class FilterDataPage {

  tourType:any;
  filterData:any;
  default_currency:any;



  constructor(public navCtrl: NavController,public storage:Storage, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {
    this.tourType=navParams.get('tourType');
    this.filterData=navParams.get('filterData');

    this.storage.get('currency').then((val)=>{

      if(val==null){
        this.default_currency = "INR";

      }else{
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);


      }

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterDataPage');
  }

  goclick(pkgId){
    this.navCtrl.push(PackageDetailsPage,{pkgId:pkgId});

  }

}
