import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
/**
 * Generated class for the OwnPropertyGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-own-property-gallery',
  segment:'page-own-property-gallery'
})
@Component({
  selector: 'page-own-property-gallery',
  templateUrl: 'own-property-gallery.html',
})
export class OwnPropertyGalleryPage {
  loading:Loading;
  data:Observable<any>;

  isZoomable:boolean=true;
  tapCount:number=0;

  public gallery_image:any;
  public view_full_img=true;
  view_expanded_img:boolean=false;
  expanded_menu_id:any;
  _imageViewerCtrl: ImageViewerController;
  hotelId:any;

  constructor(imageViewerCtrl: ImageViewerController,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public constant:ConstantProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.hotelId=navParams.get('hotelId');
    this._imageViewerCtrl = imageViewerCtrl;

    this.getGalleryImage(this.hotelId);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnPropertyGalleryPage');
  }

  getGalleryImage(hotel_Id){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    let postData = new FormData();
    postData.append('hotelId',hotel_Id);
    var url =this.constant.getGallery;
    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      this.loading.dismiss();
      console.log("getGallery",data)
      this.gallery_image = data.json().data;

    });

  }

  closeModal(){
    this.view_full_img=false;
    this.navCtrl.pop();

  }

  viewMenuImage(menuImg) {
    const imageViewer = this._imageViewerCtrl.create(menuImg);
    imageViewer.present();

  }



  zoom(imgId)
  {
    //alert(imgId)
    this.tapCount++;

    setTimeout(() => {
      if(this.tapCount>=2)
      {
        if(!this.isZoomable)
        {

          document.getElementById(imgId).style.transform = "scale(1)";
          document.getElementById(imgId).style.transition = 'transform 0.5s ease-out';
          //document.getElementById(imgId).style.overflowX = 'hidden';
          //document.getElementById(imgId).style.overflowY = 'hidden';
          this.isZoomable=true;
        }
        else
        {
          document.getElementById(imgId).style.transform = "scale(1.5)";
          document.getElementById(imgId).style.transition = 'transform 0.5s ease-in';
          //document.getElementById(imgId).style.overflowX = 'scroll';
          //document.getElementById(imgId).style.overflowY = 'scroll';
          this.isZoomable=false;
        }
      }

      this.tapCount=0;
    },250)
  }

}
