import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrencyConverterPage } from './currency-converter';

@NgModule({
  declarations: [
    CurrencyConverterPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrencyConverterPage),
  ],
})
export class CurrencyConverterPageModule {}
