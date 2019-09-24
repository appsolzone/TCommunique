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
import { HomePage } from '../../pages/home/home';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


/**
 * Generated class for the MyDocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova:any;

@IonicPage({
  name: 'page-my-documents',
	segment: 'page-my-documents'
})
@Component({
  selector: 'page-my-documents',
  templateUrl: 'my-documents.html',
})
export class MyDocumentsPage {
  name:any;
  loading:Loading;
  data:Observable<any>;
  uId:any;
  selectedImage:any;
  encoded_img:any;
  public img_status = false;
  allmyDoc:any;


  constructor(public toastCtrl:ToastController,private storage: Storage,public actionSheetCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams,public camera:Camera,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,private transfer: FileTransfer) {

    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.uId = val.uId;
      this.getMyDocuments(this.uId);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDocumentsPage');
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

  UploadDocuments(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.uploadDoc;
    let postData = new FormData();
    console.log("uId",this.uId);
    postData.append('uId',this.uId);
    postData.append('title',this.name);
    postData.append('doc',this.encoded_img);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{
       this.loading.dismiss();
       this.getMyDocuments(this.uId);
      console.log("GET_DATA",(JSON.stringify(data.json())));

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

    });

  }

  getMyDocuments(u_Id){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.viewDoc;
    let postData = new FormData();

    console.log("uId",u_Id);
    postData.append('uId',u_Id);

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{

      this.loading.dismiss();
      console.log("allmyDoc",(JSON.stringify(data.json())));
      this.allmyDoc = data.json().data;

    });
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

  download(data){

    console.log("DATA",data);

    const fileTransfer: FileTransferObject = this.transfer.create();
    let targetPath = cordova.fileexternalRootDirectory +'/Download/'+data.docTitle+".jpg";
    fileTransfer.download(data.docLink, targetPath, true).then((entry) => {
      alert('download complete: ' + entry.toURL());
    }, (error) => {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        });
  }

}
