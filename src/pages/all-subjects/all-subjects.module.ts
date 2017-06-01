import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllSubjectsPage } from './all-subjects';

@NgModule({
  declarations: [
    AllSubjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllSubjectsPage),
  ],
  exports: [
    AllSubjectsPage
  ]
})
export class AllSubjectsPageModule {}
