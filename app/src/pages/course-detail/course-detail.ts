import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LessonsPage } from '../lessons/lessons';
import { SignupPage } from '../signup/signup';
import {provideAuth} from "angular2-jwt";
import {LoginPage} from "../login/login";

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
  public topic;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.subject = navParams.get("subject");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseDetailPage');
  }

  openLessons(topic, subject) {
    this.topic = topic
    this.navCtrl.push(LessonsPage, {topic, subject}); // goes to lessons page
  }

  goToSignInPage(subject) {
    this.subject = subject
    if(provideAuth())
    this.navCtrl.push(LoginPage, {subject}); // goes to lessons page
  }

}
