import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SubscriptionsProvider } from '../../providers/subscriptions/subscriptions';
import {AuthProvider} from '../../providers/auth/auth';
import {VideoPlayerPage} from '../video-player/video-player';
/**
 * Generated class for the SubscriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {

  theForm: FormGroup;
  public video: any;
  public subject: any;
  public subjectName: any;
  public user: any;
  submitAcepted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public subscription: SubscriptionsProvider,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public authService: AuthProvider
  ) {
    //get the current user instance
    this.user = this.authService.user;
    //get the subject and video to subscribe for
    this.video = navParams.get("video");
    this.subject = navParams.get("subject");
    this.subjectName = this.subject.name;

    // setting up form builber
    this.theForm = formBuilder.group({
      plan: ['', Validators.compose( [Validators.required] )],
      subjectId: ['', Validators.compose( [Validators.required] )],
      method: ['', Validators.compose([Validators.required] )],
      userEmail: ['', Validators.compose([Validators.required] )],
      // email is required and follows the pattern < john@doecom >
      couponKey: ['', Validators.compose([Validators.required]) ],
      status: 'inactive'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
  }

  /**
   * Subscribes a user to the given subject
   */
  subscribeUser() {

    this.submitAcepted = true;

    //console.log(this.theForm.value);

    this.subscription.subscribeUser(this.theForm.value).subscribe(
      data => {
        if (data['success']) {
          // show success msg
          this.presentToast(data['msg']);

          // redirect to the video player
          this.playVideo(this.video);
        }else{
          //if subscription failed
          // show fail message
          this.presentToast(data['msg']);
        }
      },
      // error handling
      err => { console.log(err); }
    );
  }

  /**
   * Presents a success toast on sign up
   */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg+ this.subject.name,
      duration: 3000,
      //position, cssCLass
    });

    toast.present(); // shows the toaster
  }

  /**
   * Redirects to the video player
   */
  playVideo(video){
    this.video = video;
    this.navCtrl.push(VideoPlayerPage, {
      video  // passing data to LessonContentPage
    });
  }

}
