import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subject: any;
  topics: any;
  constructor(
    private settings: SettingsService,
    private http: Http
  ) { }

  ngOnInit() {
    this.getSubjectTopics("5ae92d6f295ac71744e3ee9b");
    console.log(this.subject);
    console.log(this.topics);
  }

  getSubjectTopics(id){
    this.settings.getSubjectById(id).subscribe(data => {
      this.subject = data;
      this.topics = this.subject.topics;
    });
  }

}
