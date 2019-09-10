import { Component } from '@angular/core';
import { IonicPage,ToastController,ModalController,Nav,NavController, NavParams,MenuController,Loading,LoadingController,AlertController,Platform} from 'ionic-angular';
import { CategoryPage } from '../../pages/category/category';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ForgotPwdPage } from '../../pages/forgot-pwd/forgot-pwd';
import { Network } from '@ionic-native/network';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OtpVarificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-otp-varification',
  segment:'page-otp-varification'
})
@Component({
  selector: 'page-otp-varification',
  templateUrl: 'otp-varification.html',
})
export class OtpVarificationPage {
  loading:Loading;
  data:Observable<any>;
  user_email:any;
  otp: any;
  otp1:any;
  otp2:any;
  otp3:any;
  otp4:any;
  otp5:any;
  otp6:any;



  constructor(public navParams: NavParams,private storage: Storage,public menu:MenuController,private network: Network,public toastCtrl: ToastController,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,private _fb: FormBuilder,public alertCtrl:AlertController) {
    this.user_email=navParams.get('user_email');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpVarificationPage');
  }

  moveFocus(event, nextElement, previousElement) {

    console.log("event",event);
    if (event.keyCode == 8 && previousElement) {
      console.log("Element",event.key)
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        console.log("Element",event.key)
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
      
    }

  }

  save(){
    this.otp = this.otp1+this.otp2+this.otp3+this.otp4+this.otp5+this.otp6;
    console.log("data",this.otp);

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.otp;
    let postData = new FormData();
    postData.append('username',this.user_email);
    postData.append('otp',this.otp);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("section_group",(JSON.stringify(data.json().status)));
      if(data.json().status=="200"){
            this.navCtrl.setRoot(SignInPage);
      }else{

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

      }

    });
  }

  signin(){
    this.navCtrl.setRoot(SignInPage);
  }

  resendotp(){
    

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.resendOtp;
    let postData = new FormData();
    postData.append('username',this.user_email);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("section_group",(JSON.stringify(data.json().status)));
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

    });
  }

}
