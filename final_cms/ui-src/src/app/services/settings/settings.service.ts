import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {
 
  subject: any;

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
    return this.http.get('http://localhost:3000/subjects/all', { headers: headers })
    .map(res => res.json());
  }
}
