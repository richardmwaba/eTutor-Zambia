import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController} from 'ionic-angular';
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
  public footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  public headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

  constructor(
    public navCtrl: NavController,
    public subjectsService: SubjectsProvider,
    public modalCtrl: ModalController,
    public category : Category,
    public statusBar : StatusBar,
    public loadingCtrl: LoadingController
  ) {
    this.initializeSubjects();
  }

  /**
   * Implements the pull-to-refresh feature
   * @param refresher
   */
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getSubjectsFromServer();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }

  /**
   * Initializes the subject from local storage
   */
  initializeSubjects(){
    this.subjects = JSON.parse(localStorage.getItem('subjects'));
    console.log("current subjects are "+this.subjects);

    if(this.subjects){
      console.log("Subjects on local storage are "+this.subjects);
    }else {
      this.presentLoading();
      this.getSubjectsFromServer();
    }
  }

  /**
   * Request subjects (data) from the online server and
   * stores them locally for faster retrieval
   */
  getSubjectsFromServer(){
    this.subjectsService.getSubjects().then((data) => {
      console.log(data);
      this.subjects = JSON.parse(localStorage.getItem('subjects'));
    }).catch((data)=>{

    });
  }

  /**
   * This function presents the loading animation
   */
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading subjects...",
      duration: 6000
    });
    loader.present();
  }

  presentModal() {
    let modal = this.modalCtrl.create(PopoverPage);
    modal.present();
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
