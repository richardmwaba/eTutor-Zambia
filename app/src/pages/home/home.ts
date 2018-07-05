import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, ToastController} from 'ionic-angular';
import { JuniorSecondaryPage } from '../junior-secondary/junior-secondary';
import { CourseDetailPage } from '../course-detail/course-detail';
import {SubjectsProvider} from "../../providers/subjects/subjects";
import {PopoverPage} from '../popover/popover'
import { Category } from "../../pipes/Category";
import { StatusBar } from '@ionic-native/status-bar';
import {ScrollHideConfig} from "../../directives/scroll-hide/scroll-hide";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public subjects: Array<any>;
  public loader:any;
  public footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  public headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

  constructor(
    public navCtrl: NavController,
    public subjectsService: SubjectsProvider,
    public modalCtrl: ModalController,
    public category : Category,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {

    this.initializeSubjects();
  }

  /**
   * Implements the pull-to-refresh feature
   * @param refresher
   */
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getSubjectsFromServer(refresher);
  }

  /**
   * Initializes the subject from local storage
   */
  initializeSubjects(){
    console.log("current subjects are "+this.subjects);
    if(this.subjects){
      console.log("Subjects loaded subjects are "+this.subjects);
    }else {
      this.createLoader();
      this.loader.present();
      this.getSubjectsFromServer(null);
    }
  }

  /**
   * Request subjects (data) from the online server and
   * stores them locally for faster retrieval
   */
  getSubjectsFromServer(refresher){
    this.subjectsService.getSubjects().then((data) => {
      console.log(data);
      if(this.loader) {
        this.loader.dismiss();
      }
      if(refresher){
        refresher.complete();
      }
      this.subjects = JSON.parse(localStorage.getItem('subjects'));
    },
    err => {
      if (this.loader) this.loader.dismiss();
      // display message
      this.presentToast('Oops, you seem to be offline.');
    }).catch((error)=>{ // show error message when callback is rejected
      // dismiss loader
      console.log('promise failed' + error);
      if (this.loader) this.loader.dismiss();
      // display message
      this.presentToast('Oops, you seem to be offline.');
    });
  }

  /**
   * This function presents the loading animation
   */
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Loading subjects..."
    });
  }

  presentModal() {
    let modal = this.modalCtrl.create(PopoverPage);
    modal.present();
  }

   /**
   * Presents a success toast on log in
   */
  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  /**
   * Navigates to the subject's detail page
   * @param subject The subject that's been clicked
   */
  courseDetail(subject) {
    //navigate to the selected course detail page
    this.navCtrl.push(CourseDetailPage, {subject});
  }

  jnrSecExams() {
    //navigate to the junior secondary page
    this.navCtrl.push(JuniorSecondaryPage);
  }

}
