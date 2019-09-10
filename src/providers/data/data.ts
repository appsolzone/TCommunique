import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import async from "async";
import _ from 'lodash';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  webRTCClient;
  incomingCallId;

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }
   // set webRTCClient
   setWebRTCClient(val) {
    this.webRTCClient = val;
  }

  // get webRTCClient
  getwebRTCClient() {
    return this.webRTCClient;
  }

  // set Incoming Call id
  setIncomingCallId(id) {
    this.incomingCallId = id;
  }

  // get incoming call id
  getIncomingCallid() {
    return this.incomingCallId;
  }

}
