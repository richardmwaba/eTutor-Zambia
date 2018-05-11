import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private androidFullScreen: AndroidFullScreen) {
    this.video = navParams.get('video');
      this.videoUrl = sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
  }

  ionViewDidLoad() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));

  }

  dismissModal(){
    this.navCtrl.pop();
  }

}
