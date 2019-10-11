import { Component } from '@angular/core';
import { IonicPage,ToastController,ModalController,Nav,NavController, NavParams,MenuController,Loading,LoadingController,AlertController,Platform} from 'ionic-angular';
import { CategoryPage } from '../../pages/category/category';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CategoryPackageDetailsPage } from '../../pages/category-package-details/category-package-details';
import 'rxjs/add/observable/interval';
import { QuotePreferencePage } from '../../pages/quote-preference/quote-preference';
import { Network } from '@ionic-native/network';
import { CallNumber } from '@ionic-native/call-number';
import {VideoProvider} from '../../providers/video/video';
import { FilterPage } from '../../pages/filter/filter';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { CurrencyConverterPage } from '../../pages/currency-converter/currency-converter';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NetworkConnectionProvider } from '../../providers/network-connection/network-connection';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {VideoCallPage} from '../../pages/video-call/video-call';
import * as launcher from '../../assets/js/start-app';






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
  destination_inter:any;
  destination_domestic:any;
  emergency_number_contact1:any;
  emergency_number_contact2:any;
  emergency_number_contact3:any;
  emergency_number_contact4:any;

  searchTerm: string = '';
  searching: any = false;
  domesticImg:any;
  internationalImg:any;
  trendingDest_domestic:any;
  trendingDest_international:any;
  default_currency:any;
  login_status:any;
  uId:any;
  role:any;
  video_agent1:any;
  video_agent2:any;




  private readonly tawkChatLink : string = 'https://tawk.to/chat/5d8c51196c1dde20ed03855b/default/?$_tawk_popout=true';

  public listArray=[{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'},{name:'ASU',id:'#103',bgColor:'#8C1D40',fontColor:'#FFC627'},{name:'WVU',id:'#104',bgColor:'#EAAA00',fontColor:'#002855'},{name:'UNC',id:'#105',bgColor:'#7BAFD4',fontColor:'#ffffff'},{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'}];

  constructor(public modalCtrl:ModalController,private platform: Platform,private iab: InAppBrowser, private networkConnection: NetworkConnectionProvider,private androidPermissions:AndroidPermissions,public storage:Storage,public events:Events,public videoProvider:VideoProvider,private callNumber: CallNumber, public menuCtrl:MenuController,private network:Network,public toastCtrl: ToastController,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,private alertCtrl: AlertController)
  {
    this.icons = "INTERNATIONAL";
    this.events.publish('user:login');


    this.storage.get('currency').then((val)=>{
      console.log("VAL11",val);
      if(val==null){
        this.default_currency = "INR";

      }else{
        console.log("VAL22",val);
        this.default_currency = val.name;
        console.log("VAL)))",this.default_currency);


      }

    });

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
      this.role = val.role;

      }

      })
    this.networkCheck();
    this.addConnectivityListeners();



  }


  addConnectivityListeners() {

    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code.
      if (readySource == "cordova") {
        this.networkConnection.addConnectivityListenersDevice();
      }
      else if (readySource == "dom") {
         this.networkConnection.addConnectivityListenersBrowser();
      }
    });

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error Internet Connection',
      subTitle: 'There is no internet connection. Please check your connection.',
      buttons: ['OK']
    });
    alert.present();
  }

  onClickChat(){
    console.log("Ko")

    if (this.networkConnection.hasConnection()) {
      console.log("tu")
      const browser = this.iab.create(this.tawkChatLink,'_self',{location:'no'});
    }
    else this.presentAlert();
  }



  networkCheck(){
    let status=this.network.type;
    console.log("status",status);
    if(status=='none')
    {
      let t = this.toastCtrl.create({
        message: 'Please enable your internet connection to continue.',
        showCloseButton: true,
        closeButtonText: 'Retry',
        position: 'bottom'
      });
      let closedByTimeout = false;
      let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 30000);
      t.onDidDismiss(() => {
        if (closedByTimeout) return;
        clearTimeout(timeoutHandle);
        // Dismiss manually
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        console.log('dismiss manually');
      });
      t.present();
    }
    else
    {
      this.menuCtrl.swipeEnable(true, 'authenticated');
      this.menuCtrl.enable(true);
      this.events.publish('user:login');
      this.videoAgentList();
      this.getCategoryList();
      this.destinationByCat();
      this.get_viewAgentContact();
      this.get_bannerImages();
      this.get_trendingDest();

    }
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]).then(
        result2 => {},
      ),


      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
    );


  }

  search(tour_Type){
    console.log("WHJHW",this.searchTerm,tour_Type);
    this.setFilteredItems(this.searchTerm,tour_Type);
  }

  getCategoryList(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.get_category_list;
    // let postData = new FormData();
    // postData.append('cityId',id);

    this.data = this.http.get(url);
    this.data.subscribe(data =>{

      console.log("section_group",(JSON.stringify(data.json().data)));
      // this.loading.dismiss();
      this.categorydet_inter=data.json().data["international"];
      this.categorydet_domestic = data.json().data["domestic"];
    });
  }
  destinationByCat(){
    this.loading = this.loadingCtrl.create({
      content:'Please wait...',
      dismissOnPageChange:true
    });
    // this.loading.present();

    var url = this.constant.get_destinationByCat;
    this.data  =this.http.get(url);
    this.data.subscribe(data=>{
      // this.loading.dismiss();
      // console.log("DATA_by_destination",(JSON.stringify(data.json().data)));
      this.destination_inter=data.json().data["international"];
      this.destination_domestic = data.json().data["domestic"];
    })
  }

  get_viewAgentContact(){
    this.loading = this.loadingCtrl.create({
      content:"Please wait... ",
      dismissOnPageChange:true
    });
    var url2 = this.constant.get_viewAgentContact;
    this.data = this.http.get(url2);
    this.data.subscribe(data=>{
      console.log("Emergency",data.json().data.contact1);
      this.emergency_number_contact1 = data.json().data.contact1;
      this.emergency_number_contact2 = data.json().data.contact2;
      this.emergency_number_contact3 = data.json().data.contact3;
      this.emergency_number_contact4 = data.json().data.contact4;

    })
  }

  go(category_inter){
    let catId=category_inter.catId;

    console.log("this.icons",this.icons)

    if(this.icons==="INTERNATIONAL"){
          this.navCtrl.push(CategoryPage,{catId:catId,tourType:"International"});
    }
    if(this.icons==="DOMESTIC"){
          this.navCtrl.push(CategoryPage,{catId:catId,tourType:"Domestic"});
    }


  }
  go_package_det(catId,destId){

    console.log("DATA",catId,destId);
    if(this.icons==="INTERNATIONAL"){
      this.navCtrl.push(CategoryPackageDetailsPage,{catId:catId,tourType:"International",destId:destId});
    }
    if(this.icons==="DOMESTIC"){
          this.navCtrl.push(CategoryPackageDetailsPage,{catId:catId,tourType:"Domestic",destId:destId});
    }

  }

  doRefresh(refresher) {
    this.networkCheck();


    setTimeout(() => {
      console.log('Async operation has ended',this.icons);
      refresher.complete();
    }, 2000);
  }
  plan_my_holiday(){

    if(this.login_status){

      this.navCtrl.push(QuotePreferencePage);
    }else{
      this.navCtrl.push(SignInPage);
    }
  }
  callNumber_ph1(){
    this.callNumber.callNumber(this.emergency_number_contact1, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  callNumber_ph2(){
    this.callNumber.callNumber(this.emergency_number_contact2, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  callNumber_ph3(){
    this.callNumber.callNumber(this.emergency_number_contact1, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  callNumber_ph4(){
    this.callNumber.callNumber(this.emergency_number_contact4, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  VideoCall1(){

    if(this.login_status){

      console.log("video_agent1",this.video_agent1);

    this.videoProvider.MakeCall(this.video_agent1);

    }else{
      this.navCtrl.push(SignInPage);
    }

  }
  VideoCall2(){

    if(this.login_status){
    console.log("video_agent2",this.video_agent2);

    this.videoProvider.MakeCall(this.video_agent2);

    }else{
      this.navCtrl.push(SignInPage);
    }

  }

  onClickWhatsapp(){
          var sApp = (window as any).startApp.set({
            "package":"com.whatsapp"
        });

        // check app for exists
        sApp.check(function(values) {
            // sApp.start();
            launcher.packageLaunch("com.whatsapp");
        }, function(error) { // not exists, open play market
          (window as any).startApp.set({
                "action":"ACTION_VIEW",
                "uri":"market://details?id=com.whatsapp"
            }).start();
        });
  }


  setFilteredItems(searchTerm,tour_Type)
  {

      if(searchTerm.length >=3 ){
        this.getSearchItem(this.searchTerm,tour_Type);

        console.log("HELLO FILTER",this.searchTerm);


      }

  }

  getSearchItem(search,tour_Type)
  {

    console.log("sss",search);
    // this.items = [];
    // this.type = [];
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.search;
    let postData = new FormData();
    postData.append('keyword',search);
    postData.append('tourType',tour_Type);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{
      console.log("DATA_SEARCH",data.json());
      this.loading.dismiss();

      const type  = data.json().type;

      if(data.json().data.length!=0){

        if(type === "Package"){
          console.log("Package");

          this.navCtrl.push(CategoryPackageDetailsPage,{Details: data.json(),tourType:tour_Type});


        }
        if(type === "Destination"){
          console.log("Destination");
          this.navCtrl.push(CategoryPage,{Details: data.json(),tourType:tour_Type});
        }

      }else{
        let t = this.toastCtrl.create({
          message: "No data found ...",
          position: 'bottom'
        });
        let closedByTimeout = false;
        let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 7000);
        t.onDidDismiss(() => {
          if (closedByTimeout) return;
          clearTimeout(timeoutHandle);

        });
        t.present();
      }



    });
  }


  get_bannerImages(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.bannerImages;
    this.data = this.http.get(url);
    this.data.subscribe(data =>{
      console.log("bannerImages",data.json().data.internationalImg);
      this.internationalImg = data.json().data.internationalImg;
      this.domesticImg = data.json().data.domesticImg;
      // this.loading.dismiss();
    });

  }
  get_trendingDest(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.trendingDest;
    this.data = this.http.get(url);
    this.data.subscribe(data =>{

      console.log("DATATATA",data);
      // this.loading.dismiss();
      this.trendingDest_international = data.json().data["International"];
      this.trendingDest_domestic = data.json().data["Domestic"];
    });

  }

  trending_inter_click(data){

    console.log("DATA",data);

    this.navCtrl.push(CategoryPackageDetailsPage,{catId:data.catId,tourType:"International",destId:data.destId});


  }

  trending_domestic_click(data){
    this.navCtrl.push(CategoryPackageDetailsPage,{catId:data.catId,tourType:"Domestic",destId:data.destId});

  }

  go_converter(){
    this.navCtrl.push(CurrencyConverterPage);

  }


  videoAgentList(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    var url =this.constant.videoAgentList;

    this.data = this.http.get(url);
    this.data.subscribe(data =>{
      console.log('DATA2222',data.json().data);
      this.video_agent1 = data.json().data[0].videoId;
      this.video_agent2 = data.json().data[1].videoId;
    });
  }



}
