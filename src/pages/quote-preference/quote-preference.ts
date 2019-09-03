import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
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
  loading:Loading;
  data:Observable<any>;
  public searchit: FormGroup;
  emergency_number:any;
  inp1:any;
  inp2:any;
  date1:any;
  email:any;
  days:any;

  std=["+93","+90","+91","+1","+92","+95"]
  peopleList=["1","2","3","4","5"];
  ss:any;

  constructor(private callNumber: CallNumber,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public fb:FormBuilder) {
    this.get_viewAgentContact();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotePreferencePage');
  }

  selectEmployee(data)
  {
    console.log(data);
  }

  callNumber_ph(){
    this.callNumber.callNumber(this.emergency_number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
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

    get_viewAgentContact(){
      this.loading = this.loadingCtrl.create({
        content:"Please wait... ",
        dismissOnPageChange:true
      });
      var url2 = this.constant.get_viewAgentContact;
      this.data = this.http.get(url2);
      this.data.subscribe(data=>{
        console.log("Emergency",data.json().data);
        this.emergency_number = data.json().data;
      })
    }

}
