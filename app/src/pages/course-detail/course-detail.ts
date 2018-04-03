import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { LessonsPage } from '../lessons/lessons';
import {MySubjectsPage} from '../my-subjects/my-subjects';
import { SignupPage } from '../signup/signup';
import {provideAuth} from "angular2-jwt";
import {LoginPage} from "../login/login";
import {MySubjectsProvider} from "../../providers/my-subjects/my-subjects";
import {AuthProvider} from "../../providers/auth/auth";

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
  public mySubjects;
  public topic;
  public enrollSatus;
  public buttonText;
  public data: any;
  public isAuthenticated: any;
  public user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mySubjectsService: MySubjectsProvider,
    private toastCtrl: ToastController,
    public authService: AuthProvider
  ) {
    this.enrollSatus = this.mySubjects;
    this.subject = navParams.get("subject");
    this.buttonText = this.getButtonText();
    this.user = this.authService.user;
    this.isAuthenticated = ( this.user !=  null); //returns true if user has been authenticated
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseDetailPage');
  }

  openLessons(topic, subject) {
    this.topic = topic;
    this.navCtrl.push(LessonsPage, {topic, subject}); // goes to lessons page
  }

  goToSignInPage(subject) {
    this.subject = subject;
    if(provideAuth())
    this.navCtrl.push(LoginPage, {subject}); // goes to lessons page
  }

  enroll() {
    let user = this.user;
    if (this.isAuthenticated) {

      this.mySubjectsService.enroll(this.subject, this.user).subscribe(data => {
        if (data['success']) {
          // show success toast
          this.presentToast(data['msg']);

          // redirect to my subjects page
          this.navCtrl.push(MySubjectsPage, {user});
        } else {
          this.presentToast(data['msg']);
          // redirect to my subjects page
          this.navCtrl.push(MySubjectsPage, {user});
        }
      });

    } else {
      // redirect to log in
      this.navCtrl.push(LoginPage);

    }
  }

getButtonText() {
  if (this.isAuthenticated) {
    this.mySubjectsService.isEnrolled(this.subject._id, this.user).then(data => {
      this.data = data;
      if (this.data['success'])
        return "Enrolled";
      else
        return "Enroll";
    });

  } else {
    //
    return "Enroll";
  }
}

  /**
   * Presents a success toast on log in
   */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
  }

}
