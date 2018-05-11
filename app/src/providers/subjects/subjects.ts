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

        return new Promise(resolve => {

            this.http.get('http://localhost:5000/subjects/all')
                .subscribe(data => {
                    this.data = data;
                  SubjectsProvider.storeData(this.data);
                    resolve(this.data);
                    console.log(this.data);
                });
        });
    }

    static storeData(subjects) {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }


}
