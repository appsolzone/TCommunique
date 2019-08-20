import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignInPage } from '../../pages/sign-in/sign-in';

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
  user_email:any;

  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public _fb:FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPwdPage');
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onForgotForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])]
    });

  }

  forgot(){
    let alert = this.alertCtrl.create({
      title: 'Forgot Password!',
      subTitle: 'Progress is in Process.',
      buttons: ['OK']
    });
    alert.present();

  }
  backtosign(){
    this.navCtrl.push(SignInPage);
  }

}
