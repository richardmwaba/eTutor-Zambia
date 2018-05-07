import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SubjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubjectsProvider {
    data: any;

  constructor(public http: HttpClient) {
      this.data = null;
    console.log('Hello SubjectsProvider Provider');
  }

    getSubjects(){

        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

            this.http.get('https://zedtutor.herokuapp.com/subjects/all')
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                    console.log(this.data);
                });
        });
    }

}
