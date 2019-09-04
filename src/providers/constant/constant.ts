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
  public get_destinationByCatId = "https://appsolzone.com/aszdev/tcApi/destination/destinationByCatId.php";
  public get_listOfPackageByDestId="https://appsolzone.com/aszdev/tcApi/package/listOfPackageByDestId.php";
  public login="https://appsolzone.com/aszdev/tcApi/login/login.php";
  public get_packageDetails="https://appsolzone.com/aszdev/tcApi/package/packageDetails.php";
  public get_viewAgentContact="https://appsolzone.com/aszdev/tcApi/emergContact/viewAgentContact.php";
  public get_emergencyContact="https://appsolzone.com/aszdev/tcApi/emergContact/emergencyContact.php";
  public edit_addEmergContact="https://appsolzone.com/aszdev/tcApi/emergContact/addEmergContact.php";
  public bookPackage="https://appsolzone.com/aszdev/tcApi/package/bookPackage.php";
  public customizePackage="https://appsolzone.com/aszdev/tcApi/package/customizePackage.php";
  public experienceShare_expPost="https://appsolzone.com/aszdev/tcApi/experienceShare/expPost.php";
  public experienceShare_expView="https://appsolzone.com/aszdev/tcApi/experienceShare/expView.php";
  public uploadDoc="https://appsolzone.com/aszdev/tcApi/uploadDoc/upload.php";
  public contactUs="https://appsolzone.com/aszdev/tcApi/contactUs/contactUs.php";



  constructor(public http: HttpClient) {
    console.log('Hello ConstantProvider Provider');
  }

}
