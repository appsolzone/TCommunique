import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'page-contact-us',
  segment: 'page-contact-us',
})
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  public onContactForm: FormGroup;
  user_email:any;
  user_name:any;
  user_phone:any;
  user_message:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public _fb:FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    let regExp = /^[0-9]{10}$/;
    this.onContactForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])],
      name: ['', Validators.compose([
        Validators.required])],
      phone: ['', Validators.compose([
        Validators.required,Validators.pattern(regExp)])],
      message: ['', Validators.compose([
        Validators.required])]
    });
  }

  submit(){

  }
  callnow(){

  }

}
