import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionsPopoverPage } from './options-popover';

@NgModule({
  declarations: [
    OptionsPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionsPopoverPage),
  ],
})
export class OptionsPopoverPageModule {}
