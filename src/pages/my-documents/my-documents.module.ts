import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDocumentsPage } from './my-documents';

@NgModule({
  declarations: [
    MyDocumentsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDocumentsPage),
  ],
})
export class MyDocumentsPageModule {}
