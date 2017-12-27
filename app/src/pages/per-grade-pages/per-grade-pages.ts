import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CourseDetailPage} from "../course-detail/course-detail";

/**
 * Generated class for the PerGradePagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-per-grade-pages',
  templateUrl: 'per-grade-pages.html',
})
export class PerGradePagesPage {
  public subjects;
  public grade;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.subjects = this.navParams.get("subjects");
    this.grade = this.navParams.get("grade");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerGradePagesPage');
  }

    courseDetail(subject) {
        //navigate to the selected course detail page
        this.navCtrl.push(CourseDetailPage, {subject});
    }

}
