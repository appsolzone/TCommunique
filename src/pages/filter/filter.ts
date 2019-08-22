import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-filter',
	segment: 'page-filter',
})
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  abc='80,000-1Lac';

  p1=false;
  p2= false;
  p3=false;
  p4=false;
  p5=false;
  p6=false;
  p7: boolean;
  p8: boolean;
  d1: boolean;
  d2: boolean;
  d3: boolean;
  d4: boolean;
  d5: boolean;
  d6: boolean;
  a1=false;
  a2=false;
  a3=false;
  a4=false;
  a5=false;
  m1: boolean;
  m2: boolean;
  m3: boolean;
  m4: boolean;



  p:any;
  d:any;
  a:any;
  m:any;

  // checkedIdx=0;

  // options = [
  //   'Cash On Delivery',
  //   'PayuMoney Wallet',
  //   'Pay with Paytm Wallet',
  //   'Credit/ Debit Card',
  //   'Net Banking',
  //   'PayZapp',
  //   'Pay using MobiKwiK Wallet'
  // ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  check(id)
  {
    this.p=id;

    if(id==1)
    {
      this.p1=true;
      this.p2=false;
      this.p3=false;
      this.p4=false;
      this.p5=false;
      this.p6=false;
      this.p7=false;
      this.p8=false;
    }
    else if(id==2)
    {
      this.p1=false;
      this.p2=true;
      this.p3=false;
      this.p4=false;
      this.p5=false;
      this.p6=false;
      this.p7=false;
      this.p8=false;
    }
    else if(id==3)
    {
      this.p1=false;
      this.p2=false;
      this.p3=true;
      this.p4=false;
      this.p5=false;
      this.p6=false;
      this.p7=false;
      this.p8=false;
    }
    else if(id==4)
    {
      this.p1=false;
      this.p2=false;
      this.p3=false;
      this.p4=true;
      this.p5=false;
      this.p6=false;
      this.p7=false;
      this.p8=false;
    }
    else if(id==5)
    {
      this.p1=false;
      this.p2=false;
      this.p3=false;
      this.p4=false;
      this.p5=true;
      this.p6=false;
      this.p7=false;
      this.p8=false;
    }
    else if(id==6)
    {
      this.p1=false;
      this.p2=false;
      this.p3=false;
      this.p4=false;
      this.p5=false;
      this.p6=true;
      this.p7=false;
      this.p8=false;
    }
    else if(id==7)
    {
      this.p1=false;
      this.p2=false;
      this.p3=false;
      this.p4=false;
      this.p5=false;
      this.p6=false;
      this.p7=true;
      this.p8=false;
    }
    else if(id==8)
    {
      this.p1=false;
      this.p2=false;
      this.p3=false;
      this.p4=false;
      this.p5=false;
      this.p6=false;
      this.p7=false;
      this.p8=true;
    }

  }
  check1(id2)
  {
    this.d=id2;
    if(id2==9)
    {
      this.d1=true;
      this.d2=false;
      this.d3=false;
      this.d4=false;
      this.d5=false;
      this.d6=false;
    }
    else if(id2==10)
    {
      this.d1=false;
      this.d2=true;
      this.d3=false;
      this.d4=false;
      this.d5=false;
      this.d6=false;
    }
    else if(id2==11)
    {
      this.d1=false;
      this.d2=false;
      this.d3=true;
      this.d4=false;
      this.d5=false;
      this.d6=false;
    }
    else if(id2==12)
    {
      this.d1=false;
      this.d2=false;
      this.d3=false;
      this.d4=true;
      this.d5=false;
      this.d6=false;
    }
    else if(id2==13)
    {
      this.d1=false;
      this.d2=false;
      this.d3=false;
      this.d4=false;
      this.d5=true;
      this.d6=false;
    }
    else if(id2==14)
    {
      this.d1=false;
      this.d2=false;
      this.d3=false;
      this.d4=false;
      this.d5=false;
      this.d6=true;
    }
  }

  check2(id3)
  {
    this.a=id3;
    if(id3==15)
    {
      this.a1=true;
      this.a2=false;
      this.a3=false;
      this.a4=false;
      this.a5=false;
    }
    else if(id3==16)
    {
      this.a1=false;
      this.a2=true;
      this.a3=false;
      this.a4=false;
      this.a5=false;
    }
    else if(id3==17)
    {
      this.a1=false;
      this.a2=false;
      this.a3=true;
      this.a4=false;
      this.a5=false;
    }
    else if(id3==18)
    {
      this.a1=false;
      this.a2=false;
      this.a3=false;
      this.a4=true;
      this.a5=false;
    }
    else if(id3==19)
    {
      this.a1=false;
      this.a2=false;
      this.a3=false;
      this.a4=false;
      this.a5=true;
    }
  }

    check3(id4)
  {
    this.m=id4;
    if(id4==20)
    {
      this.m1=true;
      this.m2=false;
      this.m3=false;
      this.m4=false;
    }
    else if(id4==21)
    {
      this.m1=false;
      this.m2=true;
      this.m3=false;
      this.m4=false;
    }
    else if(id4==22)
    {
      this.m1=false;
      this.m2=false;
      this.m3=true;
      this.m4=false;
    }
    else if(id4==23)
    {
      this.m1=false;
      this.m2=false;
      this.m3=false;
      this.m4=true;
    }


  }

  refreshPage1()
  {
    this.p1=false;
    this.p2=false;
    this.p3=false;
    this.p4=false;
    this.p5=false;
    this.p6=false;
    this.p7=false;
    this.p8=false;
  }
  refreshPage2()
  {
    this.d1=false;
    this.d2=false;
    this.d3=false;
    this.d4=false;
    this.d5=false;
    this.d6=false;
  }
  refreshPage3()
  {
    this.a1=false;
    this.a2=false;
    this.a3=false;
    this.a4=false;
    this.a5=false;

  }
  refreshPage4()
  {
    this.m1=false;
    this.m2=false;
    this.m3=false;
    this.m4=false;

  }
  val()
  {
    console.log(this.p);
    console.log(this.d);
    console.log(this.a);
    console.log(this.m);
  }

}
