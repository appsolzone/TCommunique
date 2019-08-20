import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../../pages/category/category';

/**
 * Generated class for the InternationalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-international',
  segment: 'page-international',
})
@Component({
  selector: 'page-international',
  templateUrl: 'international.html',
})
export class InternationalPage {

  public listArray=[{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'},{name:'ASU',id:'#103',bgColor:'#8C1D40',fontColor:'#FFC627'},{name:'WVU',id:'#104',bgColor:'#EAAA00',fontColor:'#002855'},{name:'UNC',id:'#105',bgColor:'#7BAFD4',fontColor:'#ffffff'},{name:'MIAMI',id:'#100',bgColor:'#005030',fontColor:'#D67321'},{name:'BAMA',id:'#102',bgColor:'#9E1B32',fontColor:'#828A8F'}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InternationalPage');
  }

  go(){
    this.navCtrl.setRoot(CategoryPage);


  }

}
