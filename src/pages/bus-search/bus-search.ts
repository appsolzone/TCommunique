import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Img } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the BusSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-bus-search',
  segment: 'page-bus-search',
})
@Component({
  selector: 'page-bus-search',
  templateUrl: 'bus-search.html',
})
export class BusSearchPage {
  public searchit: FormGroup;



  inp1:any;
  inp2:any;
  date1:any;
  adult:any;
  child:any;
  infant:any;
  peopleList=["1","2","3","4","5"];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb:FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusSearchPage');
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




  }




}
