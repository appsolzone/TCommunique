import { SettingsProvider } from '../../providers/settings/settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ThemeChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'page-theme-change',
  segment:'page-theme-change'
})
@Component({
  selector: 'page-theme-change',
  templateUrl: 'theme-change.html',
})
export class ThemeChangePage {

  selectedTheme: String;

  public form =[
      { val: 'Default', isChecked: false ,color:'searchbg'},
      { val: 'Night Mode', isChecked: false, color:'dark' },
      { val: 'Brown', isChecked: false, color:'lightbrown' }
  ];
 
  constructor(public navCtrl: NavController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);


    if(this.selectedTheme == 'dark-theme'){
      this.form = [
        { val: 'Default', isChecked: false ,color:'searchbg'},
        { val: 'Night Mode', isChecked: true, color:'dark' },
        { val: 'Brown', isChecked: false, color:'lightbrown' }
       ]

    }
    if(this.selectedTheme == 'light-theme'){
      this.form = [
        { val: 'Default', isChecked: true ,color:'searchbg'},
        { val: 'Night Mode', isChecked: false, color:'dark' },
        { val: 'Brown', isChecked: false, color:'lightbrown' }
       ]

    }
    if(this.selectedTheme == 'brown-theme'){
      this.form = [
        { val: 'Default', isChecked: false ,color:'searchbg'},
        { val: 'Night Mode', isChecked: false, color:'dark' },
        { val: 'Brown', isChecked: true, color:'lightbrown' }
       ]

    }
  }
 
  //   toggleAppTheme() {
  //   if (this.selectedTheme === 'dark-theme') {
  //     this.settings.setActiveTheme('light-theme');
  //   } else {
  //     this.settings.setActiveTheme('dark-theme');
  //   }
  // }

  home(){
    this.navCtrl.setRoot(HomePage);

  }

  CheckboxClicked(item: any, $event) {
    console.log('CheckboxClicked for ' + item.val,$event);

   if(item.val=="Default"){
     this.form = [
      { val: 'Default', isChecked: true ,color:'searchbg'},
      { val: 'Night Mode', isChecked: false, color:'dark' },
      { val: 'Brown', isChecked: false, color:'lightbrown' }
     ]
     this.settings.setActiveTheme('light-theme');
   }
   if(item.val=="Night Mode"){
    this.form = [
      { val: 'Default', isChecked: false ,color:'searchbg'},
      { val: 'Night Mode', isChecked: true, color:'dark' },
      { val: 'Brown', isChecked: false, color:'lightbrown' }
     ]
     this.settings.setActiveTheme('dark-theme');
   }
   if(item.val=="Brown"){
    this.form = [
      { val: 'Default', isChecked: false ,color:'searchbg'},
      { val: 'Night Mode', isChecked: false, color:'dark' },
      { val: 'Brown', isChecked: true, color:'lightbrown' }
     ]
     this.settings.setActiveTheme('brown-theme');
   }

}
 
}