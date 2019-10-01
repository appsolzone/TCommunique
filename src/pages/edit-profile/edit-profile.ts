import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading,ModalController,ViewController,ActionSheetController,ToastController} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ConstantProvider } from '../../providers/constant/constant';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions ,PictureSourceType } from '@ionic-native/camera';
import { HomePage } from '../../pages/home/home';



/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-edit-profile',
  segment: 'page-edit-profile',
})
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public onProfileForm: FormGroup;
  loading:Loading;
  data:Observable<any>;
  firstname:any;
  lastname:any;
  addressid:any;
  emailid:any;
  dateofbirth:any;
  phoneno:any;
  uId:any;
  selectedImage:any;
  encoded_img:any;
  img_status:any;


  constructor(public toastCtrl:ToastController,public camera:Camera,public actionSheetCtrl:ActionSheetController ,private storage:Storage,private modal: ModalController,public navCtrl: NavController, public navParams: NavParams,private constant: ConstantProvider,public http:Http,public httpClient:HttpClient,public loadingCtrl:LoadingController,public view:ViewController,private _fb: FormBuilder) {

    storage.get('user_login_data').then((val) => {
      console.log('user_login_data', val);
      this.img_status = false;
      this.uId = val.uId;
      this.getProfileData(this.uId);
    });
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    let regExp = /^[0-9]{10}$/;

    this.onProfileForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])],

      lname: ['', Validators.compose([
        Validators.required])],
      address: ['', Validators.compose([
        Validators.required])],

        fname: ['', Validators.compose([
          Validators.required])],



      dob: ['', Validators.compose([
          Validators.required])],
      phone: ['', Validators.compose([
          Validators.required,Validators.pattern(regExp)])]
    });
  }

  getProfileData(u_Id){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.getProfileData;
    let postData = new FormData();
    postData.append('uId',u_Id);
    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{
      this.loading.dismiss();

      console.log("DATA",data.json());

      if(data.json().status == 200){
        this.img_status=true;
        this.addressid=data.json().data.addr;
        this.dateofbirth=data.json().data.dob;
        this.emailid=data.json().data.email;
        this.firstname=data.json().data.fName;
        this.lastname=data.json().data.lName;
        this.phoneno=data.json().data.phone;
        this.dateofbirth=data.json().data.dob;
        this.selectedImage=data.json().data.profImg;

        console.log("this.selectedImage",this.selectedImage);

        if(this.selectedImage == null){
          this.img_status = false
        }else{
          this.img_status = true
        }
      }

    });


  }

  submit(){
    // uId,fName,lName,email,phone,addr,profImg

    console.log("this.encoded_img",this.encoded_img);

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
    var url =this.constant.updateProfile;
    let postData = new FormData();
    postData.append('uId',this.uId);
    postData.append('fName',this.firstname);
    postData.append('lName',this.lastname);
    postData.append('email',this.emailid);
    postData.append('phone',this.phoneno);
    postData.append('addr',this.addressid);
    postData.append('dob',this.dateofbirth);

    // if(this.encoded_img == undefined){
    //   postData.append('profImg',this.selectedImage);

    // }else{
      postData.append('profImg',this.encoded_img);

    // }

    this.data = this.http.post(url,postData);
    this.data.subscribe(data =>{
      this.loading.dismiss();
      this.getProfileData(this.uId);
      console.log("DATA",data.json());


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
      this.img_status=true;
    });

     }
     home(){
      this.navCtrl.setRoot(HomePage);
    }
}
