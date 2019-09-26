import {Component, ViewChild} from '@angular/core';
import {Events,App,Nav, Platform,AlertController,ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {IonicApp } from 'ionic-angular';
import {DataProvider} from '../providers/data/data';
import {VideoProvider} from '../providers/video/video';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common'
import 'rxjs/add/observable/interval';







export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ForgotPwdPage } from '../pages/forgot-pwd/forgot-pwd';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { CategoryPage } from '../pages/category/category';
import { HotelSearchPage } from '../pages/hotel-search/hotel-search';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { CustomizePackagePage } from '../pages/customize-package/customize-package';
import { BookNowPage } from '../pages/book-now/book-now';
import { ExperiencePage } from '../pages/experience/experience';
import { CurrencyConverterPage } from '../pages/currency-converter/currency-converter';
import { CarBookingPage } from '../pages/car-booking/car-booking';
import { NearbyPlacesPage } from '../pages/nearby-places/nearby-places';
import { BusSearchPage } from '../pages/bus-search/bus-search';
import { LanguagePage } from '../pages/language/language';
import { FilterPage } from '../pages/filter/filter';
import { CategoryPackageDetailsPage } from '../pages/category-package-details/category-package-details';
import { FlightSearchPage } from '../pages/flight-search/flight-search';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { PackageDetailsPage } from '../pages/package-details/package-details';
import { EmergencyCallingPage } from '../pages/emergency-calling/emergency-calling';
import { MyDocumentsPage } from '../pages/my-documents/my-documents';
import { VideoCallPage } from '../pages/video-call/video-call';
import { OtpVarificationPage} from '../pages/otp-varification/otp-varification';
import { UserProvider } from '../providers/user/user';
import { MyWishListPage } from '../pages/my-wish-list/my-wish-list';
import { Calendar } from '@ionic-native/calendar';

import { AndroidPermissions } from '@ionic-native/android-permissions';



@Component({
  templateUrl: 'app.html'
})
export class TCommuniqueApp {
    @ViewChild(Nav) nav: Nav;

  	tabsPlacement: string = 'bottom';
  	tabsLayout: string = 'icon-top';
    rootPage:any = HomePage;
    // rootPage = BusSearchPage;
    homeItem: any;
    initialItem: any;
    aboutus: any;
    privacypolicy:any;
    settingsItem: any;
    contactUs:any;
    scanner:any;
    myexperience:any;
    emergency_calling:any;
    mydocuments:any;
    carBooking:any;
    signinItem:any;
    nearbyplacesItem: Array<MenuItem>;
    converterItem: Array<MenuItem>;
    accountMenuItems: any;
    searchMenuItems: Array<MenuItem>;
    public login_status = false;
    user_img:any;
    username:any;
    mywishlist:any;
    data:Observable<any>;
    latest_date:any;
    user_review:any;
    role:any;
    videoId:any;


