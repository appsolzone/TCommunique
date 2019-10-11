import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ModalController,ViewController,ActionSheetController} from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Camera, CameraOptions ,PictureSourceType } from '@ionic-native/camera';


/**
 * Generated class for the EditEmergencyCallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-edit-emergency-call',
  segment:'page-edit-emergency-call'
})
@Component({
  selector: 'page-edit-emergency-call',
  templateUrl: 'edit-emergency-call.html',
})
export class EditEmergencyCallPage {
  loading:Loading;
  data:Observable<any>;

  contactNo:any;
  emergContactId:any;
  contactName:any;
  selectedImage:any;
  encoded_img:any;

  constructor(public actionSheetCtrl:ActionSheetController,public camera:Camera,private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public view:ViewController) {

  this.contactNo=navParams.get('contactNo');
  this.emergContactId=navParams.get('emergContactId');
  this.contactName=navParams.get('contactName');
  this.selectedImage = navParams.get('profile_image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmergencyCallPage');
  }
  changepic(){

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
    quality: 20,
    targetWidth: 600,
    targetHeight: 600,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: sourceType,
    allowEdit: true,
    saveToPhotoAlbum: false,
    correctOrientation: true
  }).then((imageData) => {
    this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    this.encoded_img=imageData;
    console.log("Image",this.selectedImage);
  });

   }

  submit(){



      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      // this.loading.present();
      var url =this.constant.edit_addEmergContact;
      let postData = new FormData();
      postData.append('contactName',this.contactName);
      postData.append('contactNo',this.contactNo);
      postData.append('emergContactId',this.emergContactId);
      postData.append('img',this.encoded_img);
      this.data = this.http.post(url,postData);
      this.data.subscribe(data =>{

        console.log("DATA",data.json());
        this.view.dismiss();


      });


  }

  closeModal(){
    this.view.dismiss();
  }

}
