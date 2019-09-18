import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController ,LoadingController,Loading,ToastController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignInPage } from '../../pages/sign-in/sign-in';

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-update-password',
  segment:'page-update-password'
})
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {
  public onForgotForm: FormGroup;
  user_email_or_phone:any;
  user_password:any;
  user_con_password:any;
  user_otp:any;

  loading:Loading;
  data:Observable<any>;

  constructor(public alertCtrl:AlertController,private toast:ToastController,public navCtrl: NavController, public navParams: NavParams,public _fb:FormBuilder,private constant: ConstantProvider,public http:Http,public loadingCtrl:LoadingController)
  {

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ForgotPwdPage');

    this.user_email_or_phone=this.navParams.get('mobileOrEmail');

    console.log(this.user_email_or_phone);

  }

  ngOnInit()
  {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onForgotForm = this._fb.group({
      email: ['', Validators.required],
      otp: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required
      ])],
      confirmPass: ['', Validators.compose([
        Validators.required
      ])]
    },
    {validator: this.checkIfMatchingPasswords('password', 'confirmPass')});

  }


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string)
  {
    return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey],
            passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({notEquivalent: true})
        }
        else {
            return passwordConfirmationInput.setErrors(null);
        }
    }
}

backtosign()
{
  this.navCtrl.push(SignInPage);
}

updatePassword()
{
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
  });
  this.loading.present();

  var url =this.constant.updatePassword;
  let postData = new FormData();

  postData.append("username",this.user_email_or_phone);
  postData.append("code",this.user_otp);
  postData.append("password",this.user_password);

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
    this.navCtrl.push(SignInPage);
  });
}
}
