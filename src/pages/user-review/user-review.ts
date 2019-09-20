import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,Loading,ToastController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';


/**
 * Generated class for the UserReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-user-review',
  segment:'page-user-review'
})
@Component({
  selector: 'page-user-review',
  templateUrl: 'user-review.html',
})
export class UserReviewPage {
  loading:Loading;
  data:Observable<any>;

  public onRegForm: FormGroup;

  rating: number = 1;

  public destination:any;
  public date:any;
  public comment:any;
  uId:any;

  constructor(public storage:Storage,public navCtrl: NavController,private toast:ToastController, public navParams: NavParams,private _fb: FormBuilder,public events: Events,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController)
  {
    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
    });

    events.subscribe('star-rating:changed', (starRating) => {
      console.log(starRating);
      this.rating = starRating;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserReviewPage');
  }

  ngOnInit()
  {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.onRegForm = this._fb.group({
      destination: ['', Validators.compose([
        Validators.required
      ])],
      date: ['', Validators.compose([
        Validators.required
      ])],
      comment: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  postUserReview()
  {
    let rating=this.rating.toString();

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();

    var url =this.constant.submit_user_review;
    let postData = new FormData();

    postData.append('uId',this.uId);
    postData.append('date',this.date);
    postData.append('destination',this.destination);
    postData.append('rating',rating);
    postData.append('comment',this.comment);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      this.loading.dismiss();
      let toast = this.toast.create({
        message: data.json().msg,
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    });
  }
  home(){
    this.navCtrl.setRoot(HomePage);
  }
}

