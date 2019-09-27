import { Component,OnInit } from '@angular/core';
import { IonicPage,ToastController,ModalController,Nav,NavController, NavParams,MenuController,Loading,LoadingController,AlertController,Platform} from 'ionic-angular';
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
import { SignInPage } from '../../pages/sign-in/sign-in';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { OtpVarificationPage } from '../../pages/otp-varification/otp-varification';
import { UserProvider } from '../../providers/user/user';
import {VideoProvider} from '../../providers/video/video';



/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-sign-up',
  segment: 'page-sign-up',
})
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  public onRegForm: FormGroup;
  user_email:any;
  user_password:any;
  user_con_password:any;
  googleData:any;
  loading:Loading;
  data:Observable<any>;


  constructor(public videoProvider:VideoProvider,public userprovider:UserProvider,private storage: Storage,private googlePlus: GooglePlus,public menu:MenuController,private network: Network,public toastCtrl: ToastController,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,private _fb: FormBuilder,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onRegForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      confirmPass: ['', Validators.compose([
        Validators.required
      ])]
    },
    {validator: this.checkIfMatchingPasswords('password', 'confirmPass')});

  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
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


  register(){
    console.log("Hello");
    console.log("Hello",this.user_email,this.user_password);


      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
      var url =this.constant.signup;
      let postData = new FormData();
      postData.append('username',this.user_email);
      postData.append('password',this.user_password);
      postData.append('channel','app');

      this.data = this.http.post(url,postData);
      this.data.subscribe(data =>{
        this.loading.dismiss();

        console.log("section_group",(JSON.stringify(data.json())));
        if(data.json().status=="200"){
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

               this.navCtrl.setRoot(OtpVarificationPage,{user_email:this.user_email});

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

  googleLogin() {

    this.googlePlus.login({
      'scopes': 'profile email',
      'webClientId': '416461815684-g9fgbom3gvojj3m53gleonjh8n6v6ddg.apps.googleusercontent.com',
      'offline': true
    }).then((user) => {

      console.log("USER",user);
      console.log("USER",JSON.stringify(user));
      console.log("USER",user.userId);
      console.log("USER",user.email);

          var id = user.userId;
          var token = user.idToken;
          var provider = "google";
          var mobile = "";
          var publicUrl = "";
          var email = user.email;
          var first_name = user.givenName;
          var name = user.displayName;
          var image = user.imageUrl;

          this.googleData = { id,token,email,first_name,image,name,mobile,provider,publicUrl}

          console.log("DATA",this.googleData);

          this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
          });
          this.loading.present();
          var url =this.constant.signup;
          let postData = new FormData();
          postData.append('username',email);
          postData.append('password',"");
          postData.append('channel',provider);

          this.data = this.http.post(url,postData);
          this.data.subscribe(data =>{

            this.loading.dismiss();
            console.log("SignIn_Page",(JSON.stringify(data.json().username)));
            if(data.json().status=="200"){
                  this.storage.set('user_login_data',data.json());
                  this.userprovider.put_user_img(data.json().profileData.profImg);
                  this.userprovider.put_user_name(data.json().username);


                  const userData= {
                    uniqueId:data.json().videoId,
                    name:data.json().username

                  }

                  console.log("userData",userData);

                  this.videoProvider.InitializingRTC(userData);
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


    }, (error) => {
      console.log("ERROR",error);
    });
  }

  signin(){
    this.navCtrl.setRoot(SignInPage);
  }

}
