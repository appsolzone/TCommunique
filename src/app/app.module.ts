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
    CurrencyConverterPageModule,
    CarBookingPageModule,
    NearbyPlacesPageModule,
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
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(TCommuniqueApp, {
    	preloadModules: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
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
    BarcodeScanner,
    Network,
    Push,AndroidPermissions,
    HttpClientModule,HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConstantProvider
  ]
})
export class AppModule {}
