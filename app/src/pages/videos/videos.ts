import { Component } from '@angular/core';
import {VideoPlayerPage} from "../video-player/video-player";
import {NavController, ViewController, NavParams,ModalController, ToastController} from "ionic-angular";
import {SubscriptionPage} from "../subscription/subscription";
import {AuthProvider} from "../../providers/auth/auth";
import {SubscriptionsProvider} from "../../providers/subscriptions/subscriptions";
import {LoginModalPage} from "../login-modal/login-modal";
import {DomSanitizer} from "@angular/platform-browser";

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
  public videoUrl:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthProvider,
    private subscriptionService: SubscriptionsProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    public viewCtrl: ViewController) {
    this.subject = navParams.get("subject");
    this.initialize();
  }

  ionViewDidLoad() {
    this.viewCtrl.showBackButton(true);
    console.log(this.viewCtrl.enableBack());
  }

  initialize(){
    let firstTopic = this.subject.topics[0];
    console.log("First topics is "+firstTopic.topic_name);
    let firstSubTopic = firstTopic.sub_topics[0];
    console.log("First sub topic is "+firstSubTopic.name);
    let firstVideo = firstSubTopic.videos[0];
    console.log("First video is "+firstVideo.name);
    this.playVideo(firstVideo);
  }

  /**
   *
   * @param video
   * @param subject
   */
  checkAccessToVideo(video, subject) {
    //if this user has subscribed, go to the video else go to the subscription page
    if((AuthProvider.isAuthenticated())){
      console.log("You are signed in as "+localStorage.getItem('user'));
      this.subject = subject;
      this.video = video;
      console.log(JSON.parse(localStorage.getItem('user')));
    this.isSubscribed(video, subject);
    }else {
      // redirect to log in
      console.log("You are not signed in");
      this.presentModal(video, subject, LoginModalPage);
    }
  }

  isSubscribed(video, subject){
    this.playVideo(video);
    this.subscriptionService.verifySubscription(this.subject, JSON.parse(localStorage.getItem('user'))).then((data) => {
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
  }

  /**
   * @param video
   */
  playVideo(video){
    // this.presentModal(video, null, VideoPlayerPage);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
  }

  /**
   * presents a modal
   */
  presentModal(video, subject, page) {
    let modal = this.modalCtrl.create(page,
      {video, subject });
    modal.present();
    modal.onDidDismiss(data=>{
      console.log("before :"+data);
      if(data['success']){
        console.log("After :"+data);
        //check if user has valid subscription to access course content
        this.isSubscribed(video, subject);
      }
    })
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
