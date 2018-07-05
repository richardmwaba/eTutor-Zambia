import { Component } from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams, ToastController, LoadingController} from 'ionic-angular';
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
  public loader:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public subscription: SubscriptionsProvider,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    public viwCtrl: ViewController,
  ) {
    //get the current user instance
    this.user =JSON.parse(localStorage.getItem('user'));
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
   * create the loader control
   */
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
  }

  /**
   * Subscribes a user to the given subject
   */
  subscribeUser() {
    if(this.theForm.valid) {
      this.submitAcepted = true;

      //present loader
      this.createLoader();
      this.loader.present();
      this.subscription.subscribeUser(this.theForm.value).subscribe(
        data => {
          if (data['success']) {
            // show success msg
            this.presentToast(data['msg']);

            // dismiss the modal and pass the returned data
            this.loader.diamiss();
            this.viwCtrl.dismiss(data);
          } else {
            //if subscription failed
            // show fail message
            this.loader.diamiss();
            this.presentToast(data['msg']);
          }
        },
        // error handling
        err => {
          console.log(err);
        }
      );
    }else {
      // show fail message
      this.presentToast("You have errors in your entries");
    }
  }

  /**
   *
   */
  dismissModal(){
    // dismiss the modal and pass the returned data
    this.viwCtrl.dismiss({success:false});
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
