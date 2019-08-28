import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-filter',
	segment: 'page-filter',
})
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  abc='80,000-1Lac';
  price=["Below 10,000","60,000-80,000","10,000-20,000","90,000-1,00,000","20,000-40,000","1Lac-2Lac","40,000-60,000","Above 2Lac"];
  duration= ["1-3","4-6","7-9","10-12","13-15",">15"];
  activities =["Nature","Beach","Historical"," Religious","Lifestyle"];
  months=["Jan-Mar","Apr-Jun","Jul-Sept","Oct-Dec"];

  checkedIdxofPri;
  checkedIdxofDur;
  checkedIdxofAct;
  checkedIdxofMon;
  getUserDur;
  getUserAct;
  getUserMon;
  getUserPrice:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  get_Price(item)
  {
    this.getUserPrice=item;
  }
  get_Dur(item)
  {
    this.getUserDur=item;
  }
  get_Act(item)
  {
    this.getUserAct=item;
  }
  get_Mon(item)
  {
    this.getUserMon=item;
  }

  refreshPage1()
  {
    this.checkedIdxofPri=-1;
  }
  refreshPage2()
  {
    this.checkedIdxofDur=-1;
  }
  refreshPage3()
  {
    this.checkedIdxofAct=-1;

  }
  refreshPage4()
  {
    this.checkedIdxofMon=-1;

  }

  fetchBotton()
  {
    console.log(this.getUserPrice);
    console.log(this.getUserDur);
    console.log(this.getUserAct);
    console.log(this.getUserMon);

  }

}
