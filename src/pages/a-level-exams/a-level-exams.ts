import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseDetailPage } from '../course-detail/course-detail';

/**
 * Generated class for the ALevelExamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-a-level-exams',
  templateUrl: 'a-level-exams.html',
})
export class ALevelExamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ALevelExamsPage');
  }

  courseDetail() {
    //navigate to the selected course detail page
    this.navCtrl.push(CourseDetailPage);
  }

}
