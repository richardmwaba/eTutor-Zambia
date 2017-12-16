import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LessonsPage } from '../lessons/lessons';

/**
 * Generated class for the CourseDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {
  public subject;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.subject = navParams.get("subject");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseDetailPage');
  }

  openLessons(subject) {
    this.navCtrl.push(LessonsPage, {subject}); // goes to lessons page
  }
}
