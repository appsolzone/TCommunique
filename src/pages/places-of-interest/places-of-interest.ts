import { Component ,NgZone, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlacesOfInterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage({
  name: 'page-places-of-interest',
  segment: 'page-places-of-interest',
})
@Component({
  selector: 'page-places-of-interest',
  templateUrl: 'places-of-interest.html',
})
export class PlacesOfInterestPage {
  @ViewChild('map') mapElement: ElementRef;

  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;
  isKM:any=5000;
  isType:any="hospital";
  infowindow: any;
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


  arraySource=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private ngZone: NgZone) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){

  //   this.geolocation.getCurrentPosition().then((position) => {

  //   this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //         console.log('latLng',this.latLng);

  //     this.mapOptions = {
  //       center: this.latLng,
  //       zoom: 14,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }

  // this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

  //   }, (err) => {
  //     alert('err '+err);
  //   });

  navigator.geolocation.getCurrentPosition((location) => {
    console.log(location);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: location.coords.latitude, lng: location.coords.longitude},
      zoom: 15
    });

    // let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);


    this.infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
      location: {lat: location.coords.latitude, lng: location.coords.longitude},
      radius: this.isKM,
      type: this.isType
    }, (results,status) => {

      console.log("results",results);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          // console.log("HEE",results[i].photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));

          var object_data = new Object ({
            name: results[i].name,
            photo: typeof results[i].photos !== 'undefined'
                ? results[i].photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})
                : 'assets/imgs/noimage.jpg' ,
            loc: results[i].geometry.location,
            rating: typeof results[i].rating !== 'undefined'
                ? results[i].rating
                : '0.0'
         });
          this.arraySource.push(object_data);
          this.createMarker(results[i]);
        }
      }
    });
  }, (error) => {
    console.log(error);
  }, this.options);

  }
  /*--------------------Find Nearby Place------------------------*/

  nearbyPlace(data){
    this.isType = data;
    console.log("isType DATA",data);
    this.arraySource = [];
    this.arraySource.length = 0;
    this.loadMap();
    // this.markers = [];
    // let service = new google.maps.places.PlacesService(this.map);
    // service.nearbySearch({
    //           location: this.latLng,
    //           radius: this.isKM,
    //           types: [this.isType]
    //         }, (results, status) => {
    //             this.callback(results, status);
    //         });
  }

  // callback(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       this.createMarker(results[i]);
  //     }
  //   }
  // }

  createMarker(place){
    var placeLoc = place;
    console.log('placeLoc',placeLoc);


    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        icon: image
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }

  f1(data){

    console.log("Selected Data",data);

  }
}