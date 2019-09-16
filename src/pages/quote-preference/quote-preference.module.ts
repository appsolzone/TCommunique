import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotePreferencePage } from './quote-preference';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    QuotePreferencePage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(QuotePreferencePage),
  ],
})
export class QuotePreferencePageModule {}
