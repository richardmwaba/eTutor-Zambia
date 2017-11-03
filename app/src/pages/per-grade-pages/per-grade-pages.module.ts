import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerGradePagesPage } from './per-grade-pages';

@NgModule({
  declarations: [
    PerGradePagesPage,
  ],
  imports: [
    IonicPageModule.forChild(PerGradePagesPage),
  ],
  exports: [
    PerGradePagesPage
  ]
})
export class PerGradePagesPageModule {}
