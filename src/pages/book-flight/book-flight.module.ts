import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFlightPage } from './book-flight';

@NgModule({
  declarations: [
    BookFlightPage,
  ],
  imports: [
    IonicPageModule.forChild(BookFlightPage),
  ],
})
export class BookFlightPageModule {}
