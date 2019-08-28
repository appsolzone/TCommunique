import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantProvider {

  public get_category_list='https://appsolzone.com/aszdev/tcApi/category/categoryList.php';


  constructor(public http: HttpClient) {
    console.log('Hello ConstantProvider Provider');
  }

}
