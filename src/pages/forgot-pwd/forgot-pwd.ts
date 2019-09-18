import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,LoadingController,Loading,ToastController} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { UpdatePasswordPage } from '../../pages/update-password/update-password';

/**
 * Generated class for the ForgotPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-forgot-pwd',
  segment: 'page-forgot-pwd',
})
@Component({
  selector: 'page-forgot-pwd',
  templateUrl: 'forgot-pwd.html',
})
export class ForgotPwdPage {
  public onForgotForm: FormGroup;
  user_email_or_phone:any;

  loading:Loading;
  data:Observable<any>;

  constructor(public alertCtrl:AlertController,private toast:ToastController,public navCtrl: NavController, public navParams: NavParams,public _fb:FormBuilder,private constant: ConstantProvider,public http:Http,public loadingCtrl:LoadingController)
  {

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ForgotPwdPage');
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onForgotForm = this._fb.group({
      // email: ['', Validators.compose([
      //   Validators.required,Validators.pattern(EMAILPATTERN)
      // ])]
      email: ['', Validators.required]
    });

  }

  backtosign()
  {
    this.navCtrl.push(SignInPage);
  }

  sendOtp()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();

    var url =this.constant.Forgotpassword;
    let postData = new FormData();

    postData.append("username",this.user_email_or_phone);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      this.loading.dismiss();
      console.log(data.json());
      let toast = this.toast.create({
        message: data.json().msg,
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
      this.navCtrl.push(UpdatePasswordPage,{mobileOrEmail:this.user_email_or_phone});

    });
  }
}
