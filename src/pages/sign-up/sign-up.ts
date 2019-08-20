import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { GooglePlus } from '@ionic-native/google-plus';


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
  googleData:any;


  constructor(private googlePlus: GooglePlus,public navCtrl: NavController, public navParams: NavParams, public _fb:FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onRegForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])]
    });

  }

  register(){
    this.navCtrl.push(SignInPage);

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


    }, (error) => {
      console.log("ERROR",error);
    });
  }

}
