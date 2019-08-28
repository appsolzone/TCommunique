import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/**
 * Generated class for the FlightSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-flight-search',
  segment: 'page-flight-search',
})
@Component({
  selector: 'page-flight-search',
  templateUrl: 'flight-search.html',
})
export class FlightSearchPage {

  public searchit: FormGroup;



  inp1:any;
  inp2:any;
  date1:any;
  adult:any;
  child:any;
  infant:any;
  economy:any;
  payment:any;
  peopleList=["1","2","3","4","5"];
  paymentList=["Google pay", "Phone pay", "Paytm"];

  constructor(public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder) {
  }

  ngOnInit() {
    // let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.searchit = this.fb.group({
      finp: ['', Validators.compose([
        Validators.required])],

      sinp: ['', Validators.compose([
        Validators.required])],

        tinp: ['', Validators.compose([
          Validators.required])],
          foinp: ['', Validators.compose([
            Validators.required])],
            fifinp: ['', Validators.compose([
              Validators.required])],
              siinp: ['', Validators.compose([
                Validators.required])],
                eco: ['', Validators.compose([
                  Validators.required])],
                  pay: ['', Validators.compose([
                    Validators.required])]


  });
}
  inp(){
    console.log("first inp",this.inp1);
    console.log("input 2",this.inp2);
    console.log("date",this.date1);
    console.log("adult",this.adult);
    console.log("child",this.child);
    console.log("infant",this.infant);
    console.log("economy",this.economy);
    console.log("payment",this.payment);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightSearchPage');
  }

}
