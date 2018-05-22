import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  grade: any;
  alevelSubjects: any;
  juniorSubjects: any;
  seniorSubjects: any;
  items: any[];

  constructor(
    private settings: SettingsService,
    private http: Http 
  ) { }

  ngOnInit() {
    this.getAlevelSubject('A-level');
    this.getJuniorSubject('Grade 9');
    this.getSeniorSubject('Grade 12');
  }

  //get subjects under a level
  getAlevelSubject(grade){
    this.settings.getSubjectByGrade(grade).subscribe(data => {
      this.alevelSubjects = data;
    });
  }

  //get subjects under junior level
  getJuniorSubject(grade){
    this.settings.getSubjectByGrade(grade).subscribe(data => {
      this.juniorSubjects = data;
      //console.log(this.juniorSubjects);
    });
  }

  //get subjects unser senior level
  getSeniorSubject(grade){
    this.settings.getSubjectByGrade(grade).subscribe(data => {
      this.seniorSubjects = data;
    });
  }

}
