import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



/*
  Generated class for the ConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantProvider {
  public items: any = [];
  public flight_items:any=[];
  data:Observable<any>;


  public goibibo_app_key = "80fa1efbb2254fb73c587c042251ceeb";
  public goibibi_app_id = "9729a4de";
  public get_category_list='https://appsolzone.com/aszdev/tcApi/category/categoryList.php';
  public get_destinationByCat="https://appsolzone.com/aszdev/tcApi/category/destinationByCat.php";
  public get_destinationByCatId = "https://appsolzone.com/aszdev/tcApi/destination/destinationByCatId.php";
  public get_listOfPackageByDestId="https://appsolzone.com/aszdev/tcApi/package/listOfPackageByDestId.php";
  public login="https://appsolzone.com/aszdev/tcApi/login/login.php";
  public signup="https://appsolzone.com/aszdev/tcApi/signup/signup.php";
  public otp="https://appsolzone.com/aszdev/tcApi/signup/activateAccount.php";
  public resendOtp = "https://appsolzone.com/aszdev/tcApi/signup/resendOtp.php";
  public Forgotpassword="https://appsolzone.com/aszdev/tcApi/login/sendCode.php";
  public updatePassword = "https://appsolzone.com/aszdev/tcApi/login/updatePassword.php";
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
  public carBooking="https://appsolzone.com/aszdev/tcApi/carBooking/carBooking.php";
  public getProfileData="https://appsolzone.com/aszdev/tcApi/profile/getProfileData.php";
  public updateProfile="https://appsolzone.com/aszdev/tcApi/profile/updateProfile.php";
  public search="https://appsolzone.com/aszdev/tcApi/search/search.php";
  public filter ="https://appsolzone.com/aszdev/tcApi/filter/filter.php";
  public fetch_user_review="https://appsolzone.com/aszdev/tcApi/review/userReview.php";
  public submit_user_review = "https://appsolzone.com/aszdev/tcApi/review/submitReview.php";
  public bannerImages="https://appsolzone.com/aszdev/tcApi/banner/bannerImages.php";
  public getCatList="https://appsolzone.com/aszdev/tcApi/category/getCatList.php";
  public trendingDest="https://appsolzone.com/aszdev/tcApi/trending/trendingDest.php";
  public viewDoc="https://appsolzone.com/aszdev/tcApi/uploadDoc/viewDoc.php";
  public hotelsearch = "https://appsolzone.com/aszdev/tcApi/search/hotelSearch.php";
  public viewWishList="https://appsolzone.com/aszdev/tcApi/wishlist/viewWishList.php";
  public planMyHoliday="https://appsolzone.com/aszdev/tcApi/planHoliday/planMyHoliday.php";
  public reminder="https://appsolzone.com/aszdev/tcApi/reminder/reminder.php";
  public checkAvailability="https://appsolzone.com/aszdev/tcApi/hotel/checkAvailability.php";
  public bookHotel="https://appsolzone.com/aszdev/tcApi/hotel/bookHotel.php";

  public addToWishList="https://appsolzone.com/aszdev/tcApi/wishlist/addToWishList.php";

  public bookFlight="https://appsolzone.com/aszdev/tcApi/flight/bookFlight.php";
  public bookBus="https://appsolzone.com/aszdev/tcApi/bus/bookBus.php";
  public videoAgentList="https://appsolzone.com/aszdev/tcApi/videoAgent/videoAgentList.php";
  public getGallery="https://appsolzone.com/aszdev/tcApi/hotel/getGallery.php";
  public emergencyCallLog="https://appsolzone.com/aszdev/tcApi/emergContact/emergencyCallLog.php";
  public pkgFilterPrice="https://appsolzone.com/aszdev/tcApi/fetchData/pkgFilterPrice.php";


  constructor(public httpClient: HttpClient,) {
    console.log('Hello ConstantProvider Provider');
    this.getBusList();
    this.getAirPort_List();
    this.getCity_List();
  }


  getBusList(){

    // return this.httpClient.get('assets/json/Bus_List.json').toPromise()
    this.data = this.httpClient.get('assets/json/Bus_List.json');
    this.data.subscribe(data =>{
      this.items = data;
    });
        }

        filterItems(searchTerm) {

            console.log("THIS>ITEM",this.items);
            return this.items.filter(data => {
              return data.NAME.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            });

        }
        filterItems2(searchTerm) {

          console.log("THIS>ITEM",this.items);
          return this.items.filter(data => {
            return data.NAME.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
          });

      }

      getAirPort_List(){
        this.data = this.httpClient.get('assets/json/Airport_List.json');
        this.data.subscribe(data =>{
          this.flight_items = data;
        });
            }




                  flight_filterItems(searchTerm) {

                    console.log("Flight",this.flight_items);
                    return this.flight_items.filter(item => {
                      return item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                    });

                }
                flight_filterItems2(searchTerm) {

                  console.log("Flight",this.flight_items);
                  return this.flight_items.filter(item => {
                    return item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                  });

              }

              getCity_List(){
                this.data = this.httpClient.get('assets/json/City_List.json');
                this.data.subscribe(data =>{
                  // this.items = data;
                });
                    }

}
