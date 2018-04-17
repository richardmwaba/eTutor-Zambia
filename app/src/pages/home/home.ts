import { Component } from '@angular/core';
import { NavController, LoadingController, PopoverController, ModalController} from 'ionic-angular';
import { JuniorSecondaryPage } from '../junior-secondary/junior-secondary';
import { CourseDetailPage } from '../course-detail/course-detail';
import { ALevelExamsPage } from '../a-level-exams/a-level-exams';
import {PerGradePagesPage} from "../per-grade-pages/per-grade-pages";
import {SubjectsProvider} from "../../providers/subjects/subjects";
import {PopoverPage} from '../popover/popover'
import {AddCommentPage} from "../add-comment/add-comment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public subjects: Array<any>;

  constructor(
    public navCtrl: NavController,
    public subjectsService: SubjectsProvider,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {
      this.subjectsService.getSubjects().then((data) => {
          console.log(data);
          this.subjects = data;
        // this.presentLoading();
      });

  }

    ionViewDidLoad(){



    }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  presentModal() {
    let modal = this.modalCtrl.create(PopoverPage);
    modal.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

    jnrSecExams() {
    //navigate to the junior secondary page
    this.navCtrl.push(JuniorSecondaryPage);
  }

  courseDetail(subject) {
    //navigate to the selected course detail page
    this.navCtrl.push(CourseDetailPage, {subject});
  }

  ALevelExams(){
  //navigate to the selected ALevelExams page
    this.navCtrl.push(ALevelExamsPage)
}

  grade(subjects, grade){
    //navigate to the selected Grade
    this.navCtrl.push(PerGradePagesPage, {subjects, grade});
  }
c
}
