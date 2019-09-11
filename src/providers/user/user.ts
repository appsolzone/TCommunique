import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  private user_name:any;
  private profile_img:any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }


  put_user_name(name)
  {
    this.user_name=name;
  }
  get_user_name()
  {
    return this.user_name;
  }
  put_user_img(image)
  {
    this.profile_img=image;
  }
  get_user_img()
  {
    return this.profile_img;
  }

}
