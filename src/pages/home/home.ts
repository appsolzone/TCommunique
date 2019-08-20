import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { InternationalPage } from '../../pages/international/international';
import { DomesticPage } from '../../pages/domestic/domestic';




@IonicPage({
	name: 'page-home',
	segment: 'page-home',
	priority: 'high'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  internationalRoot = InternationalPage;
  domesticRoot = DomesticPage
  constructor(public navCtrl: NavController) {

  }

}
