import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule,IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { Http,RequestOptions,HttpModule } from '@angular/http';
import { Network } from '@ionic-native/network';
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
import { CurrencyConverterPageModule } from '../pages/currency-converter/currency-converter.module';
import { CarBookingPageModule } from '../pages/car-booking/car-booking.module';
import { NearbyPlacesPageModule } from '../pages/nearby-places/nearby-places.module';
import { IonicRatingModule } from 'ionic-rating';
import { Geolocation ,GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { GooglePlus } from '@ionic-native/google-plus';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BusSearchPageModule } from '../pages/bus-search/bus-search.module';
import { LanguagePageModule } from '../pages/language/language.module';
import { FilterPageModule } from '../pages/filter/filter.module';
import { CategoryPackageDetailsPageModule } from '../pages/category-package-details/category-package-details.module';
import { FlightSearchPageModule } from '../pages/flight-search/flight-search.module';
import { AboutUsPageModule } from '../pages/about-us/about-us.module';
import { PrivacyPolicyPageModule } from '../pages/privacy-policy/privacy-policy.module';
import { ConstantProvider } from '../providers/constant/constant';
import { PackageDetailsPageModule } from '../pages/package-details/package-details.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScannerPageModule } from '../pages/scanner/scanner.module';
import { QuotePreferencePageModule } from '../pages/quote-preference/quote-preference.module';
import { StarRatingModule } from 'ionic3-star-rating';
import { CallNumber } from '@ionic-native/call-number';
import { EmergencyCallingPageModule } from '../pages/emergency-calling/emergency-calling.module';
import { EditEmergencyCallPageModule } from '../pages/edit-emergency-call/edit-emergency-call.module';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { MyDocumentsPageModule } from '../pages/my-documents/my-documents.module';
import { SocialSharing } from '@ionic-native/social-sharing';
import { VideoProvider } from '../providers/video/video';
import { VideoCallPageModule } from '../pages/video-call/video-call.module';
import { DataProvider } from '../providers/data/data';
import {NativeAudio} from "@ionic-native/native-audio";
import { OtpVarificationPageModule } from '../pages/otp-varification/otp-varification.module';
import { UserProvider } from '../providers/user/user';
import { FilterDataPageModule } from '../pages/filter-data/filter-data.module';
import { MyWishListPageModule } from '../pages/my-wish-list/my-wish-list.module';
import { ComponentsExpandableComponent } from "../components/components-expandable/components-expandable";
import { Calendar } from '@ionic-native/calendar';
import {PlacesOfInterestPageModule} from '../pages/places-of-interest/places-of-interest.module';
import { DatePipe } from '@angular/common'














@NgModule({
  declarations: [
    TCommuniqueApp
          ],
  imports: [
    IonicRatingModule,
    HomePageModule,
    StarRatingModule,
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
    CurrencyConverterPageModule,
    CarBookingPageModule,
    NearbyPlacesPageModule,
    EditEmergencyCallPageModule,
    BusSearchPageModule,
    LanguagePageModule,
    FilterPageModule,
    CategoryPackageDetailsPageModule,
    PackageDetailsPageModule,
    FlightSearchPageModule,
    AboutUsPageModule,
    PrivacyPolicyPageModule,
    ScannerPageModule,
    QuotePreferencePageModule,
    EmergencyCallingPageModule,
    MyDocumentsPageModule,
    OtpVarificationPageModule,
    VideoCallPageModule,
    MyWishListPageModule,
    FilterDataPageModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(TCommuniqueApp, {
    	preloadModules: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot(),
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
    BarcodeScanner,
    Network,Camera,
    Push,AndroidPermissions,
    HttpClientModule,HttpClient,
    CallNumber,SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConstantProvider,
    VideoProvider,
    DataProvider,
    NativeAudio,
    UserProvider,
    Calendar,
    DatePipe
  ]
})
export class AppModule {}
