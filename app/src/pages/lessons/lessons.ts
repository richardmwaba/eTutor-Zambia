import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// page import
import {VideoPlayerPage} from "../video-player/video-player";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.topic = navParams.get("topic");
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

  goToContent(video) {
    this.video = video;
    this.navCtrl.push(VideoPlayerPage, {
      video  // passing data to LessonContentPage
    });
  }

}
