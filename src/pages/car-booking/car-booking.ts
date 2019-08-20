import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the CarBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-car-booking',
  segment: 'page-car-booking',
})
@Component({
  selector: 'page-car-booking',
  templateUrl: 'car-booking.html',
})
export class CarBookingPage {
  public carbook: FormGroup;
  first: any;
  secon: any;
  third: any;
  fourt: any;
  fifth: any;
  sixth: any;
  seven: any;
  eight: any;
  date1:any;
  time:any;
  type:any;
  ClickablePic:any;




  constructor(public navCtrl: NavController, public navParams: NavParams,public fb:FormBuilder) {
  }



  ngOnInit() {
    // let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    this.carbook = this.fb.group({
      finp: ['', Validators.compose([
        Validators.required])],
      sinp: ['', Validators.compose([
        Validators.required])],
      tinp: ['', Validators.compose([
        Validators.required])],
      foinp: ['', Validators.compose([
        Validators.required])],
      fiinp: ['', Validators.compose([
        Validators.required])],
      siinp: ['', Validators.compose([
        Validators.required])],
        date: ['', Validators.compose([
          Validators.required])],
        time: ['', Validators.compose([
            Validators.required])]


  });
}
select(a){
  this.ClickablePic=a;
  console.log(this.ClickablePic);
}

check()
{
  console.log(this.first);
  console.log(this.secon);
  console.log(this.third);
  console.log(this.fourt);
  console.log(this.fifth);
  console.log(this.sixth);
  console.log(this.seven);
  // this.eight = new Date().toISOString().substring(0, 10);

  console.log( "Selected Date" ,this.date1 );

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarbookingPage');
  }

}
