import { Component } from '@angular/core';
import { IonicPage,ToastController,ModalController,Nav,NavController, NavParams,MenuController,Loading,LoadingController,AlertController,Platform} from 'ionic-angular';
import { CategoryPage } from '../../pages/category/category';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';









@IonicPage({
	name: 'page-home',
	segment: 'page-home',
	priority: 'high'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  icons:any;
  loading:Loading;
  data:Observable<any>;
  categorydet_inter:any;
  categorydet_domestic:any;


  public listArray=[{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'},{name:'ASU',id:'#103',bgColor:'#8C1D40',fontColor:'#FFC627'},{name:'WVU',id:'#104',bgColor:'#EAAA00',fontColor:'#002855'},{name:'UNC',id:'#105',bgColor:'#7BAFD4',fontColor:'#ffffff'},{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'}];

  constructor(public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {
    this.icons = "INTERNATIONAL";

    this.getCategoryList();

  }

  getCategoryList(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.get_category_list;
    // let postData = new FormData();
    // postData.append('cityId',id);

    this.data = this.http.get(url);
    this.data.subscribe(data =>{

      console.log("section_group",(JSON.stringify(data.json().data)));
      this.loading.dismiss();
      this.categorydet_inter=data.json().data["international"];
      this.categorydet_domestic = data.json().data["domestic"];
    });
  }

  go(){
    this.navCtrl.push(CategoryPage);


  }


}
