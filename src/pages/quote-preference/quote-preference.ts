import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the QuotePreferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-quote-preference',
  segment:'page-quote-preference'
})
@Component({
  selector: 'page-quote-preference',
  templateUrl: 'quote-preference.html',
})
export class QuotePreferencePage {
  public searchit: FormGroup;
  inp1:any;
  inp2:any;
  date1:any;
  email:any;
  days:any;

  std=["+93","+90","+91","+1","+92","+95"]
  peopleList=["1","2","3","4","5"];
  ss:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotePreferencePage');
  }

  selectEmployee(data)
  {
    console.log(data);
  }


  ngOnInit() {
    // let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.searchit = this.fb.group({
      finp: ['', Validators.compose([
        Validators.required])],

      sinp: ['', Validators.compose([
        Validators.required])],

        date: ['', Validators.compose([
          Validators.required])],
             email: ['', Validators.compose([
                  Validators.required])],
                  mob: ['', Validators.compose([
                    Validators.required])],
                    days: ['', Validators.compose([
                      Validators.required])]


      });
    }
    inp(){
      console.log("first inp",this.inp1);
      console.log("input 2",this.inp2);
      console.log("date",this.date1);
      console.log("payment",this.email);
    }

}
