import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';

// page import
import {SubscriptionPage} from "../subscription/subscription";
import {AuthProvider} from "../../providers/auth/auth";
import {SubscriptionsProvider} from "../../providers/subscriptions/subscriptions";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html',
})
export class LessonsPage {

  // lessons array
  public topic: any;
  public video: any;
  public subject: any;
  public user: any;
  public data: any;
  public msg: any;
  public expanded: boolean = false;
  public isAuthenticated: any;
  public loader:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public subscriptionService: SubscriptionsProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {

    this.subject = navParams.get("subject");
    this.user = this.authService.user;
    this.isAuthenticated = ( this.user !=  null); //returns true if user has been authenticated
  }

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

  /**
   * dismisses the modal
   */
  dismissModal(){
    this.navCtrl.setRoot(HomePage);
  }


  /**
   * presents a modal
   */
  presentModal(video, subject, page) {
    let modal = this.modalCtrl.create(page, {video, subject });
    modal.present();
    modal.onDidDismiss(data=>{
      console.log("before :"+data);
      if(data['success']){
        console.log("After :"+data);
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
