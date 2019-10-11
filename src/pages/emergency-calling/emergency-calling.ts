import { Component } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams,LoadingController,Loading,ModalController,ToastController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { CallNumber } from '@ionic-native/call-number';
import { EditEmergencyCallPage } from '../../pages/edit-emergency-call/edit-emergency-call';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';


/**
 * Generated class for the EmergencyCallingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-emergency-calling',
  segment:'page-emergency-calling'
})
@Component({
  selector: 'page-emergency-calling',
  templateUrl: 'emergency-calling.html',
})
export class EmergencyCallingPage {
  loading:Loading;
  data:Observable<any>;
  secondary_no:any;
  primary_name:any;
  primary_number:any;
  primary_uid:any;
  primary_id:any;
  primary_img:any;
  uId:any;
  lat:any;
  long:any;
  address:any;
  fulladdress:any;
  img_status:any;
  selectedImage:any;

  constructor(public toastCtrl:ToastController,private openNativeSettings: OpenNativeSettings,private storage: Storage,private modal: ModalController,private callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,private platform: Platform,private diagnostic: Diagnostic,private androidPermissions: AndroidPermissions,private locationAccuracy: LocationAccuracy,private nativeGeocoder: NativeGeocoder,private geolocation:Geolocation) {

      storage.get('user_login_data').then((val) => {
        console.log('user_login_data', val);
        this.uId = val.uId;
        this.get_emergencyContact(this.uId);
      });


  }

  ionViewDidLoad() {
    this.checkLoc();
    console.log('ionViewDidLoad EmergencyCallingPage');
  }

  get_emergencyContact(u_Id){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.get_emergencyContact;
    let postData = new FormData();

    console.log("uId",u_Id);
    postData.append('uId',u_Id);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("get_emergencyContact",(JSON.stringify(data.json())));
      this.secondary_no = data.json().data["secondary"];
      this.primary_name=data.json().data.primary.name;
      this.primary_number= data.json().data.primary.contactNo;
      this.primary_uid  = data.json().data.primary.uId;
      this.primary_id = data.json().data.primary.id;
      this.primary_img = data.json().data.primary.img;

    });
  }

  callNumber_ph(ph_number:any,name:any){

    console.log("ph_Number",ph_number);
    this.callNumber.callNumber(ph_number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    this.sendemergencyCallLog(ph_number,name);

  }

  edit_details(emergContactId,number,name,img){
    let myModal = this.modal.create(EditEmergencyCallPage, { emergContactId: emergContactId,contactName:name,contactNo:number,profile_image:img});
      myModal.onDidDismiss(data =>
        {
          this.get_emergencyContact(this.uId);

        });
      myModal.present();
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

  checkLoc(){

    if(this.platform.is('ios')){
      this.platform.ready().then((readySource) => {

        this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
        console.log('Is available? ' + isAvailable);
        // alert('Is available? ' + isAvailable);
        if(isAvailable)
        {

          this.get_from_position();
        }
        else
        {
          this.checkPassPermission();
        }
        }).catch( (e) => {
        console.log(e);
        //alert(JSON.stringify(e));
        });
        });

    }
    if(this.platform.is('android')){
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        result => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]).then(
          result2 => this.checkPassPermission(),
        ),


        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      );
    }


  }


  checkPassPermission()
  {

    console.log('enable location');

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest)
      {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        .then(
          ()=> this.get_from_position(),
          (err)=>{
            console.log(err)
            let toast = this.toastCtrl.create({
              message: 'Something went wrong. Please try again',
              duration: 3000,
              position: 'top'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            toast.present();
          }
        )
      }

    });
  }

  get_from_position()
  {
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
      }

      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();

      this.geolocation.getCurrentPosition({timeout:15000}).then((resp) => {
        console.log("LATLONG",resp);
        this.lat=resp.coords.latitude;
        this.long=resp.coords.longitude;

        this.get_from_address(this.lat,this.long);
       }).catch((error) => {
         console.log('Error getting location', error);
         this.loading.dismiss();
         this.openNativeSettings.open('location');

       });
  }

  get_from_address(lat,long)
  {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
  this.nativeGeocoder.reverseGeocode(lat,long, options)
    .then((result: NativeGeocoderReverseResult[]) =>{
      this.address = JSON.parse(JSON.stringify(result[0]));
      console.log("Address",this.address);

      this.fulladdress = this.address.thoroughfare+","+this.address.locality+","+this.address.subLocality+","+this.address.subAdministrativeArea+","+this.address.administrativeArea+","+this.address.postalCode+","+this.address.countryName;
      console.log("Address :---",this.fulladdress);
      console.log("JSON.stringify(result[1])",JSON.parse(JSON.stringify(result[1])));
      console.log("JSON.stringify(result[2])",JSON.parse(JSON.stringify(result[2])));
      console.log("JSON.stringify(result[3])",JSON.parse(JSON.stringify(result[3])));
      console.log("JSON.stringify(result[4])",JSON.parse(JSON.stringify(result[4])));
    })
    .catch((error: any) => {

    });
    this.loading.dismiss();
  }

  sendemergencyCallLog(ph_number,name){


          this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
          });
          this.loading.present();
          var url =this.constant.emergencyCallLog;
          let postData = new FormData();
          postData.append('uId',this.uId);
          postData.append('mobile',ph_number);
          postData.append('lat',this.lat);
          postData.append('long',this.long);
          postData.append('name',name);
          postData.append('address',this.fulladdress);

          console.log("DATA",postData);

          this.data = this.http.post(url,postData);
          this.data.subscribe(data =>{
            this.loading.dismiss();

            console.log("Response",(JSON.stringify(data.json())));


          });




  }

}
