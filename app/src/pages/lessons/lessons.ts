import { Component, ViewChild } from '@angular/core';
import { ExpandableComponent } from "../../components/expandable/expandable";
import {IonicPage, ModalController, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';

// page import
import {VideoPlayerPage} from "../video-player/video-player";
import {SubscriptionPage} from "../subscription/subscription";
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {provideAuth} from "angular2-jwt";
import {SubscriptionsProvider} from "../../providers/subscriptions/subscriptions";
import {HomePage} from "../home/home";
import {LoginModalPage} from "../login-modal/login-modal";

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
  public loader:any;
  showLevel1 = null;
  showLevel2 = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public subscriptionService: SubscriptionsProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public expandableComp: ExpandableComponent
  ) {

    this.subject = navParams.get("subject");
    this.user = this.authService.user;
    this.isAuthenticated = ( this.user !=  null); //returns true if user has been authenticated

    this.topic = [
      {
        subs: [
          {
            title: "Topics covered",
            topics: this.subject.topics,
          }
        ]
      }
    ] // end topic array

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

  subscribe(){
    if((AuthProvider.isAuthenticated())){
    this.createLoader();
    this.loader.present();
    this.subscriptionService.verifySubscription(this.subject, JSON.parse(localStorage.getItem('user'))).then((data) => {
      console.log(data);
      this.data = data;
      if(this.loader) {
        this.loader.dismiss();
      }
      //if success store the record locally
      if (this.data['success']) {
        this.presentToast('You have already subscribed for this subject.');
      } else {
        this.presentModal(this.subject.topics[0].sub_topics[0].videos[0], this.subject, SubscriptionPage);
      }
    });
    }else {
      this.presentToast('You are not signed in');
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
        // this.isSubscribed(video, subject);
      }
    })
  }

  /**
   * create the loader control
   */
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "We are checking your subscription..."
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
