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
 * Generated class for the CategoryPackageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-category-package-details',
  segment:'page-category-package-details'
})
@Component({
  selector: 'page-category-package-details',
  templateUrl: 'category-package-details.html',
})
export class CategoryPackageDetailsPage {
  public catId:any;
  public tourType:any;
  public destId:any;
  loading:Loading;
  data:Observable<any>;
  ListofPackage_byDest:any;
  destinationName:any;
  destinationImg:any;
  byAir:any;
  byCar:any;
  byTrain:any;
  searchDetails:any;
  package_details:any;
  public listArray=[{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'},{name:'ASU',id:'#103',bgColor:'#8C1D40',fontColor:'#FFC627'},{name:'WVU',id:'#104',bgColor:'#EAAA00',fontColor:'#002855'},{name:'UNC',id:'#105',bgColor:'#7BAFD4',fontColor:'#ffffff'},{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'}];
  default_currency:any;

  startingprice:any;
  startingpriceAUD:any;
  startingpriceCAD:any;
  startingpriceCHF:any;
  startingpriceCNH:any;
  startingpriceEUR:any;
  startingpriceGBP:any;
  startingpriceJPY:any;
  startingpriceUSD:any;

  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {
    this.searchDetails = navParams.get('Details');
   
    this.catId=navParams.get('catId');
    this.tourType=navParams.get('tourType');
    this.destId = navParams.get('destId');

    this.storage.get('currency').then((val)=>{

      if(val==null){
        this.default_currency = "INR";

      }else{
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);

      
      }

    });
   

    if (this.searchDetails != null) {

      console.log("this.searchDetails",this.searchDetails)
      this.showsearchData(this.searchDetails);
    }

    if(this.catId!=null){
      console.log("this.catId",this.catId)
      this.getListofPackage_byDest(this.catId,this.tourType,this.destId);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPackageDetailsPage');
  }

  goclick(pkgId){
    console.log("pkgId",pkgId);
    this.navCtrl.push(PackageDetailsPage,{pkgId:pkgId});

  }

  customize(){
    this.navCtrl.push(CustomizePackagePage);
  }
  getListofPackage_byDest(catId,tourType,destId){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.get_listOfPackageByDestId;
    let postData = new FormData();
    postData.append('catId',catId);
    postData.append('tourType',tourType);
    postData.append('destId',destId);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("DATA_#",(JSON.stringify(data.json())));
      this.byAir = data.json().howToReach.byAir;
      this.byCar = data.json().howToReach.byCar;
      this.byTrain = data.json().howToReach.byTrain;
      this.ListofPackage_byDest = data.json().data;
      this.destinationName = data.json().destinationName;
      this.destinationImg = data.json().destinationImg;

      this.startingprice = data.json().startingPrice;
      this.startingpriceAUD= data.json().startingpriceAUD;
      this.startingpriceCAD = data.json().startingpriceCAD;
      this.startingpriceCHF = data.json().startingpriceCHF;
      this.startingpriceCNH = data.json().startingpriceCNH;
      this.startingpriceEUR = data.json().startingpriceEUR;
      this.startingpriceGBP = data.json().startingpriceGBP;
      this.startingpriceJPY = data.json().startingpriceJPY;
      this.startingpriceUSD = data.json().startingpriceUSD;

    });
  }

  showsearchData(data){

      console.log("DATA__",data);
      this.byAir = data.howToReach.byAir;
      this.byCar = data.howToReach.byCar;
      this.byTrain = data.howToReach.byTrain;
      this.ListofPackage_byDest = data.data;
      this.destinationName = data.destinationName;
      this.destinationImg = data.destinationImg;


  }
  filter(){
    this.navCtrl.push(FilterPage,{tourType:this.tourType});

  }

}
