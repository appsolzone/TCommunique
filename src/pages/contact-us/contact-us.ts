import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


// declare var iosrtc;
// declare var apiRTC;
// declare var apiCC;

// const STATE_WAIT = "wait";
// const STATE_INCALL = "incall";

// const LABEL_CALL = "Call";
// const LABEL_HANGOUT = "Hangout";

// const COLOR_CALL = "#5cb85c";
// const COLOR_HANGOUT = "#d9534f";


@IonicPage({
  name: 'page-contact-us',
  segment: 'page-contact-us',
})
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  public onContactForm: FormGroup;
  user_email:any;
  user_name:any;
  user_phone:any;
  user_message:any;


  // distantNumber:any;
  // webRTCClient:any;
  // infoLabel:any;
  // buttonLabel:any;
  // buttonColor:any;
  // state:any;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, public navParams: NavParams,public _fb:FormBuilder) {


    // this.incomingCallHandler = this.incomingCallHandler.bind(this);
    // this.userMediaErrorHandler = this.userMediaErrorHandler.bind(this);
    // this.remoteStreamAddedHandler = this.remoteStreamAddedHandler.bind(this);
    // this.hangupHandler = this.hangupHandler.bind(this);
    // this.refreshVideoView = this.refreshVideoView.bind(this);
    // this.sessionReadyHandler = this.sessionReadyHandler.bind(this);
    // this.userMediaSuccessHandler = this.userMediaSuccessHandler.bind(this);
    // apiRTC.init({
    //   onReady: this.sessionReadyHandler,
    //   apiKey: "e3f2a59d3d7ff5e7db178bb8ebb1549f"
    // });

    // this.infoLabel= "Registration Ongoing...";
    // this.buttonLabel = LABEL_CALL;
    // this.buttonColor = COLOR_CALL;
    // this.state = STATE_WAIT;
  }


  // /**
  //  * Call Action
  //  */
  // pushCall(event) {
  //   console.log("Push, callState="+this.state);
  //   if(this.distantNumber && this.state == STATE_WAIT) {
  //     setTimeout(this.refreshVideoView,4000);
  //     this.webRTCClient.call(this.distantNumber);
  //   } else if(this.state == STATE_INCALL) {
  //     this.state = STATE_WAIT;
  //     this.buttonColor = COLOR_CALL;
  //     this.buttonLabel = LABEL_CALL;
  //     this.webRTCClient.hangUp();
  //   }
  // }

  // sessionReadyHandler(e) {
  //   console.log("sessionReadyHandler");
  //   apiRTC.addEventListener("incomingCall", this.incomingCallHandler);
  //   apiRTC.addEventListener("userMediaError", this.userMediaErrorHandler);
  //   apiRTC.addEventListener("remoteStreamAdded", this.remoteStreamAddedHandler);
  //   apiRTC.addEventListener("userMediaSuccess", this.userMediaSuccessHandler);
  //   apiRTC.addEventListener("hangup", this.hangupHandler);
  //   this.webRTCClient = apiCC.session.createWebRTCClient({});
  //   this.infoLabel = "Your local ID : "+apiCC.session.apiCCId;
  // }

  // refreshVideoView() {
  //   if (this.platform.is('ios')) {
  //     console.log("REFRESH");
  //     iosrtc.refreshVideos();
  //   }
  // }

  // incomingCallHandler(e) {
  //   console.log("incomingCallHandler");
  //   this.state = STATE_INCALL;
  //   this.buttonColor = COLOR_HANGOUT;
  //   this.buttonLabel = LABEL_HANGOUT;
  //   setTimeout(this.refreshVideoView,2000);
  // }

  // hangupHandler(e) {
  //   console.log("hangupHandler");
  //   this.state = STATE_WAIT;
  //   this.buttonColor = COLOR_CALL;
  //   this.buttonLabel = LABEL_CALL;
  //   this.initMediaElementState(e.detail.callId);
  // }

  // userMediaSuccessHandler(e) {
  //   console.log("userMediaSuccessHandler",e);
  //   this.webRTCClient.addStreamInDiv(
  //     e.detail.stream,
  //     e.detail.callType,
  //     "mini",
  //     'miniElt-' + e.detail.callId,
  //     {width : "128px", height : "96px"},
  //     true
  //   );
  // }

  // userMediaErrorHandler(e) {
  // }

  // remoteStreamAddedHandler(e) {
  //   console.log("remoteStreamAddedHandler",e);
  //   this.state = STATE_INCALL;
  //   this.buttonColor = COLOR_HANGOUT;
  //   this.buttonLabel = LABEL_HANGOUT;
  //   this.webRTCClient.addStreamInDiv(
  //     e.detail.stream,
  //     e.detail.callType,
  //     "remote",
  //     'remoteElt-' + e.detail.callId,
  //     {},
  //     false
  //   );
  //   setTimeout(this.refreshVideoView,1000);
  // }

  // initMediaElementState(callId) {
  //   this.webRTCClient.removeElementFromDiv('mini', 'miniElt-' + callId);
  //   this.webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + callId);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    let regExp = /^[0-9]{10}$/;
    this.onContactForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.pattern(EMAILPATTERN)
      ])],
      name: ['', Validators.compose([
        Validators.required])],
      phone: ['', Validators.compose([
        Validators.required,Validators.pattern(regExp)])],
      message: ['', Validators.compose([
        Validators.required])]
    });
  }

  submit(){

  }
  callnow(){

  }

}
