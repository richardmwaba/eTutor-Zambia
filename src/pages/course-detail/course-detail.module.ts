import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourseDetailPage } from './course-detail';

@NgModule({
  declarations: [
    CourseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CourseDetailPage),
  ],
  exports: [
    CourseDetailPage
  ]
})
export class CourseDetailPageModule {}
