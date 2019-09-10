import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { CategoryPackageDetailsPage } from '../../pages/category-package-details/category-package-details';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-category',
  segment: 'page-category',
})
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public catId:any;
  public tourType:any;
  loading:Loading;
  data:Observable<any>;
  destination_details:any;
  searchDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {

    this.searchDetails = navParams.get('Details');
    this.catId=navParams.get('catId');
    this.tourType=navParams.get('tourType');

    // this.getDestinationList(this.catId,this.tourType);

    if (this.searchDetails != null) {

      console.log("this.searchDetails",this.searchDetails)
      this.showsearchData(this.searchDetails);
    }

    if(this.catId!=null){
      console.log("this.catId",this.catId)
      this.getDestinationList(this.catId,this.tourType);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  goclick(destId,cat_id){

    console.log("catId",this.catId,"dest",destId);
    this.navCtrl.push(CategoryPackageDetailsPage,{catId:cat_id,tourType:this.tourType,destId:destId});

  }

  getDestinationList(catId,tourType){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.get_destinationByCatId;
    let postData = new FormData();
    postData.append('catId',catId);
    postData.append('tourType',tourType);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("group",(data.json().data));
      this.destination_details = data.json().data;
    });
  }

  showsearchData(data){

    console.log("DATA__",data);
    this.destination_details = data.data;


  }

}
