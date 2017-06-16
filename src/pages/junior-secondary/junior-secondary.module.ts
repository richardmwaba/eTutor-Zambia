import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JuniorSecondaryPage } from './junior-secondary';

@NgModule({
  declarations: [
    JuniorSecondaryPage,
  ],
  imports: [
    IonicPageModule.forChild(JuniorSecondaryPage),
  ],
  exports: [
    JuniorSecondaryPage
  ]
})
export class JuniorSecondaryPageModule {}
