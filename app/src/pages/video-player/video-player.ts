import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  public videoUrl;
  public video : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    public viewCtrl: ViewController,
    private androidFullScreen: AndroidFullScreen) {
    this.video = navParams.get('video');
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
  }

  ionViewDidLoad() {
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));
  }

  dismissModal(){
    this.viewCtrl.dismiss({success:false});
  }

}
