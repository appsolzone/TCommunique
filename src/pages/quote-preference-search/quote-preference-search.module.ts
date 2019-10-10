import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotePreferenceSearchPage } from './quote-preference-search';

@NgModule({
  declarations: [
    QuotePreferenceSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotePreferenceSearchPage),
  ],
})
export class QuotePreferenceSearchPageModule {}
