import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController,ToastController, NavParams,LoadingController,Loading} from 'ionic-angular';
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
import {FlightSearchListPage} from '../../pages/flight-search-list/flight-search-list';



/**
 * Generated class for the FlightSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-flight-search',
  segment: 'page-flight-search',
})
@Component({
  selector: 'page-flight-search',
  templateUrl: 'flight-search.html',
})
export class FlightSearchPage {
  loading:Loading;
  data:Observable<any>;
  public searchit: FormGroup;
  date1:any;
  date2:any;
  public searchTerm: string = "";
  public searchControl: FormControl;
  public searchControlnew : FormControl;
  searching: any = false;
  searching1: any = false;
  public flight_items: any;
  public flight_items2: any;
  departure:any;
  showlist:any=false;
  destination:any;
  showlist2 = false;

  uId:any;
  flight_returnflights:any;
  flight_onwardflights:any;

  adult:any;
  child:any;
  infant:any;
  economy:any;
  payment:any;
  peopleList=["1","2","3","4","5"];
  peopleList2=["0","1","2","3"];
  icons:any;
  flightType = [{"key":"Economy","value":"E"},{"key":"Business","value":"B"}]

  constructor(public modal:ModalController,public toastCtrl:ToastController,public storage:Storage,private callNumber: CallNumber,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public fb:FormBuilder) {
    this.icons = "Onward_Flights";

    this.searchControl = new FormControl();
    this.searchControlnew = new FormControl();
    this.adult = this.peopleList[0];
    this.child = this.peopleList[0];
    this.infant = this.peopleList[0];
    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
    });
  }

  ngOnInit() {
    // this.setFilteredItems22("");
    // this.setFilteredItems44("");

    // this.searchControl.valueChanges
    //   .pipe(debounceTime(700))
    //   .subscribe(search => {


    //     this.setFilteredItems22(search);
    //   });
    //   this.searchControlnew.valueChanges
    //   .pipe(debounceTime(700))
    //   .subscribe(search => {
    //     console.log("ngOnInit search",search);
    //     this.setFilteredItems44(search);
    //   });

    this.searchit = this.fb.group({
        tinp: ['', Validators.compose([
          Validators.required])],
          ainp: ['', Validators.compose([
            Validators.required])],
          foinp: ['', Validators.compose([
            Validators.required])],
            fifinp: ['', Validators.compose([
              Validators.required])],
              siinp: ['', Validators.compose([
                Validators.required])],
                eco: ['', Validators.compose([
                  Validators.required])]


  });
}
SaveRequest(){
      let d2=this.date1.replace(/[^a-zA-Z0-9]/g, '');
      console.log(d2);
      let d3 =this.date2.replace(/[^a-zA-Z0-9]/g, '');

  console.log("DJDLD",this.departure,this.destination,d2,this.child,this.adult,this.infant,this.economy.value)
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
  });
  this.loading.present();

  var url= "https://developer.goibibo.com/api/search/?app_id="
  +this.constant.goibibi_app_id+"&app_key="+this.constant.goibibo_app_key+"&format=json&source="
  +this.departure+"&destination="+this.destination+"&dateofdeparture="+d2+"&dateofarrival="+d3+"&seatingclass="
  +this.economy.value+"&adults="+this.adult+"&children="+this.child+"&infants="+this.infant+"&counter=100";

  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    this.loading.dismiss();
    console.log("DATA",data.json().data);
    console.log("DATA_onwardflights",data.json().data.onwardflights);
    console.log("DATA_oreturnflights",data.json().data.returnflights);

    this.flight_onwardflights = data.json().data.onwardflights;
    this.flight_returnflights = data.json().data.returnflights;

  });
  }


  ionViewDidLoad() {
  //   this.setFilteredItems22("");
  //   this.setFilteredItems44("");

  //   this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

  //       this.searching = false;
  //       this.searching1 = false;

  //       this.setFilteredItems22(search);

  //   });

  //   this.searchControlnew.valueChanges.debounceTime(700).subscribe(search => {

  //     this.searching = false;
  //     this.searching1 = false;
  //     console.log("ionViewDidLoad search",search);
  //       this.setFilteredItems44(search);

  // });

  }

    // onSearchInput(){
    //   this.searching = true;
    //   this.showlist = true;

    //   this.searching1 = false;
    //   this.showlist2 = false;
    //   }
    // onSearchInput2(){
    //   this.searching1 = true;
    //   this.showlist2 = true;

    //   this.searching = false;
    //   this.showlist = false;
    // }

    // setFilteredItems22(searchTerm) {
    //   console.log("World searchTerm",searchTerm)
    //   if(searchTerm.length >=3){
    //     this.flight_items = this.constant.flight_filterItems(searchTerm)
    //      console.log("this.all",this.flight_items);
    //   }else{
    //     this.showlist = false;
    //     this.showlist2 = false;
    //   }

    // }

    // setFilteredItems44(searchTerm) {
    //   console.log("Hello searchTerm",searchTerm)

    //     if(searchTerm.length >=3){
    //       this.flight_items2 = this.constant.flight_filterItems2(searchTerm)
    //        console.log("this.all",this.flight_items2);
    //     }else{
    //       this.showlist = false;
    //       this.showlist2 = false;
    //     }



    // }

    // selectdeparture(data){
    //   this.showlist = false;
    //   this.showlist2 = false;
    //   console.log("DATA",data);
    //   this.departure = data.Code;
    //   this.setFilteredItems22("");

    // }

    // selectdestination(data){
    //   this.destination = data.Code;
    //   console.log("selectdestination_DATA",data);
    //   this.showlist = false;
    //   this.showlist2 = false;
    //   this.setFilteredItems44("");



    // }

    home(){
      this.navCtrl.setRoot(HomePage);
    }

    onClickFuntion(){

      console.log("Hello");

        let myModal = this.modal.create(FlightSearchListPage);
        myModal.onDidDismiss(data =>
          {
            console.log("TADA",data);
            this.departure = data;
          });
        myModal.present();


    }

    onClickFuntion2(){
      let myModal = this.modal.create(FlightSearchListPage);
      myModal.onDidDismiss(data =>
        {
          console.log("TADA",data);
          this.destination = data;
        });
      myModal.present();

    }


}
