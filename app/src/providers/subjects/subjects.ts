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
    error: any;

  constructor(public http: HttpClient) {
      this.data = null;
    console.log('Hello SubjectsProvider Provider');
  }

    getSubjects(){
      return new Promise(resolve => {
        this.http.get('https://zedtutor.herokuapp.com/subjects/all')
          .subscribe(data => {
            this.data = data;
            SubjectsProvider.storeData(this.data);
              resolve(this.data);
              console.log(this.data);
          },
        err => {
          this.error - err;
          resolve(this.error);
        });
      });
    }
  /**
   * @param subjects
   */
  static storeData(subjects) {
    localStorage.removeItem('subjects');
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }


}
