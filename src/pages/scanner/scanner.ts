import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-scanner',
  segment: 'page-scanner',
})
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {
  firstname: any;
  lastname: any;
  dob: any;
  sex: any;
  passportno: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannerPage');
  }

  scan()
  {
    this.barcodeScanner.scan().then(barcodeData =>
      {
      console.log('Data', barcodeData);
      if(barcodeData.cancelled)
      {

      }
      else
      {
        this.parse_info(barcodeData.text);
        console.log(this.parse_info);
      }
      }).catch(err =>
        {
         console.log('Error', err);
        });

      }
      parse_info(y)

      {
        var eachLine = y.split('\n');
        this.firstname= eachLine[0];
        this.lastname= eachLine[1];
        this.dob= eachLine[2];
        this.sex= eachLine[3];
        this.passportno= eachLine[4];
      }


}
