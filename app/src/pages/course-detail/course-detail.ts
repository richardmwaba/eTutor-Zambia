import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import { LessonsPage } from '../lessons/lessons';
import {DiscussionForumPage } from "../discussion-forum/discussion-forum";
import {VideosPage} from "../videos/videos";
import {StatusBar} from "@ionic-native/status-bar";
import {OptionsPopoverPage} from "../options-popover/options-popover";
import { MySubjectsProvider } from '../../providers/my-subjects/my-subjects';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CourseDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {
  public subject:any;
  public tab1: any;
  public tab2: any;
  public tab3: any;

  public favActivated: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public statusBar : StatusBar,
    public popoverCtrl: PopoverController,
    private mySubjectsService: MySubjectsProvider,
    private toastCtrl: ToastController
  ) {
    this.subject = navParams.data;
    // tabs list
    this.tab1 = LessonsPage;
    this.tab2 = VideosPage;
    this.tab3 = DiscussionForumPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseDetailPage');
    console.log(this.subject);
  }

   /**
   * saves a subject to my subjects
   */
  addToMyFavorites(){
    // check if user is logged in
    if((AuthProvider.isAuthenticated())){
      // present toaster
      this.presentToast("Adding "+this.subject.subject.name+" to favorites");

      this.favActivated = '80d6ff';

      this.mySubjectsService.enroll(this.subject.subject).subscribe(data=>{
        this.presentToast(data['msg']);
      });
    }else{
      this.presentToast('You are not signed in.');
    }
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
