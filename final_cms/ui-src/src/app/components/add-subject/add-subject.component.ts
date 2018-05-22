import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { SettingsService } from '../../services/settings/settings.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { timeout } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  selectedGrade: any;
  selectedCategory: any;
  subjectName: String;
  subjectDescription: String;
  subjectGrade: String;
  subjectCategory: String;
  icon: String;
  instructorsName: String;
  instructorsTitle: String;
  instructorsEmail: String;
  instructorsPhone: String;
  topicName: String;
  topicDescription: String;
  topicDuration: String;
  sub_topicsName: String;
  videoName: String;
  videoUrl: String;

  categories = [
    {
      "id": 1,
      "name": "Exams & Revision"
    },
    {
      "id": 2,
      "name": "Lessons"
    }
  ];

  grades = [
    {
      "id": 1,
      "name": "A-level"
    },
    {
      "id": 2,
      "name": "Grade 8"
    },
    {
      "id": 3,
      "name": "Grade 9"
    },
    {
      "id": 4,
      "name": "Grade 10"
    },
    {
      "id": 5,
      "name": "Grade 11"
    },
    {
      "id": 6,
      "name": "Grade 12"
    }
  ];

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onCreateSubmit() {

    this.selectGrade();
    this.selectCategory();

    const subject = {
      subjectName: this.subjectName,
      subjectDescription: this.subjectDescription,
      subjectGrade: this.subjectGrade,
      subjectCategory: this.subjectCategory,
      icon: this.icon,
      instructors: [],
      topics: []
    };

    console.log(subject);

    //Validate required fields
    if (!this.validateService.validateSubject(subject)) {
      this.flashMessage.show('Please fill in all the required fields', { classes: ['alert-danger'], timeout: 3000 });
      return false;
    }

    //Add subject
    this.settingsService.createSubject(subject).subscribe(data => {
      if (data['success']) {
        this.flashMessage.show(data['msg'], { classes: ['alert-success'], timeout: 3000 });
        //this.router.navigate(['/']);
      }
      else (err) => {
        this.flashMessage.show('Oops! Something went wrong', { classes: ['alert-danger'], timeout: 3000 });
        //this.router.navigate(['/users']);
        console.log(err);
      }
    });
  }

  selectGrade() {
    this.subjectGrade = this.selectedGrade;
  }

  selectCategory() {
    this.subjectCategory = this.selectedCategory;
  }

}
