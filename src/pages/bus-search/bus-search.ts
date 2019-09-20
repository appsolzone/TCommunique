import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams,LoadingController,Loading} from 'ionic-angular';
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
  loading:Loading;
  data:Observable<any>;
  public searchit: FormGroup;
  date1:any;
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
  bus_returnflights:any;
  bus_onwardflights:any;


  constructor(public toastCtrl:ToastController,public storage:Storage,private callNumber: CallNumber,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public fb:FormBuilder) {
    this.searchControl = new FormControl();
    this.searchControlnew = new FormControl();
    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
    });
  }


  ionViewDidLoad() {
    this.setFilteredItems("");
    this.setFilteredItems2("");

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

        this.searching = false;
        this.searching1 = false;

        this.setFilteredItems(search);

    });

    this.searchControlnew.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;
      this.searching1 = false;

      this.setFilteredItems2(search);

  });


}

    onSearchInput(){
        this.searching = true;
        this.showlist = true;

        this.searching1 = false;
        this.showlist2 = false;
    }
    onSearchInput2(){
      this.searching1 = true;
      this.showlist2 = true;

      this.searching = false;
      this.showlist = false;
    }

  ngOnInit() {
    this.setFilteredItems("");
    this.setFilteredItems2("");

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
      this.searchControlnew.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems2(search);
      });
    // let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.searchit = this.fb.group({

        tinp: ['', Validators.compose([
          Validators.required])]
          // foinp: ['', Validators.compose([
          //   Validators.required])],
          //   fifinp: ['', Validators.compose([
          //     Validators.required])],
          //     siinp: ['', Validators.compose([
          //       Validators.required])]


  });
}

setFilteredItems(searchTerm) {
  console.log("searchTerm",searchTerm)
  if(searchTerm.length >=3){
    this.items = this.constant.filterItems(searchTerm)
     console.log("this.all",this.items);
  }else{
    this.showlist = false;
    this.showlist2 = false;
  }

}

setFilteredItems2(searchTerm) {
  console.log("searchTerm",searchTerm)
  if(searchTerm.length >=3){
    this.items2 = this.constant.filterItems2(searchTerm)
     console.log("this.all",this.items);
  }else{
    this.showlist = false;
    this.showlist2 = false;
  }

}

selectdeparture(data){
  this.showlist = false;
  this.showlist2 = false;
  console.log("DATA",data);
  this.departure = data.NAME;

}

selectdestination(data){
  this.showlist = false;
  this.showlist2 = false;
  console.log("DATA",data);
  this.destination = data.NAME;

}

SaveRequest(){
  console.log("ALL DATA",this.destination,this,this.departure,this,this.date1)
  let d2=this.date1.replace(/[^a-zA-Z0-9]/g, '');
  console.log(d2);
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
     var url= "https://developer.goibibo.com/api/bus/search/?app_id="
     +this.constant.goibibi_app_id+"&app_key="+this.constant.goibibo_app_key+
     "&format=json&source="+this.departure+"&destination="+this.destination+"&dateofdeparture="+d2+"";

      this.data = this.http.get(url);
      this.data.subscribe(data =>{
        this.loading.dismiss();

        console.log("DATA",data.json());

        this.bus_onwardflights = data.json().data.onwardflights;

      });


  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }





}
