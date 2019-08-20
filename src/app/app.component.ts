import {Component, ViewChild} from '@angular/core';
import {App,Nav, Platform,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';




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
import { InternationalPage } from '../pages/international/international';
import { DomesticPage } from '../pages/domestic/domestic';
import { CurrencyConverterPage } from '../pages/currency-converter/currency-converter';
import { CarBookingPage } from '../pages/car-booking/car-booking';
import { NearbyPlacesPage } from '../pages/nearby-places/nearby-places';
@Component({
  templateUrl: 'app.html'
})
export class TCommuniqueApp {
    @ViewChild(Nav) nav: Nav;

  	tabsPlacement: string = 'bottom';
  	tabsLayout: string = 'icon-top';
    rootPage:any = SignUpPage;
    homeItem: any;
    initialItem: any;
    messagesItem: any;
    settingsItem: any;
    contactUs:any;
    myexperience:any;
    nearbyplacesItem: Array<MenuItem>;
    converterItem: Array<MenuItem>;
    accountMenuItems: Array<MenuItem>;
    searchMenuItems: Array<MenuItem>;

  constructor(public alertCtrl:AlertController,public  app: App,private androidPermissions: AndroidPermissions,private push: Push,public platform: Platform,public statusBar: StatusBar,public  splashScreen: SplashScreen) {
    this.initializeApp();



    platform.registerBackButtonAction(() => {

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


        this.homeItem = { component: 'page-sign-in' };
        this.messagesItem = { component: 'page-home'};
        this.contactUs = { component: 'page-contact-us'};
        this.myexperience={component:'page-experience'};



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
            {title: 'Hotel Search', component: 'page-home', icon: 'md-home'},
            {title: 'Flight Search', component: 'page-home', icon: 'md-plane'},
            {title: 'Bus Search', component: 'page-home', icon: 'md-bus'}

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
    senderID:'416461815684'
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


pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}

