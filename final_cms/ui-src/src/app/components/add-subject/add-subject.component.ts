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

    name: String;
    grade: String;
    instructors: String[];
    description: String;
    category: String;
    icon: String;
    topics: String[];
    selectedGrade: any;
    selectedCategory: any;

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
        "name": "Grade 8"
      },
      {
        "id": 2,
        "name": "Grade 9"
      },
      {
        "id": 3,
        "name": "Grade 10"
      },
      {
        "id": 4,
        "name": "Grade 11"
      },
      {
        "id": 5,
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

  onCreateSubmit(){
    const subject = {
      name: this.name,
      grade: this.grade,
      instructors: this.instructors,
      description: this.description,
      category: this.category,
      icon: this.icon,
      topics: this.topics
    }

     //Validate required fields
     if(!this.validateService.validateSubject(subject)){
      this.flashMessage.show('Please fill in all the required fields', { classes: ['alert-danger'], timeout: 3000 });
      return false;
    }

    //Register Super User
    this.settingsService.createSubject(subject).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You have successfully added a new subject', { classes: ['alert-success'], timeout: 3000 });
        //this.router.navigate(['/']);
      }
      else{
        this.flashMessage.show('Oops! Something went wrong', { classes: ['alert-danger'], timeout: 3000 });
        //this.router.navigate(['/users']);
      }
  });
  }

  selectGrade (){
    this.grade = this.selectedGrade;
  }

  selectCategory (){
    this.category = this.selectedCategory;
  }

}
