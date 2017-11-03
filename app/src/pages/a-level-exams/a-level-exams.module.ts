import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ALevelExamsPage } from './a-level-exams';

@NgModule({
  declarations: [
    ALevelExamsPage,
  ],
  imports: [
    IonicPageModule.forChild(ALevelExamsPage),
  ],
  exports: [
    ALevelExamsPage
  ]
})
export class ALevelExamsPageModule {}
