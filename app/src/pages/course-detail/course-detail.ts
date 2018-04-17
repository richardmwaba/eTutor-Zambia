import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';

import { LessonsPage } from '../lessons/lessons';
import {MySubjectsPage} from '../my-subjects/my-subjects';
import { SignupPage } from '../signup/signup';
import {provideAuth} from "angular2-jwt";
import {LoginPage} from "../login/login";
import {MySubjectsProvider} from "../../providers/my-subjects/my-subjects";
import {AuthProvider} from "../../providers/auth/auth";
import {SubscriptionPage} from "../subscription/subscription";
import {DiscussionForumPage } from "../discussion-forum/discussion-forum";

import {VideoPlayerPage} from "../video-player/video-player";
import {SubscriptionsProvider} from "../../providers/subscriptions/subscriptions";
import {PopoverPage} from "../popover/popover";

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
  public video: any;
  public content: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mySubjectsService: MySubjectsProvider,
    public modalCtrl: ModalController,
    public subscriptionService: SubscriptionsProvider,
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
    this.content = "videos";
    console.log('ionViewDidLoad CourseDetailPage');
  }

  setCurrent() {
    this.content = "videos";
  }

  /**check if this user has an active subscription for this subject then play the video
   * otherwise redirect to subscription page
   * @param video
   * @param subject
   */
  checkSubscription(video, subject) {
    //if this user has subscribed, go to the video else go to the subscription page
    if(this.isAuthenticated){
      this.subject = subject;
      this.video = video;

      this.subscriptionService.verifySubscription(this.subject, this.user).then((data) => {
        console.log(data);
        this.data = data;
        //if success store the record locally
        if (this.data['success']) {
          this.playVideo(this.video);

        } else {
          this.presentToast(this.data['msg']);
          // this.navCtrl.push(SubscriptionPage, {
          //   video, subject  // passing data to subscription page
          // });
          this.presentModal(video, subject, SubscriptionPage);
        }
      });

    }else {
      // redirect to log in
      // this.navCtrl.push(LoginPage);
      this.presentModal(video, subject, LoginPage);
    }
  }

  /**
   * presents a modal
   */
  presentModal(video, subject, page) {
    let modal = this.modalCtrl.create(page,
      {video, subject });
    modal.present();
  }

  /**
   * @param video
   */
  playVideo(video){
    this.video = video;
    this.navCtrl.push(VideoPlayerPage, {
      video  // passing data to LessonContentPage
    });
  }

  /**
   * @param subject
   */
  openLessons(subject) {
    this.subject = subject;
    this.navCtrl.push(LessonsPage, {subject}); // goes to lessons page
  }

  goToForum(subject){
    this.subject = subject;
    this.navCtrl.push(DiscussionForumPage, {subject});
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
