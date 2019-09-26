import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ToastController} from 'ionic-angular';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';


/**
 * Generated class for the CarBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-car-booking',
  segment: 'page-car-booking',
})
@Component({
  selector: 'page-car-booking',
  templateUrl: 'car-booking.html',
})
export class CarBookingPage {
  loading:Loading;
  data:Observable<any>;
  public carbook: FormGroup;
  pickuploc: any;
  droploc: any;
  adult: any;
  pickupdate:any;
  pickuptime: any;
  dropdate:any;
  droptime: any;
  infant: any;
  child: any;
  noofseats: any;


  uId:any;
  ClickablePic:any;
  bgColorHatchback="#776e0e";
  bgColorSedan="#0a5a53";
  bgColorSuv="#0a5a53";
  bgColorLuxury="#0a5a53";




  constructor(public toastCtrl:ToastController,public storage:Storage,public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {

    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
    });
  }



  ngOnInit() {
    // let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.carbook = this.fb.group({
      pickuploc: ['', Validators.compose([
        Validators.required])],
      droploc: ['', Validators.compose([
        Validators.required])],
      pickupdate: ['', Validators.compose([
          Validators.required])],
      pickuptime: ['', Validators.compose([
            Validators.required])],
      dropdate: ['', Validators.compose([
              Validators.required])],
      droptime: ['', Validators.compose([
                Validators.required])],
      adult: ['', Validators.compose([
        Validators.required])],
      infant: ['', Validators.compose([
        Validators.required])],
      child: ['', Validators.compose([
        Validators.required])],
      noofseats: ['', Validators.compose([
        Validators.required])]



  });
}
select(a){
  this.ClickablePic=a;
  console.log(this.ClickablePic);

  if(this.ClickablePic==1)
  {
    this.bgColorHatchback="#776e0e";
    this.bgColorSedan="#0a5a53";
    this.bgColorSuv="#0a5a53";
    this.bgColorLuxury="#0a5a53";
  }
  else  if(this.ClickablePic==2)
  {
    this.bgColorHatchback="#0a5a53";
    this.bgColorSedan="#776e0e";
    this.bgColorSuv="#0a5a53";
    this.bgColorLuxury="#0a5a53";
  }
  else  if(this.ClickablePic==3)
  {
    this.bgColorHatchback="#0a5a53";
    this.bgColorSedan="#0a5a53";
    this.bgColorSuv="#776e0e";
    this.bgColorLuxury="#0a5a53";
  }
  else
  {
    this.bgColorHatchback="#0a5a53";
    this.bgColorSedan="#0a5a53";
    this.bgColorSuv="#0a5a53";
    this.bgColorLuxury="#776e0e";
  }

}

check()
{
  console.log(this.pickuploc);
  console.log(this.droploc);
  console.log(this.adult);
  console.log(this.infant);
  console.log(this.child);
  console.log(this.noofseats);
  console.log(this.pickuptime);
  console.log(this.dropdate);
  console.log(this.droptime);
  console.log( "Selected Date" ,this.pickupdate );
  console.log("this.ClickablePic",this.ClickablePic);
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.carBooking;
    let postData = new FormData();
    postData.append('uId',this.uId);
    postData.append('pickUpLoc',this.pickuploc);
    postData.append('dropLoc',this.droploc);
    postData.append('pickUpDate',this.pickupdate);
    postData.append('pickUpTime',this.pickuptime);
    postData.append('dropDate',this.dropdate);
    postData.append('dropTime',this.droptime);
    postData.append('adult',this.adult);
    postData.append('child',this.child);
    postData.append('infant',this.infant);
    postData.append('seat',this.noofseats);
    postData.append('carType',this.ClickablePic);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      this.loading.dismiss();
      console.log("DATA_#",(JSON.stringify(data.json())));
      let t = this.toastCtrl.create({
        message: data.json().msg,
        position: 'bottom'
      });
      let closedByTimeout = false;
      let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 7000);
      t.onDidDismiss(() => {
        if (closedByTimeout) return;
        clearTimeout(timeoutHandle);
      });
      t.present();
      this.navCtrl.setRoot(HomePage);


    });


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarbookingPage');
    this.ClickablePic=1;



  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

}
