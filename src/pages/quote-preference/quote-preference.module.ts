import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotePreferencePage } from './quote-preference';

@NgModule({
  declarations: [
    QuotePreferencePage,
  ],
  imports: [
    IonicPageModule.forChild(QuotePreferencePage),
  ],
})
export class QuotePreferencePageModule {}
