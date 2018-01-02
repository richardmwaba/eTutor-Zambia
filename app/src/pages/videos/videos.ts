import { Component } from '@angular/core';
import {VideoPlayerPage} from "../video-player/video-player";
import {NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
    public subTopic;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.subTopic = this.navParams.get("subTopic");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

    goToContent(video) {
        this.navCtrl.push(VideoPlayerPage, {
            video: video  // passing data to LessonContentPage
        });
    }

}
