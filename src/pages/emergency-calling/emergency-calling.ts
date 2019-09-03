import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ModalController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { CallNumber } from '@ionic-native/call-number';
import { EditEmergencyCallPage } from '../../pages/edit-emergency-call/edit-emergency-call';

/**
 * Generated class for the EmergencyCallingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-emergency-calling',
  segment:'page-emergency-calling'
})
@Component({
  selector: 'page-emergency-calling',
  templateUrl: 'emergency-calling.html',
})
export class EmergencyCallingPage {
  loading:Loading;
  data:Observable<any>;
  secondary_no:any;
  primary_name:any;
  primary_number:any;
  primary_uid:any;

  constructor(private modal: ModalController,private callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {
    this.get_emergencyContact();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyCallingPage');
  }

  get_emergencyContact(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.get_emergencyContact;
    let postData = new FormData();
    postData.append('uId',"1");

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("get_emergencyContact",(JSON.stringify(data.json())));
      this.secondary_no = data.json().data["secondary"];
      this.primary_name=data.json().data.primary.name;
      this.primary_number= data.json().data.primary.contactNo;
      this.primary_uid  = data.json().data.primary.uId;


    });
  }

  callNumber_ph(ph_number:any){
    console.log("ph_Number",ph_number);
    this.callNumber.callNumber(ph_number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  edit_details(){
    let myModal = this.modal.create(EditEmergencyCallPage, { userId: 8675309 });
      myModal.onDidDismiss(data =>
        {

        });
      myModal.present();
  }

}
