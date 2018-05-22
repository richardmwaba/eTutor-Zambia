import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {
 
  subject: any;
  grade: any;
  headerValue: any;

  constructor(
    private http: Http
  ) { }

  //Post: Add a new subject
  createSubject(subject){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/subjects/add', subject, { headers: headers })
    .map(res => res.json());
  }

  //Get: Get subject
  getAllSubject(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/subjects/all', { headers: headers })
    .map(res => res.json());
  }

  getSubjectByGrade(grade){
    let headers = new Headers();
    //this.loadToken();
    //headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    const uri = 'http://localhost:3000/subjects/grade/find/name/' + grade;
    console.log(uri);
    return this
            .http
            .get(uri)
            .map(res => res.json());
  }
}
