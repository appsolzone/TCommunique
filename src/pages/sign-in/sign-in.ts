import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { ForgotPwdPage } from '../../pages/forgot-pwd/forgot-pwd';



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
export class SignInPage {
  public onLoginForm: FormGroup;
  user_email:any;
  user_password:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,private _fb: FormBuilder,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])],
      password: ['', Validators.compose([
        Validators.required])]
    });
  }

  login()
  {
    console.log("Hello");
    console.log("Hello",this.user_email,this.user_password);
    this.navCtrl.setRoot(HomePage);


  }
  forgotpwd(){
    // let alert = this.alertCtrl.create({
    //   title: 'Forgot Password!',
    //   subTitle: 'Progress is in Process.',
    //   buttons: ['OK']
    // });
    // alert.present();
    this.navCtrl.push(ForgotPwdPage);

  }



}
