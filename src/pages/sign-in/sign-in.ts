import { Component,OnInit } from '@angular/core';
import { IonicPage,ToastController,ModalController,Nav,NavController, NavParams,MenuController,Loading,LoadingController,AlertController,Platform} from 'ionic-angular';
import { CategoryPage } from '../../pages/category/category';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { ForgotPwdPage } from '../../pages/forgot-pwd/forgot-pwd';
import { Network } from '@ionic-native/network';
import { SignUpPage } from '../../pages/sign-up/sign-up';




/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-sign-in',
  segment: 'page-sign-in',
})
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage implements OnInit{
  public onLoginForm: FormGroup;
  user_email:any;
  user_password:any;
  loading:Loading;
  data:Observable<any>;




  constructor(public menu:MenuController,private network: Network,public toastCtrl: ToastController,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,private _fb: FormBuilder,public alertCtrl:AlertController) {
    let status=this.network.type;

    if(status=='none')
    {
    let t = this.toastCtrl.create({
      message: 'Please enable your internet connection to continue.',
      showCloseButton: true,
      closeButtonText: 'Retry',
      position: 'bottom',

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
      this.menu.swipeEnable(false);
      this.menu.enable(false);
    }




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }


  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onLoginForm = this._fb.group({
      // email: ['', Validators.compose([
      //   Validators.required,Validators.pattern(EMAILPATTERN)
      // ])],
      email: ['', Validators.compose([
        Validators.required])],
      password: ['', Validators.compose([
        Validators.required])]
    });
  }

  login()
  {
    console.log("Hello");
    console.log("Hello",this.user_email,this.user_password);


      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      // this.loading.present();
      var url =this.constant.login;
      let postData = new FormData();
      postData.append('username',this.user_email);
      postData.append('password',this.user_password);
      postData.append('channel','app');

      this.data = this.http.post(url,postData);
      this.data.subscribe(data =>{

        console.log("section_group",(JSON.stringify(data.json().status)));
        if(data.json().status=="200"){
              this.navCtrl.setRoot(HomePage);
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
  forgotpwd(){
    this.navCtrl.push(ForgotPwdPage);

  }
  signup(){
    this.navCtrl.push(SignUpPage);
  }



}
