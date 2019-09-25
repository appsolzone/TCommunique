import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookBusPage } from './book-bus';

@NgModule({
  declarations: [
    BookBusPage,
  ],
  imports: [
    IonicPageModule.forChild(BookBusPage),
  ],
})
export class BookBusPageModule {}
