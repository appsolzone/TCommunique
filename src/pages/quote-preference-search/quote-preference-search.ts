import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController,ViewController,Loading,NavParams} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";

/**
 * Generated class for the QuotePreferenceSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-quote-preference-search',
  segment:'page-quote-preference-search'
})
@Component({
  selector: 'page-quote-preference-search',
  templateUrl: 'quote-preference-search.html',
})
export class QuotePreferenceSearchPage {

  loading:Loading;
  data:Observable<any>;
  public searchit: FormGroup;
  public searchTerm: string = "";
  public searchControl: FormControl;
  searching: any = false;
  departure:any;
  showlist:any=false;
  public items: any;

  constructor(public navParams: NavParams,private view:ViewController ,private constant:ConstantProvider,public toastCtrl:ToastController,public navCtrl: NavController) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusSearchListPage');
    this.setFilteredItems("");

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

        this.searching = false;

        this.setFilteredItems(search);

    });


  }
        onSearchInput(){
          this.searching = true;
          this.showlist = true;
      }


        ngOnInit() {
          this.setFilteredItems("");

          this.searchControl.valueChanges
            .pipe(debounceTime(700))
            .subscribe(search => {
              this.setFilteredItems(search);
            });


        }

        setFilteredItems(searchTerm) {
        console.log("searchTerm",searchTerm)
        if(searchTerm.length >=3){
          this.items = this.constant.filterItems(searchTerm)
          console.log("this.all",this.items);
        }else{
          this.showlist = false;
        }

        }


        selectdeparture(data){
        this.showlist = false;
        console.log("DATA",data);
        this.departure =data.NAME;
        // this.navCtrl.pop();
        this.view.dismiss({"Name":data.NAME});

        }



  closeModal() {
    this.navCtrl.pop();
  }
}
