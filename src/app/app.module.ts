import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule,IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TCommuniqueApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { SignInPageModule } from '../pages/sign-in/sign-in.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { ForgotPwdPageModule } from '../pages/forgot-pwd/forgot-pwd.module';
import { ContactUsPageModule }from '../pages/contact-us/contact-us.module';
import { CategoryPageModule } from '../pages/category/category.module';
import { HotelSearchPageModule } from '../pages/hotel-search/hotel-search.module';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';
import { CustomizePackagePageModule } from '../pages/customize-package/customize-package.module';
import { BookNowPageModule } from '../pages/book-now/book-now.module';
import { ExperiencePageModule } from '../pages/experience/experience.module';
import { InternationalPageModule } from '../pages/international/international.module';
import { DomesticPageModule } from '../pages/domestic/domestic.module';
import { CurrencyConverterPageModule } from '../pages/currency-converter/currency-converter.module';
import { CarBookingPageModule } from '../pages/car-booking/car-booking.module';
import { NearbyPlacesPageModule } from '../pages/nearby-places/nearby-places.module';
import { IonicRatingModule } from 'ionic-rating';
import { Geolocation ,GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { GooglePlus } from '@ionic-native/google-plus';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';









@NgModule({
  declarations: [
    TCommuniqueApp
          ],
  imports: [
    IonicRatingModule,
    HomePageModule,
    SignInPageModule,
    SignUpPageModule,
    ForgotPwdPageModule,
    ContactUsPageModule,
    CategoryPageModule,
    HotelSearchPageModule,
    EditProfilePageModule,
    CustomizePackagePageModule,
    BookNowPageModule,
    ExperiencePageModule,
    InternationalPageModule,
    DomesticPageModule,
    CurrencyConverterPageModule,
    CarBookingPageModule,
    NearbyPlacesPageModule,
    BrowserModule,
    IonicModule.forRoot(TCommuniqueApp, {
    	preloadModules: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      tabsPlacement: 'top'
    }),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [IonicApp],
  entryComponents: [
    TCommuniqueApp
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GooglePlus,
    Push,AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}
