import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionForumPage } from './discussion-forum';

@NgModule({
  declarations: [
    DiscussionForumPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionForumPage),
  ],
})
export class DiscussionForumPageModule {}
