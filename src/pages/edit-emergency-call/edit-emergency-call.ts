import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ModalController,ViewController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

/**
 * Generated class for the EditEmergencyCallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-edit-emergency-call',
  segment:'page-edit-emergency-call'
})
@Component({
  selector: 'page-edit-emergency-call',
  templateUrl: 'edit-emergency-call.html',
})
export class EditEmergencyCallPage {
  loading:Loading;
  data:Observable<any>;

  contactNo:any;
  emergContactId:any;
  contactName:any;


  constructor(private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public view:ViewController) {

  this.contactNo=navParams.get('contactNo');
  this.emergContactId=navParams.get('emergContactId');
  this.contactName=navParams.get('contactName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmergencyCallPage');
  }

  submit(){



      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      // this.loading.present();
      var url =this.constant.edit_addEmergContact;
      let postData = new FormData();
      postData.append('contactName',this.contactName);
      postData.append('contactNo',this.contactNo);
      postData.append('emergContactId',this.emergContactId);
      this.data = this.http.post(url,postData);
      this.data.subscribe(data =>{

        console.log("DATA",data.json());
        this.view.dismiss();


      });


  }

}
