import {Component, ViewChild} from '@angular/core';
import {App,Nav, Platform,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {IonicApp } from 'ionic-angular';





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
@Component({
  templateUrl: 'app.html'
})
export class TCommuniqueApp {
    @ViewChild(Nav) nav: Nav;

  	tabsPlacement: string = 'bottom';
  	tabsLayout: string = 'icon-top';
    // rootPage:any = BookNowPage;
    rootPage = HomePage;

    homeItem: any;
    initialItem: any;
    aboutus: any;
    privacypolicy:any;
    settingsItem: any;
    contactUs:any;
    scanner:any;
    myexperience:any;
    emergency_calling:any;
    nearbyplacesItem: Array<MenuItem>;
    converterItem: Array<MenuItem>;
    accountMenuItems: Array<MenuItem>;
    searchMenuItems: Array<MenuItem>;

  constructor(private ionicApp: IonicApp,public alertCtrl:AlertController,public  app: App,private androidPermissions: AndroidPermissions,private push: Push,public platform: Platform,public statusBar: StatusBar,public  splashScreen: SplashScreen) {

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
        const val = null;
          if(val==null)
          {

          }
          else
          {
            this.nav.setRoot(HomePage);
          }
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
      this.initializeApp();



        this.homeItem = { component: 'page-sign-in' };
        this.aboutus = { component: 'page-about-us'};
        this.privacypolicy = { component: 'page-privacy-policy'};
        this.contactUs = { component: 'page-contact-us'};
        this.myexperience={component:'page-experience'};
        this.scanner={component:'page-scanner'};
        this.emergency_calling = {component:'page-emergency-calling'};



        this.nearbyplacesItem = [
            {title: 'Nearby Places', component: 'page-nearby-places', icon: 'md-locate'}

        ];
        this.converterItem = [
          {title: 'Converter', component: 'page-currency-converter', icon: 'logo-yen'}

      ];
        this.accountMenuItems = [
            {title: 'Edit Profile', component: 'page-edit-profile', icon: 'create'}
                  ];

        this.searchMenuItems = [
            {title: 'Hotel Search', component: 'page-hotel-search', icon: 'md-home'},
            {title: 'Flight Search', component: 'page-flight-search', icon: 'md-plane'},
            {title: 'Bus Search', component: 'page-bus-search', icon: 'md-bus'}

        ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
        this.statusBar.overlaysWebView(false);
        this.splashScreen.hide();
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

