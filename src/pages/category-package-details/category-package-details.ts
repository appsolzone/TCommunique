import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ToastController} from 'ionic-angular';
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
import { HomePage } from '../../pages/home/home';




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
  userReview:any;
  isFav:boolean=false;
  uId:any;

  getWishlistData:any;


  constructor(public storage:Storage,public navCtrl: NavController,private toast:ToastController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController)
  {
    this.searchDetails = navParams.get('Details');

    this.catId=navParams.get('catId');
    this.tourType=navParams.get('tourType');
    this.destId = navParams.get('destId');

    this.storage.get('currency').then((val)=>{

      if(val==null)
      {
        this.default_currency = "INR";

      }else
      {
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);
      }

    });

    if (this.searchDetails != null)
    {
      console.log("this.searchDetails",this.searchDetails)
      this.showsearchData(this.searchDetails);
    }

    if(this.catId!=null)
    {
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

  customize()
  {
    this.navCtrl.push(CustomizePackagePage);
  }

  getListofPackage_byDest(catId,tourType,destId)
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();

    var url =this.constant.get_listOfPackageByDestId;
    let postData = new FormData();
    postData.append('catId',catId);
    postData.append('tourType',tourType);
    postData.append('destId',destId);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      // console.log("DATA_#$",(JSON.stringify(data.json())));
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

      this.storage.get('user_login_data').then((val) => {
        console.log('user_login_data', val);
        if(val)
        {
          this.uId = val.uId;
          this.viewWishlist();
        }
        else
        {
          this.get_UserReview();
        }
      });


    });
  }

  showsearchData(data)
  {
      console.log("DATA__",data);
      this.byAir = data.howToReach.byAir;
      this.byCar = data.howToReach.byCar;
      this.byTrain = data.howToReach.byTrain;
      this.ListofPackage_byDest = data.data;
      this.destinationName = data.destinationName;
      this.destinationImg = data.destinationImg;

      this.startingprice = data.startingPrice;
      this.startingpriceAUD= data.startingpriceAUD;
      this.startingpriceCAD = data.startingpriceCAD;
      this.startingpriceCHF = data.startingpriceCHF;
      this.startingpriceCNH = data.startingpriceCNH;
      this.startingpriceEUR = data.startingpriceEUR;
      this.startingpriceGBP = data.startingpriceGBP;
      this.startingpriceJPY = data.startingpriceJPY;
      this.startingpriceUSD = data.startingpriceUSD;
  }

  filter()
  {
    this.navCtrl.push(FilterPage,{tourType:this.tourType});
  }

  get_UserReview()
  {
    // this.loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   dismissOnPageChange: true
    // });
    // this.loading.present();
    var url =this.constant.fetch_user_review;
    this.data = this.http.get(url);
    this.data.subscribe(data =>{
      this.userReview = data.json().data;
      this.loading.dismiss();
    });
  }

  setUserFav(data)
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();

    var url =this.constant.addToWishList;
    let postData = new FormData();
    postData.append('uId',this.uId);
    postData.append('pkgId',data.pkgId);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{
      // this.loading.dismiss();

      let toast = this.toast.create({
        message: data.json().msg,
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

      this.viewWishlist();
    });

  }

  viewWishlist()
  {
    // this.loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   dismissOnPageChange: true
    // });
    // this.loading.present();
    this.getWishlistData=[];
    var url =this.constant.viewWishList;
    let postData = new FormData();
    postData.append('uId',this.uId);
    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{
      // console.log("getWishlistData",JSON.stringify(data.json()));
      this.getWishlistData = data.json().data;

      let ListofPackage_byDest_data=[];
      ListofPackage_byDest_data =this.ListofPackage_byDest;
      this.ListofPackage_byDest=[];

      let status = data.json().status;

      if(status ==400){
        this.ListofPackage_byDest = ListofPackage_byDest_data;
      }else{
        for(let i=0;i<ListofPackage_byDest_data.length;i++)
        {
          for(let j=0;j<this.getWishlistData.length;j++)
          {
            if(ListofPackage_byDest_data[i].pkgId==this.getWishlistData[j].pkgId)
            {
              let obj=
              {
                  pkgId:ListofPackage_byDest_data[i].pkgId,
                  pkgTitle:ListofPackage_byDest_data[i].pkgTitle,
                  duration:ListofPackage_byDest_data[i].duration,
                  startingPrice:ListofPackage_byDest_data[i].startingPrice,
                  priceUSD:ListofPackage_byDest_data[i].priceUSD,
                  priceEUR:ListofPackage_byDest_data[i].priceEUR,
                  priceJPY:ListofPackage_byDest_data[i].priceJPY,
                  priceGBP:ListofPackage_byDest_data[i].priceGBP,
                  priceAUD:ListofPackage_byDest_data[i].priceAUD,
                  priceCAD:ListofPackage_byDest_data[i].priceCAD,
                  priceCHF:ListofPackage_byDest_data[i].priceCHF,
                  priceCNH:ListofPackage_byDest_data[i].priceCNH,
                  tourType:ListofPackage_byDest_data[i].tourType,
                  overview:ListofPackage_byDest_data[i].overview,
                  inclusion:ListofPackage_byDest_data[i].inclusion,
                  exclusion:ListofPackage_byDest_data[i].exclusion,
                  flight:ListofPackage_byDest_data[i].flight,
                  cab:ListofPackage_byDest_data[i].cab,
                  hotel:ListofPackage_byDest_data[i].hotel,
                  hotelRating:ListofPackage_byDest_data[i].hotelRating,
                  meal:ListofPackage_byDest_data[i].meal,
                  sightSeeing:ListofPackage_byDest_data[i].sightSeeing,
                  other:ListofPackage_byDest_data[i].other,
                  pkgImg:this.getWishlistData[j].pkgImg,
                  destId:this.getWishlistData[j].destId,
                  catId:this.getWishlistData[j].catId,
                  favHeart:"yes"
              }

              if(this.ListofPackage_byDest[i])
              {
                this.ListofPackage_byDest.splice(i, 1);
                this.ListofPackage_byDest.splice(i, 0,obj);
              }
              else
              {
                this.ListofPackage_byDest.push(obj);
              }
            }
            else
            {
              let obj=
              {
                  pkgId:ListofPackage_byDest_data[i].pkgId,
                  pkgTitle:ListofPackage_byDest_data[i].pkgTitle,
                  duration:ListofPackage_byDest_data[i].duration,
                  startingPrice:ListofPackage_byDest_data[i].startingPrice,
                  priceUSD:ListofPackage_byDest_data[i].priceUSD,
                  priceEUR:ListofPackage_byDest_data[i].priceEUR,
                  priceJPY:ListofPackage_byDest_data[i].priceJPY,
                  priceGBP:ListofPackage_byDest_data[i].priceGBP,
                  priceAUD:ListofPackage_byDest_data[i].priceAUD,
                  priceCAD:ListofPackage_byDest_data[i].priceCAD,
                  priceCHF:ListofPackage_byDest_data[i].priceCHF,
                  priceCNH:ListofPackage_byDest_data[i].priceCNH,
                  tourType:ListofPackage_byDest_data[i].tourType,
                  overview:ListofPackage_byDest_data[i].overview,
                  inclusion:ListofPackage_byDest_data[i].inclusion,
                  exclusion:ListofPackage_byDest_data[i].exclusion,
                  flight:ListofPackage_byDest_data[i].flight,
                  cab:ListofPackage_byDest_data[i].cab,
                  hotel:ListofPackage_byDest_data[i].hotel,
                  hotelRating:ListofPackage_byDest_data[i].hotelRating,
                  meal:ListofPackage_byDest_data[i].meal,
                  sightSeeing:ListofPackage_byDest_data[i].sightSeeing,
                  other:ListofPackage_byDest_data[i].other,
                  pkgImg:"",
                  destId:"",
                  catId:"",
                  favHeart:"no"
              }

              if(this.ListofPackage_byDest[i])
                {
                  if(this.ListofPackage_byDest[i].favHeart=='yes')
                  {

                  }
                  else
                  {
                    this.ListofPackage_byDest.splice(i, 1);
                    this.ListofPackage_byDest.splice(i, 0,obj);
                  }
                }
              else
                {
                  this.ListofPackage_byDest.push(obj);
                }
            }
          }
        }

      }

      // this.loading.dismiss();
      this.get_UserReview();
    });

  }

  home()
  {
    this.navCtrl.setRoot(HomePage);
  }

}
