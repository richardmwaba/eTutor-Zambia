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
  topics: any;
  constructor(
    private settings: SettingsService,
    private http: Http
  ) { }

  ngOnInit() {
    
  }

  getSubjectTopics(id){
    this.settings.getSubjectById(id).subscribe(data => {
      this.topics = data;
    });
  }

}
