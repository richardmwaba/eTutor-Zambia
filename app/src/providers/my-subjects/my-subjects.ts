import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthProvider} from "../auth/auth"

/*
  Generated class for the MySubjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MySubjectsProvider {

  private baseURL: string = "https://zedtutor.herokuapp.com/users";
  data: any;
  public user: any;
  public  mySubjects: any;
  // content header for the server
  contentHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(public http: HttpClient, public authService: AuthProvider) {
    this.data = null;
    this.user = this.authService.user;
    console.log('Hello MySubjectsProvider Provider');
  }

  getMySubjects(){

    return new Promise(resolve => {

      this.http.get(this.baseURL+'/mySubjects/'+this.user.email)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log(this.data);
        });
    });

  }

  enroll(subject){
    return this.http.post(this.baseURL+'/mySubjects/enroll/'+this.user.email, subject, { headers: this.contentHeader });
  }

  remove(subject){
    return this.http.delete(this.baseURL+'/mySubjects/remove/'+subject._id+"/"+this.user.email,{ headers: this.contentHeader });
  }

  isEnrolled(subjectId){

    return new Promise(resolve => {

      this.http.get(this.baseURL+'/mySubjects/isEnrolled/'+this.user.email+'/'+subjectId)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          console.log(this.data);
        });
    });
  }

}
