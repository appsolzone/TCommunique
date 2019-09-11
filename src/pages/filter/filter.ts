import { Component } from '@angular/core';
import { IonicPage,ToastController,ModalController,NavParams,Nav,NavController,MenuController,Loading,LoadingController,AlertController,Platform} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-filter',
	segment: 'page-filter',
})
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  loading:Loading;
  data:Observable<any>;
  price =[{ id:1,val: 'Below 10,000', isChecked: false },{ id:2,val: '60,000-80,000', isChecked: false },{id:3, val: '10,000-20,000', isChecked: false },{ id:4,val: '90,000-1,00,000', isChecked: false },{id:5, val: '20,000-40,000', isChecked: false },{ id:6,val: '1Lac-2Lac', isChecked: false },{id:7, val: '40,000-60,000', isChecked: false },{id:8, val: 'Above 2Lac', isChecked: false }];
  duration = [{ id:1,val: '1-3', isChecked: false },{ id:2,val: '4-6', isChecked: false },{ id:3,val: '7-9', isChecked: false },{ id:4,val: '10-12', isChecked: false },{ id:5,val: '13-15', isChecked: false },{ id:6,val: '>15', isChecked: false }];
  activities = [{ id:1,val: 'Nature', isChecked: false },{ id:2,val: 'Beach', isChecked: false },{ id:3,val: 'Historical', isChecked: false },{ id:4,val: 'Religious', isChecked: false },{ id:5,val: 'Lifestyle', isChecked: false }];
  months=[{ id:1,val: 'Jan-Mar', isChecked: false },{ id:2,val: 'Apr-Jun', isChecked: false },{ id:3,val: 'Jul-Sept', isChecked: false },{ id:4,val: 'Oct-Dec', isChecked: false }]

  checkedIdxofPri;
  checkedIdxofDur;
  checkedIdxofAct;
  checkedIdxofMon;
  getUserDur;
  getUserAct;
  getUserMon;
  getUserPrice:any;

  selectedPrice = [];
  selectedMonth=[];
  selectedActivity=[];
  selectedDuration=[];
  tourType:any;


  constructor(public navParams:NavParams,private storage: Storage,public menu:MenuController,private network: Network,public toastCtrl: ToastController,public navCtrl: NavController,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public alertCtrl:AlertController) {
  
    this.tourType=navParams.get('tourType');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
 
  refreshPage1()
  {
    this.checkedIdxofPri=-1;
  }
  refreshPage2()
  {
    this.checkedIdxofDur=-1;
  }
  refreshPage3()
  {
    this.checkedIdxofAct=-1;

  }
  refreshPage4()
  {
    this.checkedIdxofMon=-1;

  }

  fetchBotton()
  {

    console.log("this.selectedPrice",this.selectedPrice);
    console.log("this.selectedActivity",this.selectedActivity);
    console.log("this.selectedDuration",this.selectedDuration);
    console.log("this.selectedMonth",this.selectedMonth);


        // this.loading = this.loadingCtrl.create({
        //   content: 'Please wait...',
        //   dismissOnPageChange: true
        // });
        // // this.loading.present();
        // var url =this.constant.filter;
        // let postData = new FormData();
        // postData.append('tourType',this.user_email);
        // postData.append('password',this.user_password);
        // postData.append('channel','app');
  
        // this.data = this.http.post(url,postData);
        // this.data.subscribe(data =>{
  
        //   console.log("section_group",(JSON.stringify(data.json())));
        //   if(data.json().status=="200"){
        //                      let t = this.toastCtrl.create({
        //           message: data.json().msg,
        //           position: 'bottom'
        //         });
        //         let closedByTimeout = false;
        //         let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 7000);
        //         t.onDidDismiss(() => {
        //           if (closedByTimeout) return;
        //           clearTimeout(timeoutHandle);
          
        //         });
        //         t.present();
  
          
        //   }else{
  
        // let t = this.toastCtrl.create({
        //   message: data.json().msg,
        //   position: 'bottom'
        // });
        // let closedByTimeout = false;
        // let timeoutHandle = setTimeout(() => { closedByTimeout = true; t.dismiss(); }, 7000);
        // t.onDidDismiss(() => {
        //   if (closedByTimeout) return;
        //   clearTimeout(timeoutHandle);
  
        // });
        // t.present();
  
        //   }
  
        // });
  
  
    

  }


  pricingType(event,id,name){
    if(event.value){
      this.selectedPrice.push({name:name,id:id});
    }
    else{
      this.selectedPrice= this.selectedPrice.filter(name=>name.id!=id)
     } 
  }
  durationsType(event,id,name){

    if(event.value){
      this.selectedDuration.push({name:name,id:id});
    }
    else{
      this.selectedDuration= this.selectedDuration.filter(name=>name.id!=id)
     } 

  }
  activitiesType(event,id,name){

    if(event.value){
      this.selectedActivity.push({name:name,id:id});
    }
    else{
      this.selectedActivity= this.selectedActivity.filter(name=>name.id!=id)
     } 

  }
  monthsType(event,id,name){

    if(event.value){
      this.selectedMonth.push({name:name,id:id});
    }
    else{
      this.selectedMonth= this.selectedMonth.filter(name=>name.id!=id)
     } 
  }

}
