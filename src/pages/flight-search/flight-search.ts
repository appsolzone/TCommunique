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
import {BookFlightPage} from '../../pages/book-flight/book-flight';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";


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

  public sections: any = {
    first: 'Onward_Flights',
    second: 'Return_Flights',
    selectedSection: ''
 };
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
  flightType = [{"key":"Economy","value":"E"},{"key":"Business","value":"B"}];

  public onwardOrReturn:any;

  public count=0;

  public onewayData:any;
  public returnData:any;

  departure_Name:any;
  departure_Country:any;
  destination_Name:any;
  destination_Country:any;
  destination_Code:any;
  departure_Code:any;

  constructor(public modal:ModalController,public toastCtrl:ToastController,public storage:Storage,private callNumber: CallNumber,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public fb:FormBuilder) {
    this.icons = "Onward_Flights";
    this.sections.selectedSection = "Onward_Flights";




    this.searchControl = new FormControl();
    this.searchControlnew = new FormControl();
    this.adult = this.peopleList[0];
    this.child = this.peopleList[0];
    this.infant = this.peopleList[0];
    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
    });

    this.onwardOrReturn='onward';
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
SaveRequest()
{
      this.count = 0;
      this.flight_onwardflights = [];
      this.flight_returnflights = [];

      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();

      var url;
      let d2,d3;


      if(this.destination_Country=="India" && this.departure_Country=="India" ){
        console.log("Domestic");
        if(this.onwardOrReturn=="onward")
        {
          console.log("onward Domestic");
          d2=this.date1.replace(/[^a-zA-Z0-9]/g, '');

          url= "https://developer.goibibo.com/api/search/?app_id="
          +this.constant.goibibi_app_id+"&app_key="+this.constant.goibibo_app_key+"&format=json&source="
          +this.departure_Code+"&destination="+this.destination_Code+"&dateofdeparture="+d2+"&seatingclass="
          +this.economy.value+"&adults="+this.adult+"&children="+this.child+"&infants="+this.infant+"&counter=100";
        }
        if(this.onwardOrReturn=="return")
        {
          console.log("return Domestic");

          d2=this.date1.replace(/[^a-zA-Z0-9]/g, '');
          console.log(d2);
          d3 =this.date2.replace(/[^a-zA-Z0-9]/g, '');
          console.log(d3);

          url= "https://developer.goibibo.com/api/search/?app_id="
          +this.constant.goibibi_app_id+"&app_key="+this.constant.goibibo_app_key+"&format=json&source="
          +this.departure_Code+"&destination="+this.destination_Code+"&dateofdeparture="+d2+"&dateofarrival="+d3+"&seatingclass="
          +this.economy.value+"&adults="+this.adult+"&children="+this.child+"&infants="+this.infant+"&counter=100";
        }
        console.log("DJDLD",this.departure,this.destination,d2,d3,this.child,this.adult,this.infant,this.economy.value)

      }else{

        console.log("InterNational")
        if(this.onwardOrReturn=="onward")
      {
        console.log("onward InterNational");

        d2=this.date1.replace(/[^a-zA-Z0-9]/g, '');

        url= "https://developer.goibibo.com/api/search/?app_id="
        +this.constant.goibibi_app_id+"&app_key="+this.constant.goibibo_app_key+"&format=json&source="
        +this.departure_Code+"&destination="+this.destination_Code+"&dateofdeparture="+d2+"&seatingclass="
        +this.economy.value+"&adults="+this.adult+"&children="+this.child+"&infants="+this.infant+"&counter=0";
      }
      if(this.onwardOrReturn=="return")
      {
        console.log("return InterNational");

        d2=this.date1.replace(/[^a-zA-Z0-9]/g, '');
        console.log(d2);
        d3 =this.date2.replace(/[^a-zA-Z0-9]/g, '');
        console.log(d3);


        url= "https://developer.goibibo.com/api/search/?app_id="
        +this.constant.goibibi_app_id+"&app_key="+this.constant.goibibo_app_key+"&format=json&source="
        +this.departure_Code+"&destination="+this.destination_Code+"&dateofdeparture="+d2+"&dateofarrival="+d3+"&seatingclass="
        +this.economy.value+"&adults="+this.adult+"&children="+this.child+"&infants="+this.infant+"&counter=0";
      }
      console.log("DJDLD",this.departure,this.destination,d2,d3,this.child,this.adult,this.infant,this.economy.value)

      }





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


  }



    home(){
      this.navCtrl.setRoot(HomePage);
    }

    onClickFuntion(){

      console.log("Hello");

        let myModal = this.modal.create(FlightSearchListPage);
        myModal.onDidDismiss(data =>
          {
            console.log("TADA-1",data);
            if(data)
            {
              this.departure = data.Name;
              this.departure_Code = data.Code;
              // this.departure_Name = data.Name;
              this.departure_Country = data.Country;
            }
          });
        myModal.present();


    }

    onClickFuntion2(){
      let myModal = this.modal.create(FlightSearchListPage);
      myModal.onDidDismiss(data =>
        {
          console.log("TADA-2",data);
          if(data)
          {

              this.destination = data.Name;
              this.destination_Code = data.Code;
              // this.destination_Name = data.Name;
              this.destination_Country = data.Country;
          }
        });
      myModal.present();

    }

    boook_flight(item,_flights_tab)
    {
      console.log(item);
      if(this.onwardOrReturn=='onward')
      {
        this.onewayData=item;
        let myModal = this.modal.create(BookFlightPage,{onewayData:this.onewayData,tabType:_flights_tab,uId: this.uId});

              myModal.onDidDismiss(data =>
                {
                  console.log(data);
                });
              myModal.present();
      }
      else
      {
        this.count=this.count+1;

        if(_flights_tab=='oneway')
        {
          this.onewayData=item;
          if(this.count==2)
          {
            let myModal = this.modal.create(BookFlightPage,{onewayData:this.onewayData,returnData:this.returnData,tabType:"roundTrip",uId: this.uId});

              myModal.onDidDismiss(data =>
                {
                  console.log(data);
                  this.count=this.count-1;
                });
              myModal.present();
          }
          else
          {
            this.sections.selectedSection = this.sections.second;
          }
        }
        else
        {
          this.returnData=item;
          if(this.count==2)
          {
             let myModal = this.modal.create(BookFlightPage,{onewayData:this.onewayData,returnData:this.returnData,tabType:_flights_tab,uId: this.uId});

              myModal.onDidDismiss(data =>
                {
                  console.log(data);
                  this.count=this.count-1;
                });
              myModal.present();
          }
          else
          {
            this.sections.selectedSection = this.sections.first;
          }
        }
      }
}

   onChangeHandler(event: string)
    {
      console.log(event);
      this.onwardOrReturn=event;
      this.count=0;
    }

    expandItem(item): void {

      console.log("Item",item);
      if (item.expanded) {
        item.expanded = false;
      } else {
          this.flight_onwardflights.map(listItem => {

            console.log("listItem",listItem);
          if (item == listItem) {
            listItem.expanded = !listItem.expanded;
          } else {
            listItem.expanded = false;
          }
          return listItem;
        });
      }
    }
}
