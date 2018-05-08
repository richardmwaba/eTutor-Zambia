import { Component } from '@angular/core';
import {VideoPlayerPage} from "../video-player/video-player";
import {NavController, ViewController, NavParams,ModalController, ToastController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {SubscriptionPage} from "../subscription/subscription";
import {AuthProvider} from "../../providers/auth/auth";
import {SubscriptionsProvider} from "../../providers/subscriptions/subscriptions";
import {HomePage } from "../../pages/home/home";

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
    public subject: any;
  public video: any;
  public data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    private subscriptionService: SubscriptionsProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
    this.subject = navParams.get("subject");
  }

  ionViewDidLoad() {
    this.viewCtrl.showBackButton(true);
    console.log(this.viewCtrl.enableBack());
  }

  /**
   * check if this user has an active subscription for this subject then play the video
   * otherwise redirect to subscription page
   * @param video
   * @param subject
   */
  checkSubscription(video, subject) {
    //if this user has subscribed, go to the video else go to the subscription page
    if(this.authService.isAuthenticated()){
      this.subject = subject;
      this.video = video;

      this.subscriptionService.verifySubscription(this.subject, this.authService.user).then((data) => {
        console.log(data);
        this.data = data;
        //if success store the record locally
        if (this.data['success']) {
          this.playVideo(this.video);

        } else {
          this.presentToast(this.data['msg']);
          this.presentModal(video, subject, SubscriptionPage);
        }
      });

    }else {
      // redirect to log in
      this.presentModal(video, subject, LoginPage);
    }
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
   * presents a modal
   */
  presentModal(video, subject, page) {
    let modal = this.modalCtrl.create(page,
      {video, subject });
    modal.present();
  }

  dismiss(){
    this.navCtrl.getPrevious();
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
