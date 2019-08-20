import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-edit-profile',
  segment: 'page-edit-profile',
})
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public onProfileForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,private _fb: FormBuilder) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    let regExp = /^[0-9]{10}$/;

    this.onProfileForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])],
      address: ['', Validators.compose([
        Validators.required])],

      fname: ['', Validators.compose([
          Validators.required])],

      lanme: ['', Validators.compose([
          Validators.required])],

      dob: ['', Validators.compose([
          Validators.required])],
      phone: ['', Validators.compose([
          Validators.required,Validators.pattern(regExp)])],
    });
  }

  submit(){

  }
}
