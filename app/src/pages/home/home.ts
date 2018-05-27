import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController} from 'ionic-angular';
import { JuniorSecondaryPage } from '../junior-secondary/junior-secondary';
import { CourseDetailPage } from '../course-detail/course-detail';
import {PerGradePagesPage} from "../per-grade-pages/per-grade-pages";
import {SubjectsProvider} from "../../providers/subjects/subjects";
import {PopoverPage} from '../popover/popover'
import { Category } from "../../pipes/Category";
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public subjects: Array<any>;

  constructor(
    public navCtrl: NavController,
    public subjectsService: SubjectsProvider,
    public modalCtrl: ModalController,
    public category : Category,
    public statusBar : StatusBar,
    public loadingCtrl: LoadingController) {
    // this.subjectsService.getSubjects().then((data) => {
    //   // console.log(data);
    //   // this.subjects = data;
    // });

    this.initializeSubjects();

  }

    ionViewDidLoad(){

    }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getSubjectsFromServer();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }

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

    getSubjectsFromServer(){
      this.subjectsService.getSubjects().then((data) => {
        console.log(data);
        this.subjects = JSON.parse(localStorage.getItem('subjects'));
      });
    }
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


    jnrSecExams() {
    //navigate to the junior secondary page
    this.navCtrl.push(JuniorSecondaryPage);
  }

  courseDetail(subject) {
    //navigate to the selected course detail page
    this.navCtrl.push(CourseDetailPage, {subject});
  }

  grade(subjects, grade){
    //navigate to the selected Grade
    this.navCtrl.push(PerGradePagesPage, {subjects, grade});
  }
c
}