  constructor(public datepipe: DatePipe,private calendar: Calendar,public http:HttpClient,public constant:ConstantProvider,public userProvider:UserProvider,public storage:Storage,public videoProvider : VideoProvider,public modalCtrl:ModalController,public events:Events,private ionicApp: IonicApp,public alertCtrl:AlertController,public  app: App,private androidPermissions: AndroidPermissions,private push: Push,public platform: Platform,public statusBar: StatusBar,public  splashScreen: SplashScreen) {

    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      this.events.subscribe('openVideocall',()=>{
        let profileModal = this.modalCtrl.create(VideoCallPage);
        profileModal.present();
      })



      this.storage.get('user_login_data').then((val) => {
        if(val==null)
        {

        }
        else
        {

          const userData= {
            uniqueId:val.videoId,
            name:val.username

          }

          console.log("userData",userData);

          this.videoProvider.InitializingRTC(userData);
        }
      });




  });


    platform.registerBackButtonAction(() => {
      let activeModal=this.ionicApp._modalPortal.getActive();
      if(activeModal){
          activeModal.dismiss();
            return;
        }

      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();
      let view = this.nav.getActive();

      let page = view ? this.nav.getActive().instance : null;



      if(page && (page instanceof HomePage) ){
              const alert = this.alertCtrl.create({
                  title: 'Warning',
                  message: 'Do you want to close the app?',
                  buttons: [{
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                          console.log('Application exit prevented!');
                      }
                  },{
                      text: 'Close App',
                      handler: () => {
                          this.platform.exitApp();
                      }
                  }]
              });
              alert.present();

      }else if(page && (page instanceof SignInPage)){
        // const val = null;
        //   if(val==null)
        //   {

        //   }
        //   else
        //   {
        //     this.nav.setRoot(HomePage);
        //   }

        this.storage.get('user_login_data').then((val) => {
          if(val==null)
          {

          }
          else
          {


            this.nav.setRoot(HomePage);
          }
        });
      }
      else
      {
        if (nav.canGoBack()){
          nav.pop();
        }
        else
        {
          this.nav.setRoot(HomePage);
        }
      }
  });

  // setInterval(() => {

    console.log("DAYA")
    events.subscribe('user:login', () => {
      console.log("logged in");
      this.storage.get('user_login_data').then((val)=>{

      console.log("hsh",val.role);
      if(val==null)
      {
        this.login_status = false;
      }
      else
      {


        this.getReminder(val.uId);
      console.log("username","come here");
      this.login_status=true;
      this.user_img=val.profileData.profImg;
      this.username=val.username;
      this.role = val.role;
      this.videoId = val.videoId;
      console.log("username",this.username);


      }

      })
      });
    // }, 30000);




    this.user_img=this.userProvider.get_user_img();
    this.username=this.userProvider.get_user_name();
    console.log('Image :- '+this.user_img);
    console.log('Name :- '+this.username);



      this.initializeApp();



        this.homeItem = { component: 'page-home' };
        this.aboutus = { component: 'page-about-us'};
        this.privacypolicy = { component: 'page-privacy-policy'};
        this.contactUs = { component: 'page-contact-us'};
        this.myexperience={component:'page-experience'};
        this.scanner={component:'page-scanner'};
        this.emergency_calling = {component:'page-emergency-calling'};
        this.mydocuments = { component:'page-my-documents'};
        this.carBooking = { component:'page-car-booking'};
        this.signinItem = { component: 'page-sign-in' };
        this.mywishlist = { component: 'page-my-wish-list' };
        this.user_review= { component: 'page-user-review'};



        this.nearbyplacesItem = [
            {title: 'Nearby Restaurant', component: 'page-nearby-places', icon: 'md-locate'},
            {title: 'Places of Interest', component: 'page-places-of-interest', icon: 'md-locate'}


        ];
        this.converterItem = [
          {title: 'Converter', component: 'page-currency-converter', icon: 'logo-yen'}

      ];
        this.accountMenuItems =
            {component: 'page-edit-profile'};

        this.searchMenuItems = [
            {title: 'Own Properties', component: 'page-hotel-search', icon: 'md-home'},
            {title: 'Hotel Search', component: 'page-hotel-search-goibibo', icon: 'md-home'},
            {title: 'Flight Search', component: 'page-flight-search', icon: 'md-plane'},
            {title: 'Bus Search', component: 'page-bus-search', icon: 'md-bus'}

        ];


  }



  getReminder(u_Id){

    var url =this.constant.reminder;
    let postData = new FormData();
    postData.append('uId',u_Id);


    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("Reminder DATA",data);
      for(let file of data.data) {

        this.calendar.findEvent(file.title, null, 'TC', new Date(file.date+' '+file.startTime), new Date(file.date+' '+file.endTime)).then(
          (msg) => {
            if(msg=='')
              {
                console.log("Hello",file);
                this.calendar.createEvent(file.title,null, 'TC', new Date(file.date+' '+file.startTime), new Date(file.date+' '+file.endTime)).then(

                  (msg) => {
                    console.log("Success Msg",msg);
                  },
                  (err) => {
                    console.log("err Msg",err);
                  });
              }
              else
              {

              }
          }, (err) => {

          });



      }





    });
  }



  initializeApp() {
    this.platform.ready().then(() => {
        this.statusBar.overlaysWebView(false);
        this.splashScreen.hide();
        // this.events.subscribe('openVideocall',()=>{
        //   let profileModal = this.modalCtrl.create(VideoCallPage);
        //   profileModal.present();
        // })
        // const userData= {
        //   uniqueId:this.videoId,
        //   name:this.username

        // }

        // console.log("userData",userData);

        // this.videoProvider.InitializingRTC(userData);



        this.pushNotify();
    });

    if (!this.platform.is('mobile')) {
      this.tabsPlacement = 'top';
      this.tabsLayout = 'icon-left';
    }
  }
   openPage(page) {
      this.nav.setRoot(page.component);
    }
    openPage2(page){

      if(this.login_status){
        this.nav.setRoot(page.component);
      }else{
        this.nav.setRoot(this.signinItem.component);
      }
    }

   login(page)
    {
    this.nav.push(page.component);
    }
    logout(page){
      console.log('Logout');
      this.login_status=false;
      this.storage.remove('user_login_data');


      this.nav.setRoot(HomePage);

    }

  pushNotify(){

    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {

      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
        this.notifyInit();
      } else {
        console.log('We do not have permission to send push notifications');
      }

    });

      // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
      this.push.createChannel({
        id: "testchannel1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
      }).then(() => console.log('Channel created'));

      // Delete a channel (Android O and above)
      this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

      // Return a list of currently configured channels
      this.push.listChannels().then((channels) => console.log('List of channels', channels))


  }

  notifyInit(){
    // to initialize push notifications

const options: PushOptions = {
  android: {
    senderID:'416461815684',
        icon: 'icon',
        iconColor: '#228DFE',
        sound: true,
        vibrate: true,
        clearBadge: true,
        clearNotifications: true,
  },
  ios: {
      alert: 'true',
      badge: true,
      sound: 'false'
  },
  windows: {},
  browser: {
      pushServiceURL: 'http://push.api.phonegap.com/v1/push'
  }
}

const pushObject: PushObject = this.push.init(options);


pushObject.on('notification').subscribe((notification: any) =>
{


  console.log('Received a notification', notification);
});

const subsc =["college"];
pushObject.on('registration').subscribe((registration: any) =>
{
  for(let ss of subsc){
    pushObject.subscribe(ss).then((res:any) => {
      console.log("subscribed to topic: ", res);
    });
  }
  console.log('Device registered', registration);
});

pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}

