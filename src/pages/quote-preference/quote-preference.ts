import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams,LoadingController,Loading,ModalController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
import "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import {QuotePreferenceSearchPage} from '../../pages/quote-preference-search/quote-preference-search';




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
export class QuotePreferencePage implements OnInit {
  loading:Loading;
  data:Observable<any>;
  public searchit: FormGroup;
  emergency_number:any;
  phoneno:any;
  date1:any;
  email:any;
  days:any;
  public searchTerm: string = "";
  public searchControl: FormControl;
  public searchControlnew : FormControl;
  searching: any = false;
  searching1: any = false;
  public items: any;
  public items2: any;
  departure:any;
  showlist:any=false;
  destination:any;
  showlist2 = false;

  uId:any;




  std=["+93","+90","+91","+1","+92","+95"]
  peopleList=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
  ss:any;

  constructor(public modal:ModalController,public toastCtrl:ToastController,public storage:Storage,private callNumber: CallNumber,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public fb:FormBuilder) {
    this.searchControl = new FormControl();
    this.searchControlnew = new FormControl();
    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
    });
    this.get_viewAgentContact();

  }

  ionViewDidLoad() {
  //   this.setFilteredItems("");
  //   this.setFilteredItems2("");

  //   this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

  //       this.searching = false;
  //       this.searching1 = false;

  //       this.setFilteredItems(search);

  //   });

  //   this.searchControlnew.valueChanges.debounceTime(700).subscribe(search => {

  //     this.searching = false;
  //     this.searching1 = false;

  //     this.setFilteredItems2(search);

  // });


}

    // onSearchInput(){
    //     this.searching = true;
    //     this.showlist = true;

    //     this.searching1 = false;
    //     this.showlist2 = false;
    // }

    onSearchInput(){
      let myModal = this.modal.create(QuotePreferenceSearchPage);
      myModal.onDidDismiss(data =>
        {
          console.log("TADA",data);
          this.departure = data.Name;
        });
      myModal.present();

    }
    onSearchInput2(){
      // this.searching1 = true;
      // this.showlist2 = true;

      // this.searching = false;
      // this.showlist = false;

      let myModal = this.modal.create(QuotePreferenceSearchPage);
      myModal.onDidDismiss(data =>
        {
          console.log("TADA",data);
          this.destination = data.Name;
        });
      myModal.present();
    }

    selectEmployee(data)
    {
      console.log(data);
    }

  callNumber_ph(){
    console.log("emergency_number",this.emergency_number);

    this.callNumber.callNumber(this.emergency_number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  ngOnInit() {
    // this.setFilteredItems("");
    // this.setFilteredItems2("");

    // this.searchControl.valueChanges
    //   .pipe(debounceTime(700))
    //   .subscribe(search => {
    //     this.setFilteredItems(search);
    //   });
    //   this.searchControlnew.valueChanges
    //   .pipe(debounceTime(700))
    //   .subscribe(search => {
    //     this.setFilteredItems2(search);
    //   });
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.searchit = this.fb.group({
      // finp: ['', Validators.compose([
      //   Validators.required])],

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


    // setFilteredItems(searchTerm) {
    //   console.log("searchTerm",searchTerm)
    //   if(searchTerm.length >=3){
    //     this.items = this.constant.filterItems(searchTerm)
    //      console.log("this.all",this.items);
    //   }else{
    //     this.showlist = false;
    //     this.showlist2 = false;
    //   }

    // }

    // setFilteredItems2(searchTerm) {
    //   console.log("searchTerm",searchTerm)
    //   if(searchTerm.length >=3){
    //     this.items2 = this.constant.filterItems2(searchTerm)
    //      console.log("this.all",this.items);
    //   }else{
    //     this.showlist = false;
    //     this.showlist2 = false;
    //   }

    // }

    // selectdeparture(data){
    //   this.showlist = false;
    //   this.showlist2 = false;
    //   console.log("DATA",data);
    //   this.departure = data.NAME;

    // }

    // selectdestination(data){
    //   this.showlist = false;
    //   this.showlist2 = false;
    //   console.log("DATA",data);
    //   this.destination = data.NAME;

    // }

    SaveRequest(){
      console.log("ALL DATA",this.destination,this,this.departure,this.email,this,this.date1,this.phoneno)


          this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
          });
          this.loading.present();
          var url =this.constant.planMyHoliday;
          let postData = new FormData();
          postData.append('uId',this.uId);
          postData.append('departure',this.departure);
          postData.append('noOfDays',this.days);
          postData.append('destination',this.destination);
          postData.append('startDate',this.date1);
          postData.append('mobile',this.phoneno);
          postData.append('email',this.email);


          this.data = this.http.post(url,postData);
          this.data.subscribe(data =>{
            this.loading.dismiss();

            console.log("section_group",(JSON.stringify(data.json())));
            if(data.json().status=="200"){
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

                  this.navCtrl.setRoot(HomePage);

            }else{

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

            }

          });


      }



}
