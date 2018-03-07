import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// page import
import {VideoPlayerPage} from "../video-player/video-player";
import {SubscriptionPage} from "../subscription/subscription";
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {provideAuth} from "angular2-jwt";

/**
 * Generated class for the LessonsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html',
})
export class LessonsPage {

  // lessons array
  // lessons: Array<{title: string, subTopic: string, topic: string}>;
  public topic: any;
  public video: any;
  public subject: any;
  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider) {
      this.topic = navParams.get("topic");
      this.subject = navParams.get("subject");

      // this.subject = navParams.get("subject");
    // adding values to array
    // this.lessons = [];
    // for (let i = 1; i < 4; i++) {
    //   this.lessons.push({
    //     title: 'Lesson ' + i,
    //     subTopic: 'Sub topic' + i,
    //     topic: 'Topic' + i
    //   });
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonsPage');
  }

  checkSubscription(video, subject) {
    //if this user has subscribed, go to the video else go to the subscription page
    this.subject = subject;
    this.video = video;
    //if user is not signed in redirect to sign in page
    if(this.authService.user == null){
      // redirect to log in
      this.navCtrl.push(LoginPage);

    }else {
      this.navCtrl.push(SubscriptionPage, {
        video, subject  // passing data to subscription page
      });
    }
  }

  playVideo(video){
    this.video = video;
    this.navCtrl.push(VideoPlayerPage, {
      video  // passing data to LessonContentPage
    });
  }

}
