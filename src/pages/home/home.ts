import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JuniorSecondaryPage } from '../junior-secondary/junior-secondary';
import { CourseDetailPage } from '../course-detail/course-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  jnrSecExams() {
    //navigate to the junior secondary page
    this.navCtrl.push(JuniorSecondaryPage);
  }

  courseDetail() {
    //navigate to the selected course detail page
    this.navCtrl.push(CourseDetailPage);
  }

}
