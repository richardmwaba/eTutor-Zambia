import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionsSearchPage } from './discussions-search';

@NgModule({
  declarations: [
    DiscussionsSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionsSearchPage),
  ],
})
export class DiscussionsSearchPageModule {}
