import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams,LoadingController,Loading,ModalController,AlertController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { HomePage } from '../../pages/home/home';




/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-contact-us',
  segment: 'page-contact-us',
})
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  loading:Loading;
  data:Observable<any>;
  public onContactForm: FormGroup;
  user_email:any;
  user_name:any;
  user_phone:any;
  user_message:any;
  uId:any;
  emergency_number:any;


  constructor(public toastCtrl:ToastController,public callNumber:CallNumber,private storage: Storage, public alertCtrl: AlertController, private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public _fb:FormBuilder) {
    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
    });

    this.get_viewAgentContact();

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');


  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    let regExp = /^[0-9]{10}$/;
    this.onContactForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])],
      name: ['', Validators.compose([
        Validators.required])],
      phone: ['', Validators.compose([
        Validators.required,Validators.pattern(regExp)])],
      message: ['', Validators.compose([
        Validators.required])]
    });
  }

  submit(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    // this.loading.present();
    var url =this.constant.contactUs;
    let postData = new FormData();
    console.log("uId",this.uId);
    postData.append('uId',this.uId);
    postData.append('name',this.user_name);
    postData.append('email',this.user_email);
    postData.append('phone',this.user_phone);
    postData.append('msg',this.user_message);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      console.log("get_emergencyContact",(JSON.stringify(data.json())));

      let t = this.toastCtrl.create({
        message: data.json().msg,
        position: 'bottom'
      });
      let closedByTimeout = false;
      let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 7000);
      t.onDidDismiss(() => {
        if (closedByTimeout) return;
        clearTimeout(timeoutHandle);
      });
      t.present();


    });


  }




  callnow(){

    console.log("emergency_number",this.emergency_number);
    this.callNumber.callNumber(this.emergency_number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));

  }

  get_viewAgentContact(){
    this.loading = this.loadingCtrl.create({
      content:"Please wait... ",
      dismissOnPageChange:true
    });
    var url2 = this.constant.get_viewAgentContact;
    this.data = this.http.get(url2);
    this.data.subscribe(data=>{
      console.log("Emergency",data.json().data);
      this.emergency_number = data.json().data.contact1;
    })
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

}
