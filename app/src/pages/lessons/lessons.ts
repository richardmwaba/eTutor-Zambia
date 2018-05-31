import { Component, ViewChild } from '@angular/core';
import { ExpandableComponent } from "../../components/expandable/expandable";
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

// page import
import {VideoPlayerPage} from "../video-player/video-player";
import {SubscriptionPage} from "../subscription/subscription";
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {provideAuth} from "angular2-jwt";
import {SubscriptionsProvider} from "../../providers/subscriptions/subscriptions";
import {HomePage} from "../home/home";

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
  public data: any;
  public msg: any;
  public expanded: boolean = false;
  public isAuthenticated: any;
  showLevel1 = null;
  showLevel2 = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public subscriptionService: SubscriptionsProvider,
    private toastCtrl: ToastController,
    public expandableComp: ExpandableComponent) {

    this.subject = navParams.get("subject");
    this.user = this.authService.user;
    this.isAuthenticated = ( this.user !=  null); //returns true if user has been authenticated
  }

  ionViewDidLoad() {
    this.expandableComp.ngAfterViewInit();
    console.log('ionViewDidLoad LessonsPage');
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  }

  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };

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
          this.navCtrl.push(SubscriptionPage, {
            video, subject  // passing data to subscription page
          });
        }
      });

    }else {
      // redirect to log in
      this.navCtrl.push(LoginPage);
    }
  }

  dismissModal(){
    this.navCtrl.setRoot(HomePage);
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
   * Presents a success toast on sign up
   */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
    });

    toast.present(); // shows the toaster
  }

}
