import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySubjectsPage } from './my-subjects';

@NgModule({
  declarations: [
    MySubjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(MySubjectsPage),
  ],
  exports: [
    MySubjectsPage
  ]
})
export class MySubjectsPageModule {}
