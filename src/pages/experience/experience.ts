import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams,ActionSheetController ,LoadingController,Loading} from 'ionic-angular';
import { Camera, CameraOptions ,PictureSourceType } from '@ionic-native/camera';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HomePage } from '../../pages/home/home';





/**
 * Generated class for the ExperiencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-experience',
  segment: 'page-experience',
})
@Component({
  selector: 'page-experience',
  templateUrl: 'experience.html',
})
export class ExperiencePage {
  loading:Loading;
  data:Observable<any>;
  selectedImage:any;
  encoded_img:any;
  public img_status=false;
  name:any;
  note:any;
  uId:any;
  experienceShare_expView_Data:any;

  constructor(private socialSharing: SocialSharing,public toastCtrl:ToastController,private storage: Storage,public actionSheetCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams,public camera:Camera,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController) {

    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
      this.experienceShare_expView(this.uId);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencePage');
  }
  uploadImage(){

      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Use Library',
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          }, {
            text: 'Capture Image',
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.CAMERA);
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();

  }


  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      this.encoded_img=imageData;
      console.log("Image",this.selectedImage);
      this.img_status = true;
    });

     }

     PostDataClick(){

      this.experienceShare_expPost(this.uId,this.name,this.note,this.encoded_img);

     }

     experienceShare_expPost(u_Id,title,content,image){

      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
      var url =this.constant.experienceShare_expPost;
      let postData = new FormData();
      console.log("uId",u_Id);
      postData.append('uId',u_Id);
      postData.append('title',title);
      postData.append('content',content);
      postData.append('image',image);

      this.data = this.http.post(url,postData);
      this.data.subscribe(data =>{
         this.loading.dismiss();

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
        this.experienceShare_expView(this.uId);

      });
    }

    experienceShare_expView(u_Id){

      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
      var url =this.constant.experienceShare_expView;
      let postData = new FormData();

      console.log("uId",u_Id);
      postData.append('uId',u_Id);

      this.data = this.http.post(url,postData);
      this.data.subscribe(data =>{

        this.loading.dismiss();
        console.log("experienceShare_expView",(JSON.stringify(data.json())));
        this.experienceShare_expView_Data = data.json().data;

      });

    }

    share(data){

      console.log("DATA")
      let url="https://appsolzone.com";
      let share_message= data.expTitle;
      let share_message_body= data.expContent;

      this.socialSharing.share(share_message, share_message_body, null, url).then(() => {

      }).catch(() => {

      });
    }

    home(){
      this.navCtrl.setRoot(HomePage);
    }

}
