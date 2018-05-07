import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the VideoPlayerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-video-player',
  templateUrl: 'video-player.html',
})
export class VideoPlayerPage {
  public subTopic;
  public videoUrl;
  public video : any;

  constructor( public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.video = navParams.get('video');
      this.videoUrl = sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
  }




  ionViewDidLoad() {


  }

  play(url){
      // this.streamingMedia.playVideo( url, this.options);
  }

    goToVideo(url){
        // this.streamingMedia.playVideo( this.videoUrl, this.options);
    }

}
