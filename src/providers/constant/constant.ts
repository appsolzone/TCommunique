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
  public get_destinationByCat="https://appsolzone.com/aszdev/tcApi/category/destinationByCat.php";
  public get_destinationByCatId = "https://appsolzone.com/aszdev/tcApi/destination/destinationByCatId.php"
  public get_listOfPackageByDestId="https://appsolzone.com/aszdev/tcApi/package/listOfPackageByDestId.php";
  public login="https://appsolzone.com/aszdev/tcApi/login/login.php";
  public get_packageDetails="https://appsolzone.com/aszdev/tcApi/package/packageDetails.php";



  constructor(public http: HttpClient) {
    console.log('Hello ConstantProvider Provider');
  }

}
