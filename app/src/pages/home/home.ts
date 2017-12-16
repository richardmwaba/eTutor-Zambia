import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { JuniorSecondaryPage } from '../junior-secondary/junior-secondary';
import { CourseDetailPage } from '../course-detail/course-detail';
import { ALevelExamsPage } from '../a-level-exams/a-level-exams';
import {PerGradePagesPage} from "../per-grade-pages/per-grade-pages";
import {SubjectsProvider} from "../../providers/subjects/subjects";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    subjects: any;

  constructor(public navCtrl: NavController, public subjectsService: SubjectsProvider) {
      this.subjectsService.getSubjects().then((data) => {
          console.log(data);
          this.subjects = data;
      });

  }

    // ionViewDidLoad(){
    //
    //     this.subjectsService.getSubjects().then((data) => {
    //         console.log(data);
    //         this.subjects = data;
    //     });
    //
    // }
    getNumberOfSubjects(grade){
        return this.subjects.length();
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

  grade(){
    //navigate to the selected Grade
    this.navCtrl.push(PerGradePagesPage)
  }
c
}
